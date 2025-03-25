import React, { useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator,Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendWhatsApp } from '../utils/sendWhatsapp';
import { AntDesign, MaterialIcons, Ionicons, FontAwesome5  } from '@expo/vector-icons'
import { IsLogin } from '../utils/IsLogin'; 

import { Flow  } from 'react-native-animated-spinkit'

const styles = StyleSheet.create({
  animaisDesc: {
    bottom: 0,
    height: 'auto',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(148, 148, 148, 0.5)',
    paddingLeft: 10,
    paddingTop: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  descText: {
    color: '#ccc',
    fontSize: 14,
  },
  descTitle: {
    color: '#ffff',
    fontSize: 20,
  },
  childrenAnimais: {
    flex: 1,    
    justifyContent: 'center',
  },
});


export default function ProgressiveImage(props) {
  const {source, item} = props  
  const [favorite, setFavorite] = useState([])
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)  
  const [loading, setLoading] = useState(true)
  const [favoritePress, setFavoritePress] = useState(false)
  const [signed, setSigned] = useState(false)
  const [modalVisible, setmodalVisible] = useState(false)

  useEffect(() => {    
    IsLogin((resultado) => {
      setSigned(resultado)
    });
  }, [])

        

  function navigateToDetail(item) {
    navigation.navigate('Adotar', {screen: 'Adotar2', params: { item: item, source: source }})
  }
  
  useEffect(() => {
    navigation.addListener('focus', () => {
      setMenuVisible(false)
      setLoading(true)
      loadFavorites()
    });
  }, [navigation]);

  useEffect(() => {    
    loadFavorites()
  }, [])

  async function loadFavorites(){
    const keys = await AsyncStorage.getAllKeys()
    var teste = []
    for(var i =0; i<keys.length;i++){
      if(keys[i].includes('Favorite')){
        const get = await AsyncStorage.getItem(keys[i])
        const get2 = JSON.parse(get)
        teste[i] = get2.id
      }      
    }
    setFavorite(teste)
    setLoading(false)    
    setFavoritePress(false)
  }

  async function removeFavorito(item) {       
    await AsyncStorage.removeItem('@Favorite:'+item.id).then(() => {
      setFavorite(favorite.filter(res => res.id !== item.id))  
    })
    loadFavorites()
  }

  async function favoritar(item) {
    //operador ternario adcionar e remover favorito
    {favorite.includes(item.id) ? (await AsyncStorage.removeItem('@Favorite:'+item.id))
    : ( await AsyncStorage.setItem('@Favorite:'+item.id, JSON.stringify(item)))}
    loadFavorites()
  }
  
  
    return (
      <TouchableHighlight style={styles.childrenAnimais} onPress={() => {navigateToDetail(item)}}>
        
        
          {loading?<ActivityIndicator style={{display: loading?'flex':'none', marginTop: 50}} size="large" color="#3ab6ff" />:
          <ImageBackground
          imageStyle={{ borderRadius: 8}}
          source={{uri: source}}
          style={{flex: 1, justifyContent: 'flex-start'}}
          resizeMode="cover"
          >
            <View style={styles.animaisDesc}>
              <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
                <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <Flow size={50} color="#3ab6ff"/>
                </View>
              </Modal>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.descTitle, {flex: 0.9}]}> {item.Nome} </Text>
                  <Text style={styles.descText}> {item.Sexo} </Text>
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginEnd: 10, 
                marginVertical: 5,
                borderTopWidth: 1, 
                borderTopColor: 'rgba(33 37 41 / 0.2)',
                marginTop: 5, 
                paddingTop: 5}}>
                {favorite.includes(item.id) ? (
                  <TouchableOpacity onPressIn={() => {}} onPress={() => {
                    setFavoritePress(true) 
                    props.callbackParent?props.callbackParent(item):removeFavorito(item) } }>
                    {favoritePress?<ActivityIndicator style={{alignSelf: 'flex-start'}} size="small" color="#000" />:
                  <MaterialIcons name="favorite" size={25} color={'#DC3545'} />}
                  </TouchableOpacity>
                ): (<TouchableOpacity onPressIn={() => {}} onPress={() => {
                  setFavoritePress(true)
                  signed?favoritar(item):navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para favoritar um pet' }})}} >
                  {favoritePress?<ActivityIndicator style={{alignSelf: 'flex-start'}} size="small" color="#000" />:
                  <MaterialIcons name="favorite-border" size={25} color={'rgba(0 0 0 / 0.6)'} />}
                </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => {
                  setmodalVisible(true)
                  sendWhatsApp(item,0).finally(() => {
                    setmodalVisible(false)
                  })
                }}>
                  <AntDesign name="sharealt" size={25} color="rgba(0 0 0 / 0.6)" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {signed?navigation.navigate('Denuncia', {screen: 'Denuncia2', params: { item: item, source: source }}):navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para denunciar um pet' }})}}>
                  <AntDesign name="warning" size={25} color="rgba(0 0 0 / 0.6)" />   
                </TouchableOpacity>
              </View>
            </View>                                
          </ImageBackground>
          }
          
      </TouchableHighlight>
      
    )
  
}