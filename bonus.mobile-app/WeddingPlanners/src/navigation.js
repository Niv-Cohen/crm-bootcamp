import { Navigation } from 'react-native-navigation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
export const goToAuth = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'Home',
                    }
                }
            ],
        }
    }
});

export const goHome = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'Home',
                    }
                }
            ],
        },
        bottomTabs: {
            id: 'BottomTabsId',
            children: [
                {
                    component: {
                        name: 'Signout',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Sign Out',
                                icon: <AntDesign name="logout" size={22} />
                            }
                        }
                    },
                },
                {
                    component: {
                        name: 'NewEvent',
                        options: {
                            bottomTab: {
                                text: 'New Event',
                                fontSize: 12,
                                icon: <Ionicons name="add-circle-outline" size={22} />
                            }
                        }
                    },
                },
            ],
        }
    }
})