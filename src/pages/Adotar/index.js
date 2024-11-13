import React, { useState, useEffect} from 'react'
import {  StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity,Modal, Linking, ImageBackground } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { Flow  } from 'react-native-animated-spinkit'
import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

import styles from './styles'
import Footer from '../../components/Footer';
import { IsLogin } from '../../utils/IsLogin';
import { sendWhatsApp } from '../../utils/sendWhatsapp';


export default function Adotar(props) {
  const [signed, setSigned] = useState(false)
  const [modalVisible, setmodalVisible] = useState(false)


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
  let modifiedUrl = source.replace("/adote/", "/adote/tr:r-max/");

  const message = `Olá, vi o anúncio no aplicativo ADOTE e gostaria de adotar o "${item.Nome}" `
  
  function contato() {
    Linking.openURL(`whatsapp://send?phone=+55${item.telefone}&text=${message}`)
  }

  

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} behavior={'padding'}>  
        {/* MODAL LOADING */}
        <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
              <Flow size={50} color="#3ab6ff"/>
          </View>
        </Modal>
        <View style={styles.incident}>
          <ImageBackground
            source={{uri: source.replace("/adote/", "/adote/tr:r-max/")}}
            style={styles.childrenAnimais}
            resizeMode="contain"
            >                                                          
          </ImageBackground>
        </View>
        <View style={styles.animaisDesc}>
                <View>
                  <View style={{
                    flex:1,
                    marginTop: 10, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                  }}>                      
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={styles.textNome}>
                        {item.Nome}
                        
                      </Text> 
                    </View>                                     
                    <View style={{
                      justifyContent: 'center', alignItems: 'center',
                      position: 'absolute', // Fazendo a posição do botão ser absoluta
                      right: 0, // Ajuste a posição do botão a partir do lado direito
                      top: '50%', // Centraliza verticalmente em relação ao contêiner
                      transform: [{ translateY: -20 }] // Ajuste para centralizar verticalmente (metade do tamanho do ícone)
                    
                      }}>
                      <TouchableOpacity onPress={() => {signed?props.navigation.navigate('Denuncia', {screen: 'Denuncia2', params: { item: item, source: source }}):props.navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para denunciar um pet' }})}}>
                        <AntDesign name="warning" size={25} color="black" />   
                      </TouchableOpacity>
                      <Text>
                        Denunciar
                      </Text>
                    </View>
                  </View>      
                  <View style={{marginTop:5}}>    
                    <Text style={[styles.descText, {textAlign: 'justify', marginTop: 10}]}>{item.Descricao}</Text>
                  </View>       
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom:0}}>
                    <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth}} />
                    <View>
                      <Text style={{width: 'auto', marginHorizontal: 10, textAlign: 'center', fontFamily: 'Roboto_400Regular'}}>Informações</Text>
                    </View>
                    <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth }} />
                  </View>         
                  <View style={{marginTop: 15}}>                   
                  <Text style={styles.descText}><Text style={styles.textBold}>Sexo: </Text>{item.Sexo} </Text>  
                    <Text style={styles.descText}><Text style={styles.textBold}>Nascimento:</Text> {item.DataNasc} </Text>
                    <Text style={styles.descText}><Text style={styles.textBold}>Antirrábica:</Text> {item.Vacina?'Sim':'Não'}</Text>
                    <Text style={styles.descText}><Text style={styles.textBold}>Vermifugado:</Text> {item.Vermifugado?'Sim':'Não'}</Text>     
                    <Text style={styles.descText}><Text style={styles.textBold}>Castrado:</Text> {item.Castrado?'Sim':'Não'}</Text>                  
                  
                  </View>  
                </View>
        </View> 
        <View style={styles.contactBox}>
         
          <View style={[styles.actions, {
            
            borderTopWidth: 0.5,
            paddingTop: 10
          }]}>
              <TouchableOpacity style={[styles.action, {}]} onPress={()=> {
                setmodalVisible(true)
                sendWhatsApp(item).finally(() => {
                  setmodalVisible(false)
                })
                }}>
                  <Text style={[styles.actionText, {color: '#000'}]}>
                    Compartilhar
                  </Text>
                  <AntDesign  name="sharealt" size={30} color="#3ab6ff" />
              </TouchableOpacity>
                  
            <TouchableOpacity style={[styles.action, {  }]} onPress={contato}>
                <Text style={[styles.actionText, {color: '#000'}]}> Contato </Text>
                <FontAwesome name="whatsapp" size={30} color="#34af23" />              
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer Navigation={{...props}}/>
    </SafeAreaView>
  )
}
