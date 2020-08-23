import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Feather as Icon} from '@expo/vector-icons';
import MapView from 'react-native-maps';

const Points = () => {
    const navigate = useNavigation();

    const handleBack = () => {
       navigate.goBack(); 
    }

    return (
        <View style={styles.container}>  
            <TouchableOpacity onPress={handleBack}>
                <Icon name="arrow-left" size={20} color="#34CB79" />
            </TouchableOpacity>
            <Text style={styles.title} >Welcome</Text>
            <Text style={styles.description} >Find out in the maps a collect point</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map} />
            </View>
        </View>
    );
}
export default Points;