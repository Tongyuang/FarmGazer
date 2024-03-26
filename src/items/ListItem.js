import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

class ListItem extends React.Component {
    state = {
        imagePath: this.props.imagePath,
        description1: this.props.description1,
        description2: this.props.description2,
        description3: this.props.description3,
        farm: this.props.farm,
        field: this.props.field,
    };

    // Use componentDidUpdate to update state when props change.
    // This is crucial for ensuring the component updates when new props are received.
    componentDidUpdate(prevProps) {
        if (prevProps.imagePath !== this.props.imagePath ||
            prevProps.description1 !== this.props.description1 ||
            prevProps.description2 !== this.props.description2 ||
            prevProps.description3 !== this.props.description3 ||
            prevProps.farm !== this.props.farm ||
            prevProps.field !== this.props.field
            ) {
            this.setState({
                imagePath: this.props.imagePath,
                description1: this.props.description1,
                description2: this.props.description2,
                description3: this.props.description3,
                farm: this.props.farm,
                field: this.props.field,
            });
        }
    }

    navigateToScreen = () => {
        // Navigate to the detail screen
        const informationToSend = {
            farmName: this.state.farm,
            fieldName: this.state.field,
        };
        this.props.navigation.navigate('Detail', {
            items: informationToSend,
        });
    }

    render() {
        // Destructure state for easier access
        const { imagePath, description1, description2, description3 } = this.state;

        return (
            <TouchableOpacity onPress={this.navigateToScreen}>
                <View style={styles.container}>
                    <Image source={{ uri: imagePath }} style={styles.image} />
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText1}>{description1}</Text>
                        <Text style={styles.descriptionText2}>{description2}</Text>
                        <Text style={styles.descriptionText3}>{description3}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    image: {
        width: 106,
        height: 106,
        borderRadius: 16,
        marginRight: 10,
        resizeMode: 'cover',
    },
    descriptionContainer: {
        flex: 1,
    },
    descriptionText1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343434',
        padding: 3,
    },
    descriptionText2: {
        fontSize: 14,
        color: '#9D9D9D',
        fontWeight: 'normal',
        padding: 3,
    },
    descriptionText3: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#343434',
        padding: 3,
    },
});

export default ListItem;
