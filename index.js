/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);

// Initialize Firebase
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });
// // Add this code to your root component
// messaging()
//   .getInitialNotification()
//   .then(remoteMessage => {
//     if (remoteMessage) {
//       console.log(
//         'Notification caused app to open from background/terminated state:',
//         remoteMessage,
//       );
//     }
//   });  