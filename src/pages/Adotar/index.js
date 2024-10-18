import React, { useState, useEffect} from 'react'
import {  StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Linking, ImageBackground } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

import styles from './styles'
import Footer from '../../components/Footer';
import { IsLogin,IsLogin2 } from '../../utils/IsLogin';
import { sendWhatsApp } from '../../utils/sendWhatsapp';
export default function Adotar(props) {
  const [signed, setSigned] = useState(false)

  useEffect(() => {    
    IsLogin((resultado) => {
      setSigned(resultado)
    });
  }, [])

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular,
    Montserrat_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  const {item, source} = props.route.params
  const message = `Olá, vi o anuncio no aplicativo ADOTE e gostaria de adotar o "${item.Nome}" `
  
  function contato() {
    Linking.openURL(`whatsapp://send?phone=+55${item.telefone}&text=${message}`)
  }

  

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} behavior={'padding'}>      
        <View style={styles.incident}>
          <ImageBackground
            source={{uri: source}}
            style={styles.childrenAnimais}
            resizeMode="cover"
            >                                                          
          </ImageBackground>
        </View>
        <View style={styles.animaisDesc}>
                <View>
                  <View style={{marginTop: 5,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.textNome}>{item.Nome}</Text>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=> sendWhatsApp(item)}>
                            <AntDesign name="sharealt" size={30} color="#000" />
                        </TouchableOpacity>
                        <Text>
                          Compartilhar
                        </Text>
                      </View>
                      <View style={{marginStart: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {signed?props.navigation.navigate('Denuncia', {screen: 'Denuncia2', params: { item: item, source: source }}):props.navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para denunciar um pet' }})}}>
                          <AntDesign name="warning" size={30} color="black" />   
                        </TouchableOpacity>
                        <Text>
                          Denunciar
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{}}>         
                    <Text style={styles.descText}>{item.Descricao}</Text>
                  </View>                
                  <View>  
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom:10}}>
                    <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth}} />
                    <View>
                      <Text style={{width: 'auto', marginHorizontal: 10, textAlign: 'center', fontFamily: 'Roboto_400Regular'}}>Informações Adicionais</Text>
                    </View>
                    <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth }} />
                  </View>                 
                  <Text style={styles.descText}><Text style={styles.textBold}>Sexo: </Text>{item.Sexo} </Text>  
                    <Text style={styles.descText}><Text style={styles.textBold}>Nascimento:</Text> {item.DataNasc} </Text>
                    <Text style={styles.descText}><Text style={styles.textBold}>Antirrabica:</Text> {item.Vacina?'Sim':'Não'}</Text>
                    <Text style={styles.descText}><Text style={styles.textBold}>Vermifugado:</Text> {item.Vermifugado?'Sim':'Não'}</Text>     
                    <Text style={styles.descText}><Text style={styles.textBold}>Castrado:</Text> {item.Castrado?'Sim':'Não'}</Text>                  
                  
                  </View>  
                </View>
              </View> 

        <View style={styles.contactBox}>
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth}} />
            <View>
              <Text style={{width: 'auto', marginHorizontal: 10,textAlign: 'center', fontFamily: 'Roboto_400Regular'}}>Entre em contato</Text>
            </View>
            <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth }} />
          </View>    
        
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={contato}>
                <Text style={styles.actionText}> WhatsApp </Text>
                <FontAwesome name="whatsapp" size={30} color="#fff" />              
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer Navigation={{...props}}/>
    </SafeAreaView>
  )
}
