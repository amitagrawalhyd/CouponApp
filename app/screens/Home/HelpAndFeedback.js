import React, {useEffect, useState} from 'react';
import {View, Text, Linking} from 'react-native';
import {Constants} from '../../constants/credentials';
import {getStringAsync} from '../../lib/storage';
import {Button, Pressable} from 'native-base';
import email from 'react-native-email';
import Icon from 'react-native-vector-icons/FontAwesome';
import Zocial from 'react-native-vector-icons/Zocial';
import LoadingScreen from '../LoadingScreen';

export default function HelpAndFeedback() {
  const companyId = Constants.companyId;
  const [customerCare, setCustomerCare] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    let getDataCalled = false;

    const getCustomerCareDetails = async () => {
      if (!getDataCalled) {
        getDataCalled = true;
        const token = await getStringAsync('USER_TOKEN');
        console.log('token from help and feedback:',token)

        if (token) {
          const resp = await fetch(
            `http://183.83.219.144:81/LMS/Company/Companies/${companyId}`,
            {
              method: 'GET',
              headers: new Headers({
                Authorization: `Bearer ${token}`,
              }),
            },
          );
          const data = await resp.json();
          setCustomerCare(data[0]);
          console.log('customer details:', data);
          setLoading(false);
        }
      }
    };
    getCustomerCareDetails();
  }, []);


  const customerCareEmail = customerCare?.customerCareContactEmail;
  const customerCareNumber = customerCare?.customerCareContactNumber;
  handleEmail = () => {
    const to = [customerCareEmail]; 
    email(to, {
      subject: 'Feedback:',
      body: 'Write your feedback here:',
      checkCanOpen: false, 
    }).catch(console.error);
  };

  handleWhatsApp = () => {
    Linking.openURL(
      `whatsapp://send?text=Your feedback here:&phone=+91 ${customerCareNumber}`,
    );
  };

  handlePhone = () => {
    Linking.openURL(`tel:+91 ${customerCareNumber}`);
  };

  return (
    <>
    {loading ? (
      <LoadingScreen />
    ) : (
    <View style={{margin: 20}}>
      <Text style={{color: 'black', fontSize: 18,}}>
        <Text style={{fontWeight:'bold'}}>For help contact:</Text>
        {'\n'}
        Mobile Number: <Text style={{fontWeight:'bold',marginTop:10}}>{customerCare?.customerCareContactNumber}</Text>
        {'\n'}
        Email: <Text style={{fontWeight:'bold'}}>{customerCare?.customerCareContactEmail}</Text>
      </Text>
      <Text style={{marginTop: 40, color: 'black', fontSize: 18,fontWeight: 'bold'}}>
        Send Feedback via:
      </Text>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        <Pressable alignItems="center">
          <Button
            onPress={() => {
              handleEmail();
            }}
            marginTop={15}
            paddingTop={3}
            paddingBottom={3}
            width={16}
            height={16}
            borderRadius={50}
            backgroundColor="rgb(237, 51, 22)">
            <Zocial name="email" size={30} color="white" />
          </Button>
          <Text style={{color: 'black'}}> Email </Text>
        </Pressable>

        <Pressable alignItems="center">
          <Button
            onPress={() => {
              handleWhatsApp();
            }}
            marginTop={15}
            paddingTop={3}
            paddingBottom={3}
            width={16}
            height={16}
            borderRadius={50}
            backgroundColor="rgb(13, 234, 43)">
            <Icon name="whatsapp" size={30} color="white" />
          </Button>
          <Text style={{color: 'black'}}> WhatApp </Text>
        </Pressable>

        <Pressable alignItems="center">
          <Button
            onPress={() => {
              handlePhone();
            }}
            marginTop={15}
            paddingTop={3}
            paddingBottom={3}
            width="16"
            height="16"
            borderRadius={50}
            backgroundColor="rgb(13, 28, 234)">
            <Icon name="phone" size={30} color="white" />
          </Button>
          <Text style={{color: 'black'}}> Phone </Text>
        </Pressable>
      </View>
    </View>
    )}
    </>
  );
}
