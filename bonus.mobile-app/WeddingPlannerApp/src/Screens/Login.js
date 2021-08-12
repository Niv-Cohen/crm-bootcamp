import React from 'react'
import { Button } from 'react-native-elements';
import axios from 'axios'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Dimensions,
    StatusBar
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { goHome } from '../navigation'
import { USER_KEY } from '../config'


export default class SignIn extends React.Component {

    state = {
        email: '', password: ''
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    signIn = async () => {
        const { email, password } = this.state
        try {
            // login with provider
            const res = await axios.post('http://localhost:8000/auth/login/', { password, email }, { withCredentials: true })
            const { userInfo, buisness, token } = res.data
            console.log(userInfo, buisness, token)
            const user = await AsyncStorage.setItem(USER_KEY, token)
            console.log('user successfully signed in!', user)
            goHome(userInfo, buisness)
        } catch (err) {
            console.log('error:', err)
        }
    }
    render() {
        return (
            <View style={styles.pageContainer}>
                <ImageBackground source={require('../../assets/logo_transparent.png')}
                    style={styles.logo}></ImageBackground>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={val => this.onChangeText('password', val)}
                    />
                    <Button
                        style={{ alignSelf: 'center' }}
                        title="Login"
                        buttonStyle={styles.login}
                        titleStyle={{ fontWeight: '600' }}
                        onPress={this.signIn}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageContainer: {

        marginTop: '30%'
    },
    login: {
        marginTop: 30,
        width: 250,
        alignContent: 'center',
        height: 60,
        fontWeight: 'bold',
        marginLeft: 2,
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#b994b7',
        opacity: 0.9
    },
    input: {
        width: '90%',
        fontSize: 18,
        fontWeight: '500',
        opacity: 1,
        borderColor: '#d4c8e0',
        borderWidth: 1,
        height: 55,
        margin: 10,
        color: 'gray',
        padding: 8,
        borderRadius: 14
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20
        // alignItems: 'center'
    },
    backgroundImg: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height
        flex: 1,
        resizeMode: 'stretch'
    },
    logo: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.35,
        opacity: 0.9
    },
    LetsSign: {
        //alignSelf: 'center',
        marginLeft: 12,
        marginBottom: 10,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
    }
})