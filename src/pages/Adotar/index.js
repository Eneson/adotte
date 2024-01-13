import React from 'react'
import { View, Text, TouchableOpacity, Linking, ImageBackground } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles'
import Footer from '../../components/Footer';

export default function Adotar(props) {
  const {item, source} = props.route.params
  const message = `Olá, estou entrando em contato pois gostaria de adotar o "${item.Nome}" `
  
  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=+55${item.DoadorTelefone}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>      
        <View style={styles.incident}>
          <ImageBackground
            source={{uri: source}}
            style={styles.childrenAnimais}
            resizeMode="cover"
            >         
              <View style={styles.animaisDesc}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
                  <View>
                    <Text style={styles.descText}> <Text style={styles.textBold}>Nome:</Text> {item.Nome} </Text>
                    <Text style={styles.descText}> <Text style={styles.textBold}>Sexo:</Text> {item.Sexo} </Text>  
                    <Text style={styles.descText}> <Text style={styles.textBold}>Nascimento:</Text> {item.DataNasc} </Text>
                  </View>                
                  <View>
                    <Text style={styles.descText}><Text style={styles.textBold}>Antirrabica:</Text> {item.Vacina.includes('true')?'Sim':'Não'}</Text>
                    <Text style={styles.descText}><Text style={styles.textBold}>Vermifugado:</Text> {item.Vermifugado.includes('true')?'Sim':'Não'}</Text>                  
                  </View> 
                </View>               
                <Text style={styles.textBold}>Descrição:</Text>                
                <Text style={styles.descText}>{item.Descricao}</Text>
              </View>                                               
          </ImageBackground>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroDescription}> Entre em contato: </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                <Text style={styles.actionText}> WhatsApp </Text>
                <FontAwesome name="whatsapp" size={30} color="#fff" />
              
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer Navigation={{...props}}/>
    </View>
  )
}
