import { useState, useEffect } from 'react'

import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../constants';
import { Button } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native';
// import CodeInput from 'react-native-confirmation-code-input';


import {useSelector, useDispatch} from 'react-redux'
// import allActions from '../../actions'



const Verifyotp = () => {
    
    const navigation = useNavigation();
    const [otp, setOtp] = useState("");
    const [isOtpValid, setisOtpValid] = useState(false);
    const route = useRoute();
    const companyId = route.params.companyId;
    const mobileNumber = route.params.mobileNumber;
    const token = route.params.token;
    const [registeredData, setRegisteredData] = useState(null)
    


    const getData = async () => {
        const resp = await fetch(`http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${mobileNumber}`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        })
        const data = await resp.json();
        setRegisteredData(data[0])
        };

    //on first mount, fetch data.
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // dispatch({ type: 'LOGIN', data: {registeredData} });
      }, [])

      console.log('registered data:',registeredData)
 


    function onLogin() {
    //     // validate otp
        fetch(`http://183.83.219.144:81/LMS/Otp/Vallidate/${companyId}/${mobileNumber}/${otp}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                //   console.log(JSON.stringify(responseData));
                setisOtpValid(responseData);
            })
            .catch((error) => console.log(error))

            if(isOtpValid && !registeredData.message){
                navigation.navigate('Home', {
                    companyId: companyId,
                    mobileNumber: mobileNumber,
                    token: token
                })
            }
        // console.log('registerred data:', registeredData.registerMobileNumber)
    }

        // get registrations
        // fetch(`http://183.83.219.144:81/LMS/Registration/GetRegistrations/${companyId}?mobileNumber=${mobileNumber}`, {
        //     method: 'GET',
        //     headers: new Headers({
        //         Authorization: `Bearer ${token}`
        //     }),

        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setRegisteredData(data);
        //     })
        //     .catch((error) => console.error("error:", error))
        //     console.log(
        //         // isOtpValid,token,
                
        //         registeredData);
        //     // console.log(registeredData["mobileNumber"]);

 


    return (
        <View style={{ marginLeft: 20, marginRight: 20, justifyContent:'center',flex:1}}>
            <Text style={{ color: colors.black }}>Enter your OTP to proceed</Text>
            {/* <CodeInput
    //   ref="codeInputRef2"
    //   secureTextEntry
    //   compareWithCode='AsDW2'
    codeLength={6}
      activeColor='rgba(49, 180, 4, 1)'
      inactiveColor='rgba(49, 180, 4, 1.3)'
      autoFocus={false}
      ignoreCase={true}
      inputPosition='center'
    //   size={50}
      onCodeChange={setOtp}
      onFulfill={(otp) => onFinish(otp)}
      containerStyle={{ marginTop: 30 , marginBottom: 20}}
      codeInputStyle={{ borderWidth: 1.5 }}
      keyboardType="numeric"
    //   codeInputStyle={{ fontWeight: '800' }}
    /> */}
            <TextInput
                // value={otp}
                onChangeText={(otp) => setOtp(otp)}
                keyboardType={'phone-pad'}
                style={{ color: colors.black }}
                underlineColorAndroid='#16219d'
                selectionColor='#16219d'
            />
            <Button style={styles.submitButton}
                onPress={onLogin}
                // onPress={() => navigation.navigate('Home')}
                >
                <Text style={{ color: 'white' }}>Login</Text>
            </Button>
        </View>

    )
}

const styles = StyleSheet.create({
    submitButton: {
        width: 300,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        backgroundColor: '#16219d',
        marginTop: 30,
        marginBottom: 30
        // borderRadius: 50,
    }
})

export default Verifyotp;