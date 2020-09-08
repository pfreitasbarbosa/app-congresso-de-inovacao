import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        backgroundColor: '#101838',
        flex: 1,
        paddingTop : Constants.statusBarHeight + 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    contentText: {
        color: "white",
        fontFamily: "OpenSans-SemiBold",
    }
});