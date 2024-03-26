async function checkImageURL (url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      console.log(response.ok);
      return response.ok; // Returns true if status code is 200-299
    } catch (error) {
      //console.error('Error checking image URL:', error);
      console.log(response.ok);
      return false; // URL might be incorrect or server might be down
    }
  };

export default checkImageURL;