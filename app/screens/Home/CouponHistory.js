import React, {useState, useEffect} from 'react';

import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {colors} from '../../constants';
import {Button, Spinner, Divider} from 'native-base';

import {Constants} from '../../constants/credentials';
import {useNavigation} from '@react-navigation/native';
import {getStringAsync, setStringAsync} from '../../lib/storage';
import {useTranslation} from 'react-i18next';
import LoadingScreen from '../LoadingScreen';

const companyId = Constants.companyId;

export default function CouponHistory() {
  const [data, setData] = useState([]);
  const numberOfTransactions = 10;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [totalHistory, setTotalHistory] = useState([]);
  var totalCouponValue = 0;
  const {t,i18n}=useTranslation();

  // get coupon history
  useEffect(() => {
    // Use a flag to ensure getData is only called once
    let getDataCalled = false;

    const getCouponDetails = async () => {
      if (!getDataCalled) {
        getDataCalled = true;
        const mobileNumber = await getStringAsync('MOBILE_NUMBER');
        const token = await getStringAsync('USER_TOKEN');

        if (mobileNumber && token) {
          const resp = await fetch(
            `http://183.83.219.144:81/LMS/Coupon/GetCouponTransactions/${companyId}?numberOfTransaction=${numberOfTransactions}&mobileNumber=${mobileNumber}`,
            {
              method: 'GET',
              headers: new Headers({
                Authorization: `Bearer ${token}`,
              }),
            }
          );
          const responseData = await resp.json();
          setData(responseData);

          //total history
          
          const respose = await fetch(
            `http://183.83.219.144:81/LMS/Coupon/GetCouponTransactions/${companyId}?mobileNumber=${mobileNumber}`,
            {
              method: 'GET',
              headers: new Headers({
                Authorization: `Bearer ${token}`,
              }),
            }
          );
          const respJson = await respose.json();
          setTotalHistory(respJson);
          setLoading(false);
        }
      }
    };
    getCouponDetails();
  }, []);



  totalHistory.forEach(coupon => {
    totalCouponValue += coupon.faceValue;
  });

  const keyExtractor = (item, index) => index.toString();

  // alert('totalCouponValue:',Object.keys(obj).length)
  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({faceValue, changeDate}) => {
    //console.log('changedate: ', changeDate.split('T')[0]);
    return (
      <View>
        <Text style={{color: colors.black, fontSize: 18, fontWeight:'bold'}}> ₹{faceValue} </Text>
        <Text style={{color: colors.black}}>
          {' '}
          {changeDate.split('T')[0]},{' '}
          {changeDate.split('T')[1].slice(0,-4)}
        </Text>
        <Divider mt={2} mb={2} />
      </View>
    );
  };

  const renderItem = ({item}) => (
    <Item faceValue={item.faceValue} changeDate={item.changeDate} />
  );
  // console.log(data)
  return (
    <>
    {loading ? (
      <LoadingScreen />
    ) : (
    <>
      <View
        style={{
          backgroundColor: 'rgb(231, 173, 50)',
          height: 220,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>
          {t("Coupons worth")}
        </Text>
        <Text style={{color: colors.white, fontSize: 40}}>
          ₹{totalCouponValue}
        </Text>
        <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>
          {t("are scanned")}
        </Text>
      </View>
      <SafeAreaView style={{margin: 15,flex:1}}>
        {!totalHistory.length && 
        <Text style={{color:colors.black, alignSelf:'center', fontSize:20 }}>{t("No coupons scanned till now")} :(</Text>
        }
        {data && <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />}
        {/* {loading && <Spinner size={'sm'} />} */}
        {totalHistory.length > 10 && (
          <Button
            onPress={() => {
              navigation.navigate('TotalCouponHistory');
              // alert('totalcouponvalu:', data.length);
            }}
            marginTop={15}
            paddingTop={3}
            paddingBottom={3}
            backgroundColor="#16219d">
            <Text style={{color: 'white'}}> {t("See All Coupons")} </Text>
          </Button>
        )}
      </SafeAreaView>
    </>
    )}
    </>
  );
}
