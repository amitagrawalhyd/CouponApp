import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  CouponHistory,
  TotalCouponHistory,
  TransferMoney,
  PaymentMethod,
  WithdrawalHistory,
  ProfileScreen,
  ChangeLanguage,
  HelpAndFeedback,
  Notifications,
} from '../screens';
import {navigationRef} from '../../RootNavigation';

const HomeStack = createNativeStackNavigator();
function HomeNavigator() {
  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="CouponHistory" component={CouponHistory} />
        <HomeStack.Screen name="TotalCouponHistory" component={TotalCouponHistory} />
        <HomeStack.Screen name="TransferMoney" component={TransferMoney} />
        <HomeStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <HomeStack.Screen name="WithdrawalHistory" component={WithdrawalHistory} />
        <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <HomeStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        <HomeStack.Screen name="HelpAndFeedback" component={HelpAndFeedback} />
        <HomeStack.Screen name="Notifications" component={Notifications} />
    </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default HomeNavigator;
