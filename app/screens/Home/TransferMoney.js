import {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {Button} from 'native-base';
import {colors} from '../../constants';
// import Slider from '@react-native-community/slider';
import Slider from 'react-native-slider';

// import GetRegistrationDetails from '../../api/GetRegistrationsDetails';
import {Constants} from '../../constants/credentials';
import {getStringAsync, setStringAsync} from '../../lib/storage';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
// const upiId = Constants.upiId;
import LoadingScreen from '../LoadingScreen';
import { getData } from '../../../ApiFunctions';

const companyId = Constants.companyId;

function TransferMoney() {
  // const [value, setValue] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [data, setData] = useState(null);
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [pendingamount,setPendingAmount] = useState('');

  useEffect(() => {
    getStringAsync('PENDING_AMOUNT').then(pendingAmount =>
      setPendingAmount(pendingAmount),
    );
  });

  useEffect(() => {
    let getDataCalled = false;
    const getUserData = async () => {
      if (!getDataCalled) {
        getDataCalled = true;
        const userData = await getData();
        setData(userData);
        setLoading(false);
      }
    };
    getUserData();
  }, [setData]);

  console.log('user data from transfer money screen:', data);

  async function handleSubmit() {
    const mobileNumber = await getStringAsync('MOBILE_NUMBER');
    const token = await getStringAsync('USER_TOKEN');

    if (
      data.upiAddress &&
      transactionAmount <= data.walletValue &&
      transactionAmount >= data.minimumBalanceTransactionLimit &&
      transactionAmount > 0 &&
      data.walletValue >= 100
    ) {
      fetch(
        `http://183.83.219.144:81/LMS/Coupon/RequestTransaction/${companyId}/${transactionAmount}/${mobileNumber}`,
        {
          method: 'POST',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        },
      )
        .then(response => response.json())
        .then(responseData => {
          if (responseData) {
            Alert.alert(i18n.t('transfer_requested'));
            navigation.goBack();
          } else if (!responseData) {
            Alert.alert(i18n.t('transfer_failed'));
          }
        })
        .catch(error => console.log(error));
    } else if (!data.upiAddress) {
      Alert.alert(i18n.t('transfer_failed'), i18n.t('no_UPI_Id'));
    } else if (transactionAmount < data.minimumBalanceTransactionLimit) {
      Alert.alert(
        i18n.t('transfer failed'),
        `minimum balance required to make a transaction is ₹${data.minimumBalanceTransactionLimit}`,
      );
    } else if (transactionAmount > data.walletValue) {
      Alert.alert(i18n.t('transfer_failed'), i18n.t('insufficient_funds'));
    } else if (transactionAmount == 0) {
      Alert.alert(i18n.t('transfer_failed'), i18n.t('zero_request'));
    } 
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Transfer Money
          </Text>
          {data && (
            <>
              <Text style={{color: colors.black, marginTop: 10, fontSize: 18}}>
                {t('Available Balance')}:
                <Text style={{fontWeight: 'bold'}}> ₹{data.walletValue-pendingamount}</Text>
              </Text>
              <Text style={{color: '#16219d', marginTop: 10}}>
                UPI:{data.upiAddress ? data.upiAddress : 'Not added yet'}
              </Text>
            </>
          )}
          <Text style={{color: 'black', marginTop: 10, fontSize: 18}}>
            {t('Enter the Amount you want to transfer:')}
          </Text>
          <TextInput
            value={transactionAmount}
            onChangeText={transactionAmount =>
              setTransactionAmount(transactionAmount)
            }
            underlineColorAndroid="#16219d"
            keyboardType={'phone-pad'}
            style={{color: colors.black}}
          />

          <Button
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={data.walletValue === 0}
            backgroundColor={ data.walletValue === 0 ? 'grey': '#16219d'}
            >
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {t('Transfer Money')}
            </Text>
          </Button>
          {/* <Slider
                animateTransitions={true}
                value={value}
                maximumValue={100}
                minimumValue={0}
                step={20}
                onValueChange={(value) => setValue(value)}
            /> */}
        </View>
      )}
    </>
  );
}

export default TransferMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  submitButton: {
    // width: 300,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    // backgroundColor: '#16219d',
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'stretch',
    // borderRadius: 50,
  },
});
