import logging
import azure.functions as func
import json
from datetime import datetime

app = func.FunctionApp()


@app.function_name(name="HttpTrigger1")
@app.route(route="comment", auth_level=func.AuthLevel.ANONYMOUS)
@app.cosmos_db_input(arg_name="documents", 
                     database_name="FarmGazerDB",
                     container_name="Comment",
                     sql_query="SELECT c.imageId, c.userName, c.commentText, c.timestamp FROM c WHERE c.imageId = {imageId}", # {imageId} is a parameter, came from the request
                     connection="CosmosDbConnectionString")


@app.cosmos_db_output(arg_name="document", database_name="FarmGazerDB", container_name="Comment", connection="CosmosDbConnectionString")


def main(req: func.HttpRequest, documents: func.DocumentList,  document: func.Out[func.Document]) -> func.HttpResponse:
    try:
        if req.method == 'POST':
            req_body = req.get_json()
            image_id = req_body.get('imageId')
            user_name = req_body.get('userName')
            comment_text = req_body.get('commentText')
            
            comment = {
                'id': str(datetime.utcnow()),
                'imageId': image_id,
                'userName': user_name,
                'commentText': comment_text,
                'timestamp': datetime.utcnow().isoformat()
            }
            
            document.set(func.Document.from_dict(comment))
            
            return func.HttpResponse("Comment created successfully", status_code=201)
        
        elif req.method == 'GET':
            image_id = req.params.get('imageId')
            if not image_id:
                return func.HttpResponse("Missing imageId query parameter", status_code=400)
            
            
            comments_list = [dict(comment) for comment in documents]
            #only return imageId, userName, commentText, and timestamp
            #f"SELECT * FROM c WHERE c.imageId = '{image_id}'"
            # for comment in comments_list:
            #     comment.pop('id')
            #     comment.pop('_rid')
            #     comment.pop('_self')
            #     comment.pop('_etag')
            #     comment.pop('_attachments')
            #     comment.pop('_ts')

            
            return func.HttpResponse(json.dumps(comments_list), status_code=200, mimetype="application/json")
        


    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return func.HttpResponse(f"An error occurred: {e}", status_code=500)
    


    #GET TEST: curl -X GET "https://farmgazer.azurewebsites.net/api/comment?imageId=138345"
    #POST TEST: curl -X POST "https://farmgazer.azurewebsites.net/api/comment" -H "Content-Type: application/json" -d "{\"imageId\":\"138345\",\"userName\":\"test\",\"commentText\":\"test\"}"
