// NotificationModal.js (or wherever it's defined)
import {Pressable, Center} from 'native-base';
import {Modal, Image, View, Text} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const NotificationModal = ({title, description, isVisible, onClose, image}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: image ? '50%' : '20%',
            width: '80%',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
          }}>
          <Pressable onPress={onClose} alignSelf={'flex-end'} >
            <AntIcon name={'close'} size={30} color={'black'} />
          </Pressable>
          <Center>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
              {title}
            </Text>
            <Text style={{color: 'black'}}>{description}</Text>
            {image && (
              <Image
                source={{uri: image}}
                style={{
                  borderRadius: 10,
                  resizeMode: 'contain',
                  width: 200,
                  height: 200,
                  marginTop: 30,
                }}
              />
            )}
          </Center>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
