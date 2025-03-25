import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    textMuted: {
        fontSize: 15,
        color: 'rgba(33 37 41 / 0.8)',
        marginBottom: 2,
        fontFamily: 'Montserrat_300Light'
    },
    input:{
        borderColor: '#414757',
        borderWidth: 1,
        padding: 10,
        borderRadius: 2,
        paddingStart: 15,
        padding: 10,
        flex: 1
    },
    senhaInput:{
        paddingVertical: 10,
        width: 'auto',
        flex:1
    },
    
    FieldView:{
        marginBottom: 10
    },
    errorMessage: {
        color: '#DC3545'
    }
    
})
