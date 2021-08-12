import React, { useEffect, useState } from 'react'
import { Navigation } from 'react-native-navigation'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native'
import Events from '../Components/Events'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { goToAuth } from '../navigation'
// import { Navigation } from 'react-native-navigation';

// import { USER_KEY } from '../config'

const Home = (props) => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false)

    // Navigation.events().bindComponent(props.componentId);
    useEffect(() => {
        Navigation.mergeOptions(props.componentId, {
            topBar: {
                visible: true,
                leftButtons: {
                    id: 'sideMenu',
                    icon: require('../../assets/menuIcon.png'),

                },
                rightButtons: {

                    id: 'filter',
                    icon: require('../../assets/filter.png')
                }
            },
            bottomTabs: {
                backgroundColor: '#5DABBD',
            }

        });

        Navigation.events().registerNavigationButtonPressedListener((event) => {
            console.log(event)
            if (event.buttonId === "sideMenu") {
                Navigation.mergeOptions("Home", {
                    sideMenu: {
                        openGestureMode: 'entireScreen',
                        left: {
                            visible: true
                        }
                    }
                });
                // console.log(isDrawerOpened)
                // setIsDrawerOpened(!isDrawerOpened)
            }
        })
    }, [])

    // navigationButtonPressed({ buttonId }){
    //     if (buttonId === 'sideMenu') {
    //         
    //     }
    // }

    console.log(props.buisness.buisnessID)
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Events buisnessID={props.buisness.buisnessID} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    greeting: {
        fontSize: 20,
        fontWeight: '600'
        , alignItems: 'center'
    }
})

export default Home