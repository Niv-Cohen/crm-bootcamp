import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'Auth',
            children: [
                {
                    component: {
                        name: 'SignIn',
                    }
                    , options: {
                    }
                }
            ],
        }
    }
}
);

export const goHome = (userInfo, buisness) => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                options: {
                    bottomTabs: {
                        currentTabIndex: 1,
                        fontFamily: 'helvetica',
                        selectedIconColor: 'black',
                        iconColor: 'gray',
                        animateBadge: true,
                        backgroundColor: '#5DABBD',
                        currentTabId: 'Home'
                    }
                },
                children: [
                    // {
                    //     stack: {
                    //         id: 'SIGNOUT_TAB',
                    //         children: [
                    //             {
                    //                 component: {
                    //                     id: 'SIGNOUT_SCREEN',
                    //                     name: 'Logout',
                    //                     passProps: {
                    //                         userInfo, buisness
                    //                     },
                    //                 }
                    //             }
                    //         ],
                    //         options: {
                    //             bottomTab: {
                    //                 text: "Logout",
                    //                 fontSize: 12,
                    //                 text: 'Sign Out',
                    //                 icon: require('../assets/logout.png')
                    //             }
                    //         }
                    //     }
                    // },
                    {
                        stack: {
                            id: 'NEW_EVENT_TAB',
                            children: [
                                {
                                    component: {
                                        id: 'NEW_EVENT_SCREEN',
                                        name: 'NewEvent',
                                        passProps: {
                                            userInfo, buisness
                                        }
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    text: "New Event",
                                    fontSize: 12,
                                    icon: require('../assets/add.png'),
                                }
                            }
                        }
                    },
                    {
                        stack: {
                            id: 'HOME_TAB',
                            children: [
                                {
                                    component: {

                                        id: 'Home',
                                        name: 'Home',
                                        passProps: {
                                            userInfo, buisness
                                        }
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    text: "Home",
                                    fontSize: 12,
                                    icon: require('../assets/home.png')
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
    )
}