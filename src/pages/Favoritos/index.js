import React, { useState, useEffect } from 'react'
import { MaterialIcons  } from '@expo/vector-icons'
import { View, TouchableOpacity, FlatList, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flow  } from 'react-native-animated-spinkit'

import api from '../../services/api'
import ProgressiveImage from '../../components/ProgressiveImage';
import Footer from '../../components/Footer';
import styles from '../Initial/styles'

import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';

export default function Favoritos(props) {
  const [favorite, setFavorite] = useState([])
  const [error, setError] = useState()
  const [refreshing, setRefreshing] = useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular
  });

  useEffect(() => {
    loadFavorites()
  }, [])   
  
  //Função carregar favoritos
  async function loadFavorites(){   
    setError()
    setRefreshing(true)
    await api.get('animal', { 
      params: { 
        adotado: 0 
    } })    
    .then(async (response) => {       
      setError(false)
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
    }).catch(() => {
      setError('Erro no servidor')
    })  
    setRefreshing(false)
  }

  async function onChildChanged(item) {
    await AsyncStorage.removeItem('@Favorite:'+item.id).then(() => {
      setFavorite(favorite.filter(res => res.id !== item.id))  
    })
    loadFavorites()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {
            refreshing==true&&
            <View style={{alignItems: 'center',marginTop: 20}}>
              <Flow size={50} color="#3ab6ff"/>
            </View>
          }
          {
            error=='Erro no servidor'&&
            <View style={{alignItems: 'center',marginTop: 20}}>
              <Text>Sem conexão com o servidor </Text>
              <TouchableOpacity style={styles.action} onPress={() => {loadFavorites()}}>
                <Text style={styles.actionText}>Repetir</Text>
              </TouchableOpacity>
            </View>
          }
          {
            favorite.length == 0&&refreshing==false&&error!='Erro no servidor'&&
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text>
                Clique no ícone <MaterialIcons name="favorite" size={28} color={'red'} /> para favoritar um pet.
              </Text>
            </View>
          }
          
              <FlatList
              data={favorite}
              style={{backgroundColor:'#fff', }}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => String(item.id)}           
              renderItem={({ item: item }) => (
              <View style={styles.viewAnimais}>
                <ProgressiveImage
                   source={'https://ik.imagekit.io/adote/'+JSON.parse(item.FotoName)[0]}
                  item={item}
                  callbackParent={(item) => onChildChanged(item)}
                />
              </View>
            )} />
                  
      </View>
      <Footer Navigation={{...props}}/>
    </SafeAreaView >
  )
}
