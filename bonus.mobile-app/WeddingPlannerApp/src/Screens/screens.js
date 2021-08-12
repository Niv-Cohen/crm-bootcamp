import { Navigation } from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('Home', () => require('./Home').default);
    Navigation.registerComponent('Initializing', (sc) => require('../Initializing').default);
    Navigation.registerComponent('SignIn', () => require('./Login').default);
    Navigation.registerComponent('NewEvent', () => require('./NewEvent').default);
    Navigation.registerComponent('Logout', () => require('./Logout').default);
}