import { setStringAsync,getStringAsync } from './app/lib/storage';
import { Constants } from './app/constants/credentials';

export const getData = async () => {
  const companyId = Constants.companyId;
  const mobileNumber = await getStringAsync('MOBILE_NUMBER');
  const token = await getStringAsync('USER_TOKEN');
  
  if (mobileNumber && token) {
  const resp = await fetch(
    `http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${mobileNumber}`,
    {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    },
  );
  const data = await resp.json();
  return data[0];
  }
};

export const getTransactionData = async () => {
  const companyId = Constants.companyId;
  const mobileNumber = await getStringAsync('MOBILE_NUMBER');
  const token = await getStringAsync('USER_TOKEN');
  if(mobileNumber && token){
  const resp = await fetch(
    `http://183.83.219.144:81/LMS/Coupon/GetTransactions/${companyId}?mobileNumber=${mobileNumber}`,
    {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    },
  );
  const respJson = await resp.json();
  return respJson;
  }
};

export const getUserStatus = async (companyId, mobileNumber, token, dispatch) => {
    fetch(
        `http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${mobileNumber}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {

          if (!responseJson[0].isActive) {
            setStringAsync('USER_LOGGEDIN', 'false');
            dispatch(logout());

          }
        })
        .catch(error => {
          setStringAsync('USER_LOGGEDIN', 'false');
          dispatch(logout());
          console.log('user details error:', error);
        });
};
