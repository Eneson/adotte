import React from 'react'
import {  StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Linking, ImageBackground } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

import styles from './styles'
import Footer from '../../components/Footer';

export default function Adotar(props) {

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
  async function sendWhatsApp() {
    const {FotoName, telefone, Sexo, Vacina, Vermifugado, Castrado} = item
    
    var moldura = () => {
      if(Sexo=='Macho'){        
        return 'moldura-04.png';        
      }else{        
        return 'moldura-08.png';        
      }
    }
    var attr = () => {
      var text = ''
      if(Vacina){
        text = 'Vacinado '
      }
      if(Castrado){
        text = text+'Castrado '
      }
      if(Vermifugado){
        text = text+'Vermifugado '
      }
      return text
    }
    const downloadInstance = FileSystem.createDownloadResumable(
      //'https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',ff-AbrilFatFace,co-000000,fs-35,w-300,ly-990,lx-250,ia-left,l-end,l-end',
      'https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',ff-AbrilFatFace,fs-35,w-300,ly-990,lx-250,ia-left,l-end,l-end:l-text,i-'+attr()+',fs-25,ly-1040,lx-100,ia-left,l-end',
      FileSystem.documentDirectory + FotoName,
      {
        cache: true
      }
    );
    //let linnk = 'https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',ff-AbrilFatFace,co-000000,fs-35,w-300,ly-990,lx-250,ia-left,l-end,l-end';
    let linnk = 'https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',ff-AbrilFatFace,fs-35,w-300,ly-990,lx-250,ia-left,l-end,l-end:l-text,i-'+attr()+',fs-25,ly-1040,lx-100,ia-left,l-end'
    const result = await downloadInstance.downloadAsync(linnk);
    Sharing.shareAsync(result.uri)
    
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
                    <TouchableOpacity onPress={sendWhatsApp}>
                        <AntDesign name="sharealt" size={30} color="#000" />
                    </TouchableOpacity>
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
