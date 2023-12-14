/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import {Center, Pressable, Button, Spinner, VStack, ZStack} from 'native-base';
import {colors} from '../../constants';
import {useNavigation,useIsFocused} from '@react-navigation/native';
// import Verifyotp from '../Verifyotp';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {login} from '../../features/authSlice';
import {useDispatch} from 'react-redux';
import {getStringAsync, setBoolAsync, setStringAsync} from '../../lib/storage';
import { getToken } from '../../components/util';
// import getUserDetails from './../../navigators/index'

const Login = () => {
  const companyId = 2;
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  // const [isOtpValid, setIsOtpValid] = useState(false);
  const [isGettingOtp, setIsGettingOtp] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(true);// to condtitionally disable input fields
  // const [error, setError] = useState('');
  // console.log('mobile no.', mobileNumber)
  // const onChangeMobileNumber = (text) => setMobileNumber(text);
  const navigation = useNavigation();
  const [devicetoken, setDeviceToken] = useState('');
  const deviceType = Platform.OS;
  const isFocused = useIsFocused();
  const [storedMobileNumber,setStoredMobileNumber] = useState('');
  const [storedToken,setStoredToken] = useState('');
  
  useEffect(() => {
    // getToken();
    getStringAsync('MOBILE_NUMBER').then(string => setStoredMobileNumber(string));
  }, []);

  console.log('mobile number:',storedMobileNumber);

  //get Otp
  function generateOtp() {
    setIsGettingOtp(true);
    fetch(`http://183.83.219.144:81/LMS/Otp/Get/${companyId}/${mobileNumber}`, {
      method: 'GET',
      //Request Type
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        if (responseJson) {
          setIsGettingOtp(false);
          setFlag(false);
        } else {
          alert('Invalid mobile number');
          setIsGettingOtp(false);
        }
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.log(error);
      });
  }

  // validate potp
  function verifyOtp() {
    // console.log('mobilenumber, otp', mobileNumber, otp)
    fetch(
      `http://183.83.219.144:81/LMS/Otp/Vallidate/${companyId}/${mobileNumber}/${otp}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        if (response.validationResult) {
          const token = response.token; // token from response is stored in token variable
          getUserDetails(token);
        } else {
          // eslint-disable-next-line no-alert
          alert('invalid otp');
        }
      })
      .catch(error => console.log(error));
  }


  function getUserDetails(token){
    const user = {username: 'exampleUser'}; // dummy user varaible
  fetch(`http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${mobileNumber}`, {
    method: 'GET',
    //Request Type
      headers: {
        Authorization: `Bearer ${token}`
      },
  })
    .then(response => response.json())
    .then(responseJson => {
      // console.log(responseJson);
      console.log('user details api response',responseJson[0].isActive)
      if (responseJson[0].isActive) {
        setStringAsync('USER_LOGGEDIN', 'true');
        setStringAsync('MOBILE_NUMBER', mobileNumber); //storing mobile number in async storage
        setStringAsync('USER_TOKEN', token); // storing token in async storage
        //console.log('token in login screen:', token);
        dispatch(login(user));
        updateDeviceAndUserToken(token);
      } 
    })
    //If response is not in json then in error
    .catch(error => {
      //Error
      alert(JSON.stringify(error));
      console.log(error);
    });
}

  function updateDeviceAndUserToken(token) {
  getStringAsync('DEVICE_TOKEN').then(devicetoken => {setDeviceToken(devicetoken);

  console.log('device token while login:', devicetoken,);
fetch(
    `http://183.83.219.144:81/LMS/Registration/UpdateDeviceAndUserToken/${companyId}/${mobileNumber}/${devicetoken}/${deviceType}`,
    {
      method: 'GET',
      //Request Type
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      // console.log(responseJson);
      console.log(
        'device details api response',
        JSON.stringify(responseJson), 'company id',companyId,'mobile number',mobileNumber,'device token',devicetoken,'device type',deviceType,
      );
      // if (responseJson) {
      // }
    })
    //If response is not in json then in error
    .catch(error => {
      //Error
      // alert(JSON.stringify(error));
      console.log(
        'error while sending token to api:',
        error,
        'company id',companyId,'mobile number',mobileNumber,'device token',devicetoken,'device type',deviceType,
      );
    });
  });
  console.log('device token after getting string:', devicetoken);
  }


  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/page1.png')} borderRadius={5} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={{color: colors.black, fontSize: 20, fontWeight: 'bold',alignSelf:'center'}}>
          Login
        </Text>
        {/* <Text style={{color: colors.themeLightTextColor, marginTop: 5}}>
          Welcome back, login to continue
        </Text> */}
        <Text
          style={{color: colors.black, alignSelf: 'flex-start', marginTop: 10, fontWeight:'bold',fontSize:16}}>
          Mobile Number:
        </Text>
        <Text style={{color: colors.themeLightTextColor, marginTop: 5}}>
          Enter your Mobile Number
        </Text> 
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={mobileNumber}
            onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
            underlineColorAndroid="#16219d"
            keyboardType={'phone-pad'}
            style={{color: colors.black, flex: 1}}
            // selectionColor="#16219d"
            editable={flag}
          />

          {/* <Text style={{ color: colors.black, alignSelf: 'flex-end' }}>Forgot MPIN?</Text> */}
          {/* <Center> */}
          <Button
            style={{
              // borderColor:'#16219d',
              marginBottom:6,
              width:81
            }}
            // width={20}
            backgroundColor='transparent'
            borderColor={mobileNumber?.length < 10 ? 'grey' : '#16219d'}
            // backgroundColor={ otp?.length < 6 ? 'grey': '#16219d'}
            borderWidth={1.8}

            onPress={generateOtp}
            disabled={mobileNumber?.length < 10}          
            >
            {isGettingOtp ? (
              <Spinner 
              color='#16219d'
              />
            ) : (
              <Text style={{color:mobileNumber?.length < 10 ? 'grey' : '#16219d'}}>Get OTP</Text>
            )}
          </Button>
        </View>

        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: colors.black,
            alignSelf: 'flex-start',
            marginTop: 10,
            // marginBottom: 10,
            fontWeight:'bold',
            fontSize:16
          }}>
          OTP:
        </Text>
        <Text style={{color: colors.themeLightTextColor, marginTop: 5}}>
          Enter your OTP
        </Text> 

        <TextInput
          value={otp}
          onChangeText={otp => setOtp(otp)}
          keyboardType={'phone-pad'}
          style={{color: colors.black, marginBottom: 10, alignSelf: 'stretch'}}
          underlineColorAndroid="#16219d"
          editable={!flag}
          // selectionColor="#16219d"
        />
        {/* {
          error &&
          <Small>{error}</Small>
        } */}

        <Button 
        onPress={verifyOtp} 
        // onPress={console.log(otp?.length)}
        //otp?.length < 6 ? alert('otp is too short'):
        disabled={otp?.length < 6}
        backgroundColor={ otp?.length < 6 ? 'grey': '#16219d'}
        paddingTop={15}
        paddingBottom={15}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <Text style={{color: 'white'}}>Login</Text>
          )}
        </Button>
      </View>
      <View>
        <Text style={{color:colors.black, alignSelf:'center', marginBottom:10}}>Version 1.0</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // justifyContent: 'center', //Centered vertically
    alignItems: 'center', //Centered horizontally
    // flex: 1,
    marginTop: 60,
    marginBottom: 60,
    // backgroundColor:colors.themeAccentColor
  },
  loginContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  // loginButton: {
  //   // width: 300,
  //   paddingTop: 15,
  //   paddingBottom: 15,
  //   alignItems: 'center',
  //   // backgroundColor: otp?.length < 6? 'gray':'#16219d',
  //   marginTop: 30,
  //   marginBottom: 30,
  //   alignSelf: 'stretch',
  //   // borderRadius: 50,
  // },
});
export default Login;

  // const getToken = async () => {
  //     const resp = await fetch(`http://183.83.219.144:81/LMS/Registration/RegistrationToken/${companyId}/${mobileNumber}`, {
  //         method: 'GET',
  //     })
  //     const data = await resp.json();
  //     setToken(data.token)
  //     if(data.token){
  //         setStringAsync('USER_LOGGEDIN', 'true');
  //         dispatch(login(user))
  //     }
  //     // console.log("token:",token);
  // };

  // useEffect(() => {
  //     getToken();
  // }, []);