import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../../constants';
import {Pressable, Button, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import ScannerModal from '../../components/ScannerModal';
import {Constants} from '../../constants/credentials';
import {useSelector, useDispatch} from 'react-redux';
import {getStringAsync, setStringAsync, } from '../../lib/storage';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {selectLanguage} from './ChangeLanguage';
import {useIsFocused} from '@react-navigation/native';
import LoadingScreen from '../LoadingScreen';
import {
  getData,
  getTransactionData,
  getUserStatus,
} from '../../../ApiFunctions';

const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [registeredData, setRegisteredData] = useState({});
  const companyId = Constants.companyId;
  const [transactionData, setTransactionData] = useState([]);
  var completedAmount = 0;
  var pendingAmount = 0;
  var rejectedAmount = 0;
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isFocused && getHomeScreenDetails();
  }, [isFocused]);

  useEffect(() => {
    getStringAsync('LANGUAGE').then(value => selectLanguage(value));
  }, []);

  const getHomeScreenDetails = async () => {
    console.log('get home screen details is called');
    const mobileNumber = await getStringAsync('MOBILE_NUMBER');
    const token = await getStringAsync('USER_TOKEN');

    const userData = await getData();
    setRegisteredData(userData);

    const transactions = await getTransactionData();
    setTransactionData(transactions);
    
    if (mobileNumber && token) {
      await getUserStatus(companyId, mobileNumber, token, dispatch);
      setLoading(false);
    }
    // }
  };

  !transactionData.message &&
    transactionData.forEach(transaction => {
      // console.log('transaction: ',transaction)
      if (transaction.isPaid && transaction.isActive) {
        completedAmount += transaction.transactionAmount;
      }
      if (!transaction.isPaid && transaction.isActive) {
        pendingAmount += transaction.transactionAmount;
      }
      if (!transaction.isPaid && !transaction.isActive) {
        rejectedAmount += transaction.transactionAmount;
      }
    });

  setStringAsync('COMPLETED_AMOUNT', completedAmount.toString());
  setStringAsync('PENDING_AMOUNT', pendingAmount.toString());
  setStringAsync('REJECTED_AMOUNT', rejectedAmount.toString());

  async function getPasscode() {
    const mobileNumber = await getStringAsync('MOBILE_NUMBER');
    const token = await getStringAsync('USER_TOKEN');

    fetch(
      `http://183.83.219.144:81/LMS/Registration/GetPassCode/${companyId}/${mobileNumber}`,
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
        Alert.alert('Passcode:', JSON.stringify(responseJson));
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
        <ScrollView style={styles.container}>
          <Card style={{marginLeft: 20, marginRight: 20, marginTop: 40}}>
            {/* <Card.Title/> */}
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/Icon256.png')}
                  style={{
                    borderRadius: 10,
                    resizeMode: 'contain',
                    width: 60,
                    height: 60,
                  }}
                />
                <View style={{marginLeft: 10}}>
                  <Text
                    variant="bodyMedium"
                    style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
                    {registeredData?.registerName}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
                    {registeredData?.registerMobileNumber}
                  </Text>
                </View>
              </View>
              <Center>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text variant="bodyMedium" style={{paddingRight: 8}}>
                    <Text style={{color: colors.black, fontSize: 18}}>
                      {t('Balance')}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      ₹{registeredData?.walletValue}
                    </Text>
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      paddingLeft: 8,
                      paddingRight: 8,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderColor: '#16219d',
                    }}>
                    <Text style={{color: colors.black, fontSize: 18}}>
                      {t('Pending')}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      ₹{pendingAmount}
                    </Text>
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{paddingLeft: 8, marginRight: 10}}>
                    <Text style={{color: colors.black, fontSize: 18}}>
                      {t('Completed')}
                      {'\n'}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      ₹{completedAmount}
                    </Text>
                  </Text>
                  {/* <Button
              // style={{backgroundColor: '#16219d', width: 100}}
              style={styles.button}
              onPress={onButtonClick}>
              <Text
                style={{color: '#16219d', fontSize: 12.65, fontWeight: 'bold'}}>
                {t('RELOAD')}
              </Text>
            </Button> */}
                </View>
              </Center>
            </Card.Content>
          </Card>

          {/* <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={'#FFF'}
          /> */}

          <View
            style={{
              backgroundColor: 'white',
              // borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
            }}>
            {showScanner && (
              <ScannerModal
                isVisible={showScanner}
                onClose={async () => {
                  setShowScanner(false);
                  await getHomeScreenDetails();
                  console.log(
                    'Updated wallet value after closing ScannerModal:',
                    registeredData?.walletValue,
                  );
                }}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {/* <Text style={{ color: colors.black }}>Home</Text> */}
              <Pressable
                style={{alignItems: 'center', marginRight: 5}}
                onPress={() => navigation.navigate('CouponHistory')}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Coupon')}
                    {'\n'}
                    {t('History')}
                  </Text>
                  <Icon
                    name="history"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>

              <Pressable
                style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}
                onPress={() => setShowScanner(true)}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Scan')}
                    {'\n'}
                    {t('Coupon')}
                  </Text>
                  <Icon
                    name="qrcode"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>

              {/* <Pressable
            style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}
            onPress={() => navigation.navigate('ManualEntry')}>
            <View style={styles.iconWrapper}>
              <Icon name="keyboard" size={30} color="white" />
            </View>
            <Text style={{color: colors.white}}>
              Manual{'\n'}
              Entry
            </Text>
          </Pressable> */}

              <Pressable
                style={{alignItems: 'center', marginLeft: 5}}
                onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('User')}
                    {'\n'}
                    {t('Profile')}
                  </Text>
                  <FontAwesomeIcon
                    name="user"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>
            </View>

            {/* second row icons */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Pressable
                style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}
                onPress={() => navigation.navigate('WithdrawalHistory')}>
                <View style={styles.iconWrapper}>
                  <Text
                    style={{
                      color: colors.white,
                      fontWeight: 'bold',
                      alignSelf: 'flex-start',
                      marginLeft: 7,
                      fontSize: 13.3,
                    }}>
                    {t('Withdrawal')}
                    {'\n'}
                    {t('History')}
                  </Text>
                  <Icon
                    name="money-bill-wave"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>

              <Pressable
                style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}
                onPress={() => navigation.navigate('TransferMoney')}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Transfer')}
                    {'\n'}
                    {t('Money')}
                  </Text>
                  <Icon
                    name="exchange-alt"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>

              <Pressable
                style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}
                onPress={() => navigation.navigate('PaymentMethod')}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Payment')}
                    {'\n'}
                    {t('Method')}
                  </Text>
                  <FontAwesome6
                    name="wallet"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Pressable
                style={{alignItems: 'center', marginRight: 5}}
                onPress={() => navigation.navigate('Notifications')}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Notifi-')}
                    {'\n'}
                    {t('cations')}
                  </Text>
                  <FontAwesomeIcon
                    name="bell"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>

              <Pressable
                style={{alignItems: 'center', marginLeft: 5, marginRight: 5}}
                onPress={() => navigation.navigate('ChangeLanguage')}>
                {/* // onPress={() => alert('change language')}> */}
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Change')}
                    {'\n'}
                    {t('Language')}
                  </Text>
                  <Entypo
                    name="language"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>

              <Pressable
                style={{alignItems: 'center', marginLeft: 5}}
                onPress={() => navigation.navigate('HelpAndFeedback')}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.iconText}>
                    {t('Help')} &{'\n'}
                    {t('Feedback')}
                  </Text>
                  <FontAwesome6
                    name="question-circle"
                    size={30}
                    color="white"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
              </Pressable>
            </View>
            {registeredData && registeredData.registrationTypeId == 1 && (
              <Button
                onPress={() => {
                  // alert('totalcouponvalue:', data.length);
                  getPasscode();
                }}
                margin={15}
                paddingTop={3}
                paddingBottom={3}
                backgroundColor="#16219d">
                <Text style={{color: 'white'}}> {t('Get passcode')} </Text>
              </Button>
            )}
          </View>

          <View style={styles.bottom}></View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    width: 74,
    height: 40,
    marginLeft: 'auto',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#16219d',
  },
  iconText: {
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#16219d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
