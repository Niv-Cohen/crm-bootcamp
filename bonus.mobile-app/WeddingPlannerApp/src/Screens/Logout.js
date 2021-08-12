import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Transition from '../Components/Transition'
import { USER_KEY } from '../config'
import { goToAuth } from '../navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Logout = (props) => {
    const [byeMsg, setByeMsg] = useState(false)
    const logout = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY)
            setByeMsg(true)
            setTimeout(() => {
                goToAuth()
            }, 4000)

        } catch (err) {
            console.log('error signing out...: ', err)
        }
    }
    useEffect(() => {
        logout()
    }, [])
    return (

        <View style={styles.container}>
            <Text style={styles.greeting}>Goodbye {props.userInfo && props.userInfo.firstName}</Text>
            <Transition screen="logout" />
            <Text style={styles.greeting}>Have A Great Day!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greeting: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10
    }
})
export default Logout