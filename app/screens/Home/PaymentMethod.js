import {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {Button} from 'native-base';
import {colors} from '../../constants';
import {Constants} from '../../constants/credentials';
import {getStringAsync} from '../../lib/storage';
import {Validator} from 'esevajs';
import {useTranslation} from 'react-i18next';
import LoadingScreen from '../LoadingScreen';
import { getData } from '../../../ApiFunctions';

function PaymentMethod() {
  const [upi_Id, setUpi_Id] = useState('');
  const companyId = Constants.companyId;
  const {t, i18n} = useTranslation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

  // Function to validate the upi_Id Code
  function isValid_UPI_ID() {
    let isValid = Validator.vpa(upi_Id);
    // let regex = new RegExp(/^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]{2, 64}$/);
    if (!upi_Id) {
      // return "false";
      Alert.alert(i18n.t('upi_wrong'), i18n.t('upi_empty'));
    }
    // console.log('upi is valid:',isValid);
    else if (isValid) {
      handleSubmit();
    } else {
      Alert.alert(i18n.t('upi_wrong'), i18n.t('invalid_upi'));
    }
  }

  async function handleSubmit() {
    const mobileNumber = await getStringAsync('MOBILE_NUMBER');
    const token = await getStringAsync('USER_TOKEN');
    fetch(
      `http://183.83.219.144:81/LMS/Registration/UpdateUpiAddress/${companyId}/${mobileNumber}/${upi_Id}`,
      {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson) {
          Alert.alert(i18n.t('upi_correct'));
          getUserData();
        }
        else{
          Alert.alert('Unable to update UPI id');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <Text style={{color: colors.black, fontWeight: 'bold', fontSize: 20}}>
            {t('Payment Method')}
          </Text>
          <Text style={{color: '#16219d', marginTop: 10}}>
            UPI:{data.upiAddress ? data.upiAddress : 'Not added yet'}
          </Text>

          <Text style={{color: colors.black, fontSize: 18, marginTop: 20}}>
            {t('Enter your UPI ID:')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={upi_Id}
              onChangeText={upi_Id => setUpi_Id(upi_Id)}
              underlineColorAndroid="#16219d"
              // placeholder={data.upiAddress ? data.upiAddress : null}
              placeholderTextColor={'black'}
              style={{color: colors.black, flex: 1}}
            />
            {/* <Button
      // backgroundColor='transparent'
      borderColor={'#16219d'}
      style={{
        // borderColor:'#16219d',
        marginBottom:6,
        width:81
      }}
      >
        <Text style={{color:'#16219d'}}>Edit</Text>
      </Button> */}
          </View>
          <Button style={styles.submitButton} onPress={isValid_UPI_ID}>
            <Text style={{color: 'white'}}>
              {data.upiAddress ? t('Update') : t('Submit')}
            </Text>
          </Button>
        </View>
      )}
    </>
  );
}

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  submitButton: {
    // width: 300,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: '#16219d',
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'stretch',
    // borderRadius: 50,
  },
});

//   const handleSubmit = async () => {
//     // console.log('loading data:', storedMobileNumber, storedToken);
//   const resp = await fetch(
//     `http://183.83.219.144:81/LMS/Registration/UpdateUpiAddress/${companyId}/${storedMobileNumber}/${upiId}`,
//     {
//       method: 'GET',
//       headers: new Headers({
//         Authorization: `Bearer ${storedToken}`,
//       }),
//     },
//   );
//   //setData(resp.json());
//   //console.log('data length: ', data.length);
//   const respJson = await resp.json();
//   if(respJson){
//     alert('upi id added successfully')
//   }

//   setLoading(false);
// };
