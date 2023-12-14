import messaging from '@react-native-firebase/messaging';
import { setStringAsync } from '../lib/storage';
import * as RootNavigation from './../../RootNavigation';


export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  
export const notificationListener = () => {
      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        alert('Navigating to Notifications screen...');
        RootNavigation.navigate('Notifications')
      });
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
}

export const getToken = async() => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    // save the token to storage
    setStringAsync('DEVICE_TOKEN', token);
    console.log("=======token==============")
    console.log(token)
    console.log('===========================')
}