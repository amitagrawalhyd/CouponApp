import React,{useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import AppNavigator from './app/navigators';
// import store from './app/lib/createStore';
import {SafeAreaView,Alert, Text} from 'react-native';
// import defaultTheme from './defaultTheme';
import store from './app/store'; // Updated import
import messaging from '@react-native-firebase/messaging';
import { notificationListener, requestUserPermission,getToken } from './../CouponApp/app/components/util'
import { setStringAsync } from './app/lib/storage';
import notifee,{AndroidStyle} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo'; // Update import

export default function App() {

  const [isConnected, setIsConnected] = useState(true); // State to track internet connection

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected); // Update isConnected state when connection status changes
    });

    return () => {
      unsubscribe(); // Cleanup the event listener when the component is unmounted
    };
  }, []);

  // useEffect(() => {
  //   if (!isConnected) {
  //     Alert.alert('No Internet', 'Please check your internet connection.');
  //   }
  // }, [isConnected]);

  

  // const navigation = useNavigation();
  useEffect(() => {
    notifee.requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message!(from app.js)', JSON.stringify(remoteMessage));
      displayNotifications(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const displayNotifications = async data => {
    //Create a channel (required for Android)
    console.log('image url from api:', data.notification.android.imageUrl);
    const channelId = await notifee.createChannel({
      id:'default',
      name:'Default Channel',
    });
    //Display a notification
    if (data.notification.android.imageUrl) {
      // If imageUrl is present, display a BigPictureStyle notification
      await notifee.displayNotification({
        title: data.notification.title,
        body: data.notification.body,
        android: {
          channelId,
          pressAction: {
            id: "default",
          },
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: {
              uri: data.notification.android.imageUrl,
            },
          },
        },
      });
    } else {
      // Handle the case when imageUrl is not present (e.g., show a basic notification)
      await notifee.displayNotification({
        title: data.notification.title,
        body: data.notification.body,
        android: {
          channelId,
          pressAction: {
            id: "default",
          },
        },
      });
    }
  }

  onOpenNotification = (notify) => {
    console.log('[App] onOpenNotification: ', notify);
      Alert.alert('hi');
      RootNavigation.navigate('Notifications')
  };


  useEffect(()=>{
    requestUserPermission();
    notificationListener();
    getToken();
  },[]);

  if (!isConnected) {
    // Render a screen indicating no internet connection
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
        <Text style={{color:'#000', fontSize: 24 }}>No Internet :(</Text>
      </SafeAreaView>
    );
  }

  // ... the rest of your component
  // async function requestUserPermission() {
  //   const settings = await messaging().requestPermission();
  //   if (settings) {
  //     console.log('Permission granted');
  //   }
  // }

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('Received a new message', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);
 
  // useEffect(() => {
  //   // Request permission to receive push notifications
  //   messaging()
  //     .requestPermission()
  //     .then(() => {
  //       // Get the device token
  //       return messaging().getToken();
  //     })
  //     .then(deviceToken => {
  //       console.log('Device Token:', deviceToken);
  //       setStringAsync('DEVICE_TOKEN', deviceToken);
  //     })
  //     .catch(error => {
  //       console.log('Error getting device token:', error);
  //     });
  // }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaView>
  );
}
