import React, { useState, useEffect } from 'react'
import { AntDesign, MaterialIcons  } from '@expo/vector-icons'
import { View, TouchableOpacity, FlatList, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api'
import ProgressiveImage from '../../components/ProgressiveImage';
import Footer from '../../components/Footer';
import styles from '../Initial/styles'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function Favoritos(props) {
  const [favorite, setFavorite] = useState([])
  
  useEffect(() => {
    loadFavorites()
  }, [])  

  
  //Função carregar favoritos
  async function loadFavorites(){    
    await api.get('/animal',{}).then(async (response) => {
      const keys = await AsyncStorage.getAllKeys()   
      var teste = []
  
      for(var i =0; i<keys.length;i++){
        if(keys[i].includes('Favorite')){
          const get = await AsyncStorage.getItem(keys[i])
          const get2 = JSON.parse(get)
            for (let item of response.data) {
              if(item.id==get2.id){
                teste.push(get2)
              }
            }
        }      
      }
      setFavorite(teste)
    })
  }

  async function favoritar(item) {   
    //remover favorito
    await AsyncStorage.removeItem('@Favorite:'+item.id).then(() => {
      setFavorite(favorite.filter(res => res.id !== item.id))  
    })
    loadFavorites()
  }

  async function sendWhatsApp(data) {
    const {Foto, telefone, Sexo, Vacina, Vermifugado} = data
    var moldura = () => {
      if(Sexo=='Macho'){
        if(Vermifugado == 'true'&&Vacina == 'true'){
          return 'moldura-01.png';
        }else if(Vermifugado == 'false' && Vacina == 'true'){
          return 'moldura-02.png'
        }else if(Vermifugado == 'true' && Vacina == 'false'){
          return 'moldura-03.png';
        }else{
          return 'moldura-04.png';
        }
      }else{
        if(Vermifugado == 'true'&&Vacina == 'true'){
          return 'moldura-05.png';
        }else if(Vermifugado == 'true' && Vacina == 'false'){
          return 'moldura-06.png'
        }else if(Vermifugado == 'false' && Vacina == 'true'){
          return 'moldura-07.png';
        }else{
          return 'moldura-08.png';
        }
      }
    }
    
    const downloadInstance = FileSystem.createDownloadResumable(
      'https://ik.imagekit.io/adote/resize_'+Foto+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',ff-AbrilFatFace,co-000000,fs-35,w-300,ly-990,lx-250,ia-left,l-end,l-end',
      FileSystem.documentDirectory + Foto,
      {
        cache: true
      }
    );
    let linnk = 'https://ik.imagekit.io/adote/resize_'+Foto+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',ff-AbrilFatFace,co-000000,fs-35,w-300,ly-990,lx-250,ia-left,l-end,l-end';
    const result = await downloadInstance.downloadAsync(linnk);
    
    Sharing.shareAsync(result.uri)
    
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{display: favorite[0]==undefined? 'flex':'none', alignItems: 'center', marginTop: 20}}>
          <Text>
            Clique no icone <MaterialIcons name="favorite" size={28} color={'red'} /> Para favoritar um pet
          </Text>
        </View>
        <FlatList
          data={favorite}
          style={{flex:1}}
          scrollViewContainer={{flexGrow: 1}}
          keyExtractor={item => String(item.id)} 
          renderItem={({ item: item }) => (
          <View style={[styles.viewAnimais, {height:400}]}>
            <ProgressiveImage
              source={'https://ik.imagekit.io/adote/resize_'+item.Foto}
              item={item}
            />
            <View style={styles.animaisFooter}>
            <TouchableOpacity onPress={() => sendWhatsApp(item,item.Foto)}>
                  <AntDesign name="sharealt" size={28} color="black" />
                </TouchableOpacity>
              <TouchableOpacity onPress={() => favoritar(item)}>
                <MaterialIcons name="favorite" size={28} color={'red'} />                
              </TouchableOpacity>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>    
          </View>

      )} />

      </View>
      <Footer Navigation={{...props}}/>
    </SafeAreaView >
  )
}
