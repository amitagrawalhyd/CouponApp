import { View, Text,TextInput } from 'react-native'
import { colors } from '../../constants'

const Register = () => {
    return (
        <View>
            <TextInput
                underlineColorAndroid={colors.themeAccentColor}
                keyboardType={'phone-pad'} />
        </View>
    )
}

export default Register;