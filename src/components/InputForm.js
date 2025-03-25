import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TextInputMask } from 'react-native-masked-text'

const styles = StyleSheet.create({
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
  TextInputEditable:{
    justifyContent:'space-between',
    borderWidth: 1,
    borderRadius: 2, 
    paddingStart: 15,
    flexDirection:'row', 
  },
  FieldView:{

  }
})



  export default function InputForm(props){    
    const {invalid, value, onChange, placeholder, inputPlaceholder, keyboardType, autoComplete} = props
    const [isFocused, setIsFocused] = useState(false);
        console.log(invalid)
        // Função para lidar com o foco
        const handleFocus = () => setIsFocused(true);
    
        // Função para lidar com a perda de foco
        const handleBlur = () => setIsFocused(false);
    console.log(keyboardType)
    return (
      <View style={styles.FieldView}>
        <Text style={[styles.textMuted, {color: invalid?'#DC3545':'rgba(33 37 41 / 0.8)'}]}>{placeholder}</Text>
        <View style={[styles.TextInputEditable, {borderColor: invalid ? '#DC3545' : isFocused ? '#86b7fe' : '#000'}]}>                    
          {keyboardType.includes('phone-pad')?
            <TextInputMask                  
              placeholder={invalid?'':inputPlaceholder}
              placeholderTextColor= {invalid?'#DC3545': '#bdbdbd'}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              onChangeText={value => onChange(value)}
              value={value}                  
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',                    
              }}                  
            />:
            <TextInput
              style={[styles.senhaInput, {borderColor: invalid? '#DC3545':'#000'}]}
              placeholder={invalid?'':inputPlaceholder}
              placeholderTextColor= {invalid?'#DC3545': '#bdbdbd'}
              onFocus={handleFocus}
              onBlur={handleBlur}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              onChangeText={value => onChange(value)}
              value={value}       
            />
          }
        </View>                     
        
      </View>  
        
    )
}