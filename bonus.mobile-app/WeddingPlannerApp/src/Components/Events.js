import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text, FlatList, Image, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import EventCard from './EventCard'
import axios from 'axios';

const Events = ({ buisnessID }) => {
    const [events, setEvents] = useState([])
    const [eventNum, setEventNum] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchEvents()
    }, [eventNum])

    const fetchEvents = () => {
        const date = new Date()
        axios
            .post('http://localhost:991/buisness/getEventsPartition/', {
                buisnessID,
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                initEvent: eventNum
            }, { withCredentials: true })
            .then(response => {
                console.log("Setting Response", response.data)

                setEvents(events => {
                    return [...events].concat(response.data.events)
                })
            })
            .catch(error => {
                setError(error)
            });
    };

    return (
        <SafeAreaView>
            {console.log('events: ', events)}
            {events.length > 0 ?
                <FlatList
                    // contentContainerStyle={{
                    //     borderWidth: 3,
                    //     backgroundColor: '#FBFBF8',
                    //     // alignItems: 'center',
                    //     // justifyContent: 'center'
                    // }}
                    onEndReached={() => {
                        if (events.length >= 5)
                            setEventNum(eventNum + 5)

                    }}
                    onEndReachedThreshold={0.5}
                    data={events}
                    keyExtractor={event => event.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                marginTop: 10,
                            }}>
                            <EventCard event={item} />
                        </View>
                    )}
                />
                :
                <View style={styles.container}>
                    <Text style={styles.message}>No Events Scheduled</Text>
                </View>
            }
        </SafeAreaView>
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
    }
})

export default Events