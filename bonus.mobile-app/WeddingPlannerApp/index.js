import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/Screens/screens';

registerScreens();
Navigation.setDefaultOptions({
    topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
    }
});

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'Initializing'
            }
        },
    });
});