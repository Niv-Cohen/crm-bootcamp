import React from 'react'
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';


const App = () => {
    return (
        <View>
            <Text>
                Hola
            </Text>
        </View>
    )
}



Navigation.registerComponent('Home', App);



Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'Home'
            }
        },
    });
});

