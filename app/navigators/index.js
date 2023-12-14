import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import {LoadingScreen} from '../screens';
// import {LoadingView} from '../screens';
import useAppAccessor from '../hooks/useappAccessor';
import {roots} from '../constants';
import {Register, Home, Verifyotp} from '../screens';
import HomeNavigator from './HomeNavigator';
import {useSelector} from 'react-redux';
import { getBoolAsync, getStringAsync } from '../lib/storage';
// import AsyncStorage from '@react-native-community/async-storage';
import { Constants } from '../constants/credentials';
import { loggedIn } from '../actions/auth';
import store from '../store';
// import Login from '../screens/Login/index';


const Stack = createNativeStackNavigator();

function AppNavigator(props) {
//  const {token} = props;
  // const {getApplication} = useAppAccessor();
  // const {root} = getApplication();
  const user = useSelector(state => state.auth.user);
  const companyId = Constants.companyId;
  const [userLoggedIn, setUserLoggedIn] = useState('false');
  const [token,setToken] = useState('');
  const [storedMobileNumber,setStoredMobileNumber] = useState('');
  const [userDetails,setUserDetails] = useState([]);
  const [loading,setLoading] =useState(true);
  // const userString = AsyncStorage.getItem('user');
  // const user = userString ? userString : null;
  // console.log('user:',user)
  // console.log(typeof user); // number

  useEffect(()=>{
    getStringAsync('USER_LOGGEDIN').then((string) => setUserLoggedIn(string)).then(
      // setLoading(false)
    )

})

// useEffect(() => {
//   getStringAsync('USER_TOKEN')
//   .then((string) => setToken(string))
//   .then(
//     getStringAsync('MOBILE_NUMBER')
//     .then((mb) => setStoredMobileNumber(mb))
//     .then(getUserDetails)
//   )
//   // getStringAsync('USER_TOKEN').then((string) => setToken(string));
// },[token,storedMobileNumber]);

// console.log('token from navigator:',token);
//   const getUserDetails = async () => {
//     // setLoading(true);
//     const resp = await fetch(`http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${storedMobileNumber}`, {
//         method: 'GET',
//         headers: new Headers({
//             Authorization: `Bearer ${token}`
//         }),
//     })
//     const data = await resp.json();
//   setUserDetails(data[0]);
//   setLoading(false)
// };

// console.log("user details:",userDetails?.isActive);


    // get stored
    // useEffect(() => {
    //   getStringAsync('MOBILE_NUMBER')
    //     .then(mb => setStoredMobileNumber(mb))
    //     .then(
    //       getStringAsync('USER_TOKEN')
    //         .then(token => setStoredToken(token))
    //         .then(getData)
    //     );
    // }, [getData, storedMobileNumber, storedToken]);

    // console.log('user details from navigator:',storedMobileNumber);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* {console.log(userLoggedIn)} */}
      {/* {loading && <Stack.Screen name="Loading" component={LoadingScreen}/>} */}
        {( //!loading && 
        userLoggedIn === 'true' 
        // && userDetails?.isActive
        ) ? (
          <Stack.Screen name="Home" component={HomeNavigator} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

{
  /* {root === roots.LOADING ? (
          <Stack.Screen name="AuthLoading" component={LoadingView} />
        ) : null} */
}
{
  /* {root === roots.OUTSIDE ? ( */
}
{
  /* ) : null} */
}
{
  /* {root === roots.INSIDE ? ( */
}
{
  /* ) : null} */
}
        {/* <Stack.Screen name="Verifyotp" component={Verifyotp} /> */}

        {/* <Stack.Screen name="Register" component={Register} /> */}