import {useState, useEffect} from 'react';
import LoadingScreen from '../LoadingScreen';

import {View, Text, FlatList, BackHandler, SafeAreaView} from 'react-native';
import {colors} from '../../constants';
import {Divider} from 'native-base';
import {Constants} from '../../constants/credentials';
import {getStringAsync, setStringAsync} from '../../lib/storage';
import {useTranslation} from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
const companyId = Constants.companyId;

export default function TotalCouponHistory() {
  const [totalHistory, setTotalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  var totalCouponValue = 0;
  const {t,i18n}=useTranslation();
  const navigation = useNavigation();

    useEffect(() => {
      let getDataCalled = false;
  
      const getCouponDetails = async () => {
        if (!getDataCalled) {
          getDataCalled = true;
          const mobileNumber = await getStringAsync('MOBILE_NUMBER');
          const token = await getStringAsync('USER_TOKEN');
  
          if (mobileNumber && token) {
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

      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home'); 
      return true; 
    });
        return () => backHandler.remove();
    }, []);

  totalHistory.forEach(coupon => {
    totalCouponValue += coupon.faceValue;
  });

  const keyExtractor = (item, index) => index.toString();

  const Item = ({faceValue, changeDate}) => (
    <View>
      <Text style={{color: colors.black, fontSize: 18, fontWeight: 'bold'}}>
        {' '}
        ₹{faceValue}{' '}
      </Text>
      <Text style={{color: colors.black}}>
          {' '}
          {changeDate.split('T')[0]},
          {changeDate.split('T')[1].slice(0, -4)}
        </Text>
      <Divider mt={2} mb={2} />
    </View>
  );

  const renderItem = ({item}) => (
    <Item faceValue={item.faceValue} changeDate={item.changeDate} />
  );
  // console.log(data)
  return (
    <>
    {loading ? <LoadingScreen /> : (
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
          {t('are scanned')}
        </Text>
      </View>

      <SafeAreaView style={{margin: 15, flex:1}}>
        <Text
          style={{
            color: colors.black,
            marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          {t("Number of Coupons Scanned")}: {totalHistory.length}
        </Text>
        {TotalCouponHistory && (
          <FlatList data={totalHistory} renderItem={renderItem} keyExtractor={keyExtractor} />
        )}
      </SafeAreaView>
      </>
      )}
    </>
  );
}


