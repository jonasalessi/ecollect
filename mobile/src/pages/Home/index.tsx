import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigate = useNavigation();
    
    const handlePage = () => {
        navigate.navigate('Points');
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/home-background.png')}
            imageStyle={{width: 274, height: 368}}
            >
           
            <View style={styles.main}>
                <Image source={require("../../assets/logo.png")} />
                <Text style={styles.title}>Your Marketplace to collect waste</Text>
                <Text style={styles.description}>Helping people to find out the collect point</Text>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handlePage} >
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Enter
                    </Text>
                </RectButton>
            </View>
        
        </ImageBackground>
    );
}

export default Home;