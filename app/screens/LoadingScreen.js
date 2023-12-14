import {View, Text, ActivityIndicator} from 'react-native';
const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingScreen;
