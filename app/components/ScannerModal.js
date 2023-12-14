import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {HStack, VStack} from 'native-base';
import {Modal, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../constants';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {Constants} from '../constants/credentials';
import {useNavigation} from '@react-navigation/native';
import {getStringAsync, setStringAsync} from '../lib/storage';

const companyId = Constants.companyId;

function getFaceValue(storedMobileNumber,storedToken){
  fetch(`http://183.83.219.144:81/LMS/Coupon/GetCouponTransactions/${companyId}?mobileNumber=${storedMobileNumber}`,
  {
    method:'GET',
    headers: new Headers({
      Authorization: `Bearer ${storedToken}`,
    }),
  },
  )
  .then(response => response.json())
  .then(responseData =>{
    console.log('scanned coupon value:',responseData[0].faceValue);
    alert(`Coupon worth ₹${responseData[0].faceValue} is scanned`);

  })
  .catch(error => console.log('get facevalue error:',error));
}

function postCoupon(couponCode, navigation, storedToken, storedMobileNumber, onClose) {
  fetch(
    `http://183.83.219.144:81/LMS/Coupon/ConsumeCoupon/${companyId}/${couponCode}/${storedMobileNumber}`,
    {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${storedToken}`,
      }),
    },
  )
    .then(response => response.json())
    .then(responseData => {
      if (responseData === true) {
      getFaceValue(storedMobileNumber,storedToken);
        // navigation.navigate('CouponHistory');
        onClose();
        // alert(JSON.stringify(responseData));
      } else if (responseData === false) {
        alert('Coupon Scanned already!');
        onClose();
      } else {
        alert('Invalid Coupon :(');
        // alert(JSON.stringify(responseData))
        onClose();
      }
      // console.log(couponCode);
      // setisOtpValid(responseData);
    })
    .catch(error => console.log('post coupon error:',error));
}

export default function ScannerModal({isVisible, onClose}) {
  // const { width } = useWindowDimensions();
  var couponCode = '';
  const navigation = useNavigation();
  const [storedToken, setStoredToken] = useState(null);
  const [storedMobileNumber, setStoredMobileNumber] = useState('');

  //Get Stored
  useEffect(() => {
    getStringAsync('MOBILE_NUMBER')
      .then(mb => setStoredMobileNumber(mb))
      .then(
        getStringAsync('USER_TOKEN').then(token => setStoredToken(token)),
        // .then(getData),
      );
  }, [storedMobileNumber, storedToken]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose}>
      <VStack
        flex={1}
        bg={`${colors.black}`}
        justifyContent={'center'}
        // px={10}
      >
        <HStack mt={20} alignSelf={'flex-end'}>
          {/* <Pressable onPress={onClose}>
            <AntIcon name={'close'} size={35} color={'white'} />
          </Pressable> */}
        </HStack>
        <QRCodeScanner
          onRead={({data}) => {
            couponCode = data;
            postCoupon(couponCode, navigation, storedToken, storedMobileNumber,onClose);
          }}
          fadeIn={false}
          reactivate={true}
          reactivateTimeout={2000}
          showMarker={true}
          // markerStyle={styles.marker}
          // flashMode={RNCamera.Constants.FlashMode.torch}

          topContent={<Text>Please hold your phone steady</Text>}
        />
      </VStack>
    </Modal>
  );
}

// const styles = StyleSheet.create({
//   marker:{
//     color:"blue"
//   }
// })
