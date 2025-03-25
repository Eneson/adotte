import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
  textMuted: {
    fontSize: 15,
    color: 'rgba(33 37 41 / 0.6)',
    marginBottom: 2,
    fontFamily: 'Montserrat_300Light'
  },
  input:{
      borderColor: '#414757',
      borderWidth: 1,
      borderTopWidth: 0,
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



  export default function InputSenhaForm(props){
    const {invalid, value, onChange, placeholder} = props
    const [isViewConfirmSenha, setIsViewConfirmSenha] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    console.log(invalid)
    // Função para lidar com o foco
    const handleFocus = () => setIsFocused(true);

    // Função para lidar com a perda de foco
    const handleBlur = () => setIsFocused(false);

    return (
      <View style={styles.FieldView}>
        <Text style={[styles.textMuted, {color: invalid?'#DC3545':'rgba(33 37 41 / 0.6)'}]}>{placeholder}</Text>
        <View style={[styles.TextInputEditable, {borderColor: invalid ? '#DC3545' : isFocused ? '#86b7fe' : '#000'}]}>                    
          <TextInput
            style={[styles.senhaInput]}
            placeholder={invalid?'':'********'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isViewConfirmSenha}
            placeholderTextColor= {invalid?'#DC3545': '#bdbdbd'}
            onChangeText={value => onChange(value)}
            value={value}       
          />
          <TouchableOpacity 
            style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
            onPress={() => {                   
              setIsViewConfirmSenha(!isViewConfirmSenha)  
            }}
          >
            <FontAwesome5 name={isViewConfirmSenha?"eye-slash":"eye"} size={20} color={"#000"} />
          </TouchableOpacity>
        </View>                     
        
      </View>  
        
    )
}