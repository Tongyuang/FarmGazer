import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ListItem from './items/ListItem';
import checkImageURL from './function/checkImageURL';
import { useData } from './Data';

const storageAccountName = 'farmgazerstorage';
const containerName = 'images';
const sasToken = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-16T08:07:06Z&st=2024-02-09T02:07:06Z&spr=https&sig=flmsaOix%2Biud3OTwOB20SI4MMx3bCRV0BDOpCgwcJls%3D';

function imagePath( farm, field, date, index) {
    const path = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${farm}_${field}_${date}_${index}.jpg?${sasToken}`;   
    return path;
}


const List = ({navigation, farm}) => {
    // https://[storage_account_name].blob.core.windows.net/[container_name]/[blob_name]?[sas_token]
    // SAS = sp=r&st=2024-02-06T21:22:34Z&se=2024-03-10T05:22:34Z&spr=https&sv=2022-11-02&sr=c&sig=dXBS3RWjWo2OENetFoDfTI3MVlhTltNhQ0YJXwTkQ5M%3D
   const [imageIndex, setImageIndex] = useState("0");
   const { selectedDate, FarmName } = useData();
   console.log(FarmName)

   const offset = selectedDate.getTimezoneOffset();
   const localSelectedDate = new Date(selectedDate.getTime() - (offset*60*1000));
   const localDateString = localSelectedDate.toISOString().split('T')[0];
    
    const items = [
        { blobName: imagePath( "Andrewfarm", "Plant01", localDateString, 0), description1:FarmName + `'s Farm`, description2:"Description 2", description3:"Description 3", farm: "Andrewfarm", field: "Plant01"  },
        { blobName: imagePath( "Eval", "Field01", localDateString, "0"), description1:"Evaluation Field", description2:"2/1 to 2/10", description3:"Description 3", farm: "Eval", field: "Field01" },
        //{ blobName: imagePath( "Kevinfarm", "Plant01", localDateString, "0"), description1:"Kevin's Farm", description2:"Description 2", description3:"Description 3", farm: "Kevinfarm", field: "Plant01"  },
        { blobName: imagePath( "NelsonFarm", "Pea03", "2024-02-09", "0"), description1:"Field 1", description2:"Description 2", description3:"Description 3", farm: "NelsonFarm", field: "Pea03" },
        { blobName: imagePath( "NelsonFarm", "Pea04", "2024-02-09", "0"), description1:"Field 2", description2:"Description 2", description3:"Description 3", farm: "NelsonFarm", field: "Pea04" },
        // ... more items
    ];

    // useEffect(() => {
    //     const checkInterval = setInterval(async () => {
    //       try {
    //         const exists = await checkImageURL(imagePath( "NelsonFarm", "Pea01", "2024-02-09", parseInt(imageIndex) + 1).toString());
    //         if (exists) {
    //           setImageIndex(parseInt(imageIndex) + 1);
    //         } else {
    //           console.log('Image not available yet:');
    //         }
    //       } catch (error) {
    //         console.error('Error checking image URL:', error);
    //       }
    //     }, 5000);
      
    //     // Cleanup function to clear the interval
    //     return () => clearInterval(checkInterval);
    //   }, [imageIndex]); // Assuming items[0].blobName doesn't change, or add it to the dependency array if it does
      
    useEffect(() => {
        // This code runs when `FarmName` changes. You can fetch new data here or perform other actions.
        console.log(`FarmName changed to: ${FarmName}`);
        // Update your component state or fetch new data based on `FarmName` as needed.
      }, [FarmName]); // Dependency array includes `FarmName` to react to its changes
    
      
    



 
    return (
        <ScrollView style={styles.container}>
            
            {items.map((item, index) => (
            <ListItem
                key={index}
                navigation={navigation}
                imagePath={item.blobName}
                description1={item.description1}
                description2={item.description2}
                description3={item.description3}
                farm={item.farm}
                field={item.field}
            />
            ))}

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default List;
