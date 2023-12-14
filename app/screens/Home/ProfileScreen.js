import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import {   useDispatch} from 'react-redux';
import {logout} from '../../features/authSlice';
import {Center, Button} from 'native-base';
import {
  setStringAsync,
  getJsonAsync,
  removeItem,
} from '../../lib/storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Constants} from '../../constants/credentials';
import LoadingScreen from '../LoadingScreen';
import {getData} from '../../../ApiFunctions';
const user = getJsonAsync('USER');

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [registeredData, setRegisteredData] = useState({});
  const [loading, setLoading] = useState(true); 
  const companyId = Constants.companyId;


  useEffect(() => {
    getProfileDetails();
  }, []);

  async function getProfileDetails() {
    const userData = await getData();
    setRegisteredData(userData);
    console.log('registered data from profile screen');  
    setLoading(false);
  }

  // Handle logout
  const handleLogout = () => {
    setStringAsync('USER_LOGGEDIN', 'false');
    dispatch(logout());
    removeItem('USER_TOKEN');
    removeItem('MOBILE_NUMBER');
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
          <View style={{borderWidth: 1, padding: 40, borderRadius: 20}}>
            <Text style={{color: '#16219d', fontSize: 24, fontWeight: 'bold'}}>
              {registeredData.registerName}
            </Text>
            <Text style={{color: colors.black, fontSize: 18, marginTop: 20}}>
              <FontAwesome5 name="mobile-alt" size={20} />
              {'  '}
              {registeredData.registerMobileNumber}
            </Text>
            <Text style={{color: colors.black, fontSize: 18}}>
              <FontAwesome6 name="location-dot" size={20} />
              {'  '}
              {registeredData.city}, {registeredData.state}
            </Text>
            <Text style={{color: colors.black, fontSize: 18}}>
              <MaterialCommunityIcons name="pin" size={20} />
              {'  '}
              PinCode: {registeredData.pinCode}
            </Text>
            <Text style={{color: colors.black, fontSize: 18}}>
              <MaterialCommunityIcons name="qrcode-scan" size={20} />
              {'  '}
              UPI Id:{' '}
              {!registeredData.upiAddress
                ? '--------'
                : registeredData.upiAddress}
            </Text>
            {user && (
              <Center>
                <Button style={styles.button} onPress={handleLogout}>
                  <Text style={{color: '#16219d', fontWeight: 'bold'}}>
                    LOGOUT
                  </Text>
                </Button>
              </Center>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  button: {
    width: 100, // Add missing value for width
    height: 40,
    marginTop: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#16219d',
  },
});
