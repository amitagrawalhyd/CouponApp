import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
// import Spinner from 'react-native';
import {colors} from '../../constants';
import {Constants} from '../../constants/credentials';
import {getJsonAsync, getStringAsync} from '../../lib/storage';
import {Divider} from 'native-base';
import {useTranslation} from 'react-i18next';
import LoadingScreen from '../LoadingScreen';
import { getData, getTransactionData } from '../../../ApiFunctions';

const user = getJsonAsync('USER');

export default function WithdrawalHistory() {
  const [registeredData, setRegisteredData] = useState({});
  const [data, setData] = useState([]);
  const companyId = Constants.companyId;
  const [storedMobileNumber, setStoredMobileNumber] = useState('');
  const [storedToken, setStoredToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState('');
  const [pending, setPending] = useState('');
  const [rejected, setRejected] = useState('');
  const {t, i18n} = useTranslation();

  useEffect(() => {
    getStringAsync('COMPLETED_AMOUNT').then(completedAmount =>
      setCompleted(completedAmount),
    );
  });

  useEffect(() => {
    getStringAsync('PENDING_AMOUNT').then(pendingAmount =>
      setPending(pendingAmount),
    );
  });

  useEffect(() => {
    getStringAsync('REJECTED_AMOUNT').then(rejectedAmount =>
      setRejected(rejectedAmount),
    );
  });

  useEffect(() => {
    // Use a flag to ensure getData is only called once
    let getDataCalled = false;

    const getDetails = async () => {
      if (!getDataCalled) {
        getDataCalled = true;

        const userData = await getData();
        setRegisteredData(userData);

        const transactionData = await getTransactionData();
        setData(transactionData);
        setLoading(false);                     
      }
    };
    getDetails();
  }, []);


  const Item = ({transactionAmount, isPaid, isActive, transactionDate}) => {
    return (

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{color: colors.black, fontSize: 18, fontWeight: 'bold'}}>
                {' '}
                ₹{transactionAmount}
                {'\n'}
                <Text
                  style={{
                    color: colors.black,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  {''} {transactionDate.split('T')[0]}
                </Text>
              </Text>
              <View style={{marginLeft: 'auto'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {isPaid && isActive && (
                    <Text style={{color: colors.themeSuccessColor}}>
                      {' '}
                      {t('completed')}
                    </Text>
                  )}
                  {!isPaid && isActive && (
                    <Text style={{color: colors.themeColor}}>
                      {t('pending')}
                    </Text>
                  )}
                  {!isPaid && !isActive && (
                    <Text style={{color: colors.themeDangerColor}}>
                      {t('rejected')}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
            <Divider mt={2} mb={2} />
          </View>
    );
  };

  const renderItem = ({item}) => {
    // console.log('transaction amount: ', item.transactionAmount);
    return (
      <Item
        transactionAmount={item.transactionAmount}
        isPaid={item.isPaid}
        isActive={item.isActive}
        transactionDate={item.transactionDate}
      />
    );
  };
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
          {t('Balance')}
        </Text>
        <Text style={{color: colors.white, fontSize: 40}}>
          ₹{registeredData.walletValue}
        </Text>
        
        <View style={{flexDirection: 'row', top: 30}}>
          <View style={{paddingRight: 10}}>
            <Text style={{color: colors.white, fontSize: 20}}>
              {t('Completed')}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {completed}
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              borderLeftColor: colors.white,
            }}>
            <Text style={{color: colors.white, fontSize: 20}}>
              {t('Pending')}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {pending}
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 1,
              paddingLeft: 10,
              borderLeftColor: colors.white,
            }}>
            <Text style={{color: colors.white, fontSize: 20}}>
              {t('Rejected')}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {rejected}
            </Text>
          </View>
        </View>
      </View>

      <SafeAreaView style={{margin: 15,flex:1}}>
        {!data.length && (
          <Text
            style={{color: colors.black, alignSelf: 'center', fontSize: 18}}>
            {t('No transactions requested till now')} :(
          </Text>
        )}
        {data && (<FlatList data={data} renderItem={renderItem}  />)}
      </SafeAreaView>
      </>
    )}
    </>
  );
}
