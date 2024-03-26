//"https://farmgazer.azurewebsites.net/api/comment"
// Function to read comments from the API
const readComment = async (imageId) => {
    try {
      const response = await fetch(`https://farmgazer.azurewebsites.net/api/comment?imageId=${imageId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error: ${response.status}, ${errorData}`);
      }
  
      const comments = await response.json();
      console.log(imageId)
      return comments; // This returns the list of comments
    } catch (error) {
      console.error('Error reading comments:', error);
      alert('Failed to load comments.');
      return []; // Return an empty array in case of an error
    }
  };
  

// Function to send a comment to the API
const sendComment = async (imageId, userName, commentText) => {
    try {
      const response = await fetch('https://farmgazer.azurewebsites.net/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId: imageId,
          userName: userName,
          commentText: commentText,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error: ${response.status}, ${errorData}`);
      }
  
      //alert('Comment created successfully!');
    } catch (error) {
      console.error('Error sending comment:', error);
      alert('Failed to send comment.');
    }
  };
  

export { readComment, sendComment };
