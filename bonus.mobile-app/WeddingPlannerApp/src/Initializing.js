import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import axios from 'axios'

import { goToAuth, goHome } from './navigation'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_KEY } from './config'
import Transition from './Components/Transition';

export default class Initialising extends React.Component {
    async componentDidMount() {
        setTimeout(async () => {
            try {
                const token = await AsyncStorage.getItem(USER_KEY)
                console.log(token)
                const { data } = await axios.post('http://localhost:8000/app/me', { token }, { withCredentials: true })
                const { userInfo, buisness } = data
                console.log(userInfo, buisness)
                if (userInfo) {
                    goHome(userInfo, buisness)
                } else {
                    goToAuth()
                }
            } catch (err) {
                console.log('error: ', err)
                goToAuth()
            }
        }, 3000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Transition screen="splash" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})