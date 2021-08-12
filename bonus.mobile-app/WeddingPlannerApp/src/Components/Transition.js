import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text, Animated, StyleSheet, ImageBackground } from 'react-native'

const { width, height } = Dimensions.get('screen')


const Transition = ({ screen }) => {
    const [ballAnim, setBallAnim] = useState(new Animated.Value(0))
    useEffect(() => {
        setTimeout(() => {
            if (screen === "logout")
                animateLogout()
            else
                animateSplashScreen()
        }, 0.3)
    }, [])
    const animateLogout = () => {
        Animated.sequence([
            Animated
                .timing(ballAnim, {
                    duration: 0,
                    toValue: 300,
                    useNativeDriver: false
                }),
            Animated
                .timing(ballAnim, {
                    duration: 2000,
                    toValue: 300,
                    useNativeDriver: false
                }),
            Animated
                .timing(ballAnim, {
                    duration: 2000,
                    toValue: -2,
                    useNativeDriver: false
                })
        ]).start()
    }


    const animateSplashScreen = () => {

        Animated.timing(ballAnim, {
            toValue: 400,
            duration: 0.1,
            useNativeDriver: false
        }).start()

        Animated.loop(
            Animated.sequence([
                Animated
                    .timing(ballAnim, {
                        duration: 1000,
                        toValue: 300,
                        useNativeDriver: false

                    }),
                Animated
                    .timing(ballAnim, {
                        duration: 1000,
                        toValue: 200,
                        useNativeDriver: false

                    })
            ])
        ).start()
    }

    const ballAnimation = {
        width: ballAnim,
        height: ballAnim,
        borderRadius: ballAnim
    }

    return (

        <Animated.Image
            resizeMode={"contain"}
            source={require('../../assets/rings.png')}
            style={[styles.rings, ballAnimation]}
        />
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rings: {
        width: 200,
        height: 200,
        backgroundColor: 'gold'
    }
})
export default Transition