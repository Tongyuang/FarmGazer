import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Calender2 from './Calender2';
import { Image } from 'expo-image';
import ImageURL from './function/ImageURL';
import ImageBlock from './items/ImageBlock';
import CommentSection from './CommentSection';
import GrowingProcessSection from './GrowingProcessSection';

const Detail = ({ navigation }) => {
    const route = useRoute();
    const { items } = route.params;
    //console.log(items);

  return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('./icon/backArrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Detail</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('./icon/edit_inactive.png')} style={styles.homeIcon} />
                </TouchableOpacity>
            </View>
            <Calender2 searchBar={'none'}/>
            <ScrollView>
                <ImageBlock farm={items.farmName} field={items.fieldName} captureTime={"08:20 am"} />
                <CommentSection imageID={items.farmName + "_" + items.fieldName} />
                <GrowingProcessSection />
            </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ccc'
    },
    titleText: {
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'Arial',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    homeIcon: {
        width: 18,
        height: 18,
    },

});

export default Detail;
