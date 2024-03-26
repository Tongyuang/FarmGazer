import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { sendComment, readComment } from './function/sendComment';
import { useData } from './Data';

const CommentSection = ({ imageID }) => {
  const { selectedDate } = useData();
  const offset = selectedDate.getTimezoneOffset();
  const localSelectedDate = new Date(selectedDate.getTime() - (offset*60*1000));
  const localDateString = localSelectedDate.toISOString().split('T')[0];

  // Initialize comments as null or an empty array
  // const [comments, setComments] = useState([
  //   {
  //     author: 'Andrew Nelson',
  //     commentText: 'We might need to water this area more often!',
  //     date: '2022-02-01T12:00:00Z',
  //     id: 1,
  //   },
  //   {
  //     author: 'Jane Smith',
  //     commentText: 'OK, I will take care of it!',
  //     date: '2022-02-01T12:30:00Z',
  //     id: 2,
  //   },
  // ]);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    readComment(imageID + '_' + localDateString)
      .then(data => {
        // Sort comments by date first
        const sortedComments = data.sort((a, b) => new Date(a.id) - new Date(b.id));
  
        // Assign a new sequential id based on the order
        const numberedComments = sortedComments.map((comment, index) => ({
          ...comment,
          id: index + 1 // Creates a new property for the sequential ID
        }));
  
        setComments(numberedComments);
      });
  }, [imageID, localDateString]);
  
  

  const postComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObject = {
      author: 'Demo User',
      commentText: newComment,
      date: new Date().toISOString(),
      // Be cautious with this id assignment; it might not be unique.
      id: comments ? comments.length + 1 : 1,
    };
    sendComment(imageID + '_' + localDateString, 'Demo User', newComment);
    setComments(comments ? [...comments, newCommentObject] : [newCommentObject]);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comments</Text>
      {comments ? comments.map((item) => (
        <View key={item.id.toString()} style={styles.commentContainer}>
          <Text style={styles.commentAuthor}>{item.userName}</Text>
          <Text style={styles.commentText}>{item.commentText}</Text>
          <Text style={styles.commentDate}>
            {new Date(item.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
      )) : <Text>Loading comments...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Leave your comment here"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={postComment}>
            <Image source={require('./icon/send.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    marginTop: 5,
  },
  commentDate: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
});

export default CommentSection;

