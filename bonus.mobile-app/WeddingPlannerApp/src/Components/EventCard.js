import React from 'react'
import { ScrollView, StyleSheet, View, Text, FlatList, Image, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
const EventCard = ({ event }) => {
    console.log(event)
    return (
        <Card containerStyle={{ height: 150 }}>
            <Image
                style={{ alignSelf: 'center', width: '110%', height: 80, marginTop: -16 }}
                source={{ uri: `http://localhost:991/imgs/${event.url}` }}
            />
            <View style={styles.headerView}>
                <Text style={styles.toBeMarried}>{event.brideName}{'&'}{event.groomName}</Text>
                <Text style={styles.dataAndTime}>{event.date} {event.time}</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        fontWeight: '700',
        fontSize: 30
    },
    toBeMarried: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 8
        // alignSelf: 'center',
        // position: 'absolute',
    },
    headerView: {
        display: 'flex',
        alignSelf: 'center',
        width: '110%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataAndTime: {
        alignSelf: 'center',
        position: 'absolute',
        right: 8
    }

})

export default EventCard