
function ImageURL(farm, field, date, index) {
  const storageAccountName = 'farmgazerstorage';
  const containerName = 'images';
  const sasToken = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-16T08:07:06Z&st=2024-02-09T02:07:06Z&spr=https&sig=flmsaOix%2Biud3OTwOB20SI4MMx3bCRV0BDOpCgwcJls%3D';
  
  const path = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${farm}_${field}_${date}_${index}.jpg?${sasToken}`;   
  return path;
}

export default ImageURL;