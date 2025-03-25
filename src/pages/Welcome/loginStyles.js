import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        flex: 1,
      },       
      
      containerTextField:{
        marginBottom: 15,
      },
      TextInputEditable:{
        justifyContent:'space-between',
        borderWidth: 1,
        borderRadius: 2, 
        paddingStart: 15,
        flexDirection:'row', 
      },
      loginHeader:{
        justifyContent: 'flex-end',
        paddingBottom: 40
      },
      loginHeaderText:{    
        fontFamily: 'OpenSans_400Regular',
        fontSize: 15,
        textAlign: 'justify'
      },
      loginText:{
        fontSize: 25,
        color: '#000',
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'Montserrat_600SemiBold'
    
      },
    
      loginForm:{
        flex: 3
      },
          
      actions: {
        marginTop: 10,
        justifyContent: 'flex-start',
      },
    
      action: {
        backgroundColor: '#3ab6ff',
        borderRadius: 3,
        height: 55,
        width: '100%',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
      },
    
      actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 2,
      },
      actionText2: {
        fontSize: 15,
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
        color: '#3ab6ff'
      },
      cadastroButton:{
        flexDirection: 'row',    
        justifyContent: 'center',
      }
})
 