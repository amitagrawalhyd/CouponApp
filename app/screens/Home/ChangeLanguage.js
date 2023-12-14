import React ,{useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from '../../services/i18n';
import {RadioButton} from 'react-native-paper';
import {getStringAsync, setStringAsync,} from '../../lib/storage';

export function selectLanguage(value) {

  if(value == 'eng'){
    i18n.changeLanguage('en');
    setStringAsync('LANGUAGE',value)
  }
  else if(value == 'tel'){
    i18n.changeLanguage('te');
    setStringAsync('LANGUAGE',value)
  }
  else if(value == 'hin'){
    i18n.changeLanguage('hi');
    setStringAsync('LANGUAGE',value)
  }
  else if(value == 'ori'){
    i18n.changeLanguage('or');
    setStringAsync('LANGUAGE',value)
  }
}

const ChangeLanguage = () => {
  const {t, i18n} = useTranslation();
  const [value, setValue] = React.useState('');

  useEffect(() => {
    getStringAsync('LANGUAGE').then(value =>
      setValue(value),
    );
  });
  
  return (
    <View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            margin: 10,
          }}>
          Change Language
        </Text>
        <Text style={{color: 'black', marginLeft: 10}}>
          {t('Please select the language you can understand')}
        </Text>
      </View>
      <RadioButton.Group
        onValueChange={value => {
          setValue(value);
          selectLanguage(value)
        }}
        value={value}>
        <RadioButton.Item label="English " value="eng" color="#16219d" />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <RadioButton.Item label="Telugu " value="tel" color="#16219d" />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <RadioButton.Item label="Hindi " value="hin" color="#16219d" />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <RadioButton.Item label="Oriya " value="ori" color="#16219d" />
      </RadioButton.Group>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#61e3a5',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
export default ChangeLanguage;
