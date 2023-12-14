import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Constants} from '../../constants/credentials';
import {useState, useEffect, useRef} from 'react';
import {getStringAsync} from '../../lib/storage';
import {useTranslation} from 'react-i18next';
import {Divider} from 'native-base';
import LoadingScreen from '../LoadingScreen';
import NotificationModal from '../../components/NotificationModal';

const Notifications = () => {
  const companyId = Constants.companyId;

  const [notifications, setNotifications] = useState([]);
  const {t, i18n} = useTranslation();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotifications = async () => {
      const mobileNumber = await getStringAsync('MOBILE_NUMBER');
      const token = await getStringAsync('USER_TOKEN');
      if (mobileNumber && token) {
        const resp = await fetch(
          `http://183.83.219.144:81/LMS/Notification/ActiveNotificationsByMobileNumber/${companyId}/${mobileNumber}`,
          {
            method: 'GET',
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          },
        );
        const respJson = await resp.json();
        setNotifications(respJson);
        setLoading(false);
      }
    };
    getNotifications();
    console.log('notifications: ', notifications);
  }, []);

  const Item = ({title, description, image, id}) => {
    const [itemHeight, setItemHeight] = useState(0);
    const itemRef = useRef();

    const handleLayout = () => {
      if (itemRef.current) {
        itemRef.current.measure((x, y, width, height, pageX, pageY) => {
          setItemHeight(height);
        });
      }
    };

    return (
      <View ref={itemRef} onLayout={handleLayout}>
        <TouchableOpacity onPress={() => setSelectedNotification(id)}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            {title}
          </Text>
          <Text style={{color: 'black', marginTop: 5}}>{description}</Text>
        </TouchableOpacity>
        <Divider mt={2} mb={2} />
        {selectedNotification === id && (
          <NotificationModal
            title={title}
            description={description}
            image={image}
            isVisible={true}
            onClose={() => {
              setSelectedNotification(null);
            }}
          />
        )}
      </View>
    );
  };

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      description={item.description}
      image={item.imageURL}
      id={item.id}
    />
  );

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 15,
              marginTop: 10,
            }}>
            Notifications
          </Text>
          <SafeAreaView style={{margin: 15}}>
            {!notifications.length && (
              <Text style={{color: 'black', alignSelf: 'center', fontSize: 20}}>
                {t('No notifications till now')}{' '}
              </Text>
            )}
            {notifications && (
              <FlatList data={notifications} renderItem={renderItem} />
            )}
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default Notifications;
