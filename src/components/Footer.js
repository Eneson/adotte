import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'; 
import Navegar from './Navegar'
const styles = StyleSheet.create({
      footer:{
        bottom: 0,
        height: 55,
        flexDirection: 'row',
        width: '100%',
        position: 'relative',
        backgroundColor: '#3ab6ff',
        paddingTop: 10,
        paddingBottom: 5
      },
      action: {
        width: '33.3%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
      }
})


const Footer = (props) => {
    return (
      <View style={styles.footer}> 
          <TouchableOpacity style={styles.action} onPress={() =>{ Navegar(props.Navigation,'Login')}}>
            <Feather name="sun" size={30} color="#fff" />
            <Text style={styles.actionText}> Doar </Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.action} onPress={() => {Navegar(props.Navigation,'Inicio')}}>
            <Ionicons name="md-paw-outline" size={30} color="#fff" />
            <Text style={styles.actionText}> Adotar </Text>
          </TouchableOpacity>     
          <TouchableOpacity style={styles.action} onPress={() => {Navegar(props.Navigation,'Favoritos')}}>
            <MaterialIcons name="favorite-outline" size={30} color="#fff" />
            <Text style={styles.actionText}> Favoritos </Text>
          </TouchableOpacity>
    </View>
        
    )
}

export default Footer