import React, { useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { AntDesign, MaterialIcons, FontAwesome5  } from '@expo/vector-icons'
import { IsLogin } from './IsLogin'


const styles = StyleSheet.create({
  animaisDesc: {
    bottom: 0,
    height: 'auto',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 10,
    paddingTop: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  descText: {
    color: '#616161',
    fontSize: 14,
  },
  descTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
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

    IsLogin()
        .then(res => {   
          if(res==false){
            setSigned(false)   
          }else{
            setSigned(true)
          }
        })
        .catch(() => (setSigned(false)));
        

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
  
  async function sendWhatsApp(item) {
    const {FotoName, telefone, Sexo, Vacina, Vermifugado, Castrado} = item

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

    return (
      <TouchableHighlight style={styles.childrenAnimais} onPress={() => {navigateToDetail(item)}}>
          {loading?<ActivityIndicator style={{display: loading?'flex':'none', marginTop: 50}} size="large" color="#3ab6ff" />:
          <ImageBackground
          imageStyle={{ borderRadius: 8}}
          source={{uri: source}}
          style={{flex: 1, justifyContent: 'flex-start'}}
          resizeMode="cover"
          >       
          <View style={{position: 'relative', alignSelf: 'flex-end', marginTop:0}}>
            <TouchableOpacity onPress={()=> setMenuVisible(true)} style={{padding:20,position: 'relative', margin: 0, display: menuVisible?'none': 'flex'}}>
              <FontAwesome5 name="ellipsis-v" size={20} color="black" />
            </TouchableOpacity>
            <View style={{display: menuVisible?'flex':'none', position: 'relative', margin: 10}} >
                    <TouchableOpacity onPress={() => sendWhatsApp(item)}>
                      <AntDesign name="sharealt" size={25} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {signed?navigation.navigate('Denuncia', {screen: 'Denuncia2', params: { item: item, source: source }}):navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para denunciar um pet' }})}}>
                      <AntDesign name="warning" size={25} color="black" />   
                    </TouchableOpacity>
                    
            </View>
          </View>
              
            <View style={styles.animaisDesc}>
              <Text style={styles.descTitle}> {item.Nome} </Text>
              <Text style={styles.descText}> {item.Sexo} </Text>
                      {favorite.includes(item.id) ? (
                        <TouchableOpacity style={{paddingTop: 5}} onPressIn={() => setFavoritePress(true)} onPress={() => props.callbackParent?props.callbackParent(item):removeFavorito(item) }>
                          {favoritePress?<ActivityIndicator style={{alignSelf: 'flex-start'}} size="small" color="#000" />:
                        <MaterialIcons name="favorite" size={25} color={'red'} />}
                        </TouchableOpacity>
                      ): (<TouchableOpacity style={{paddingTop: 5}} onPressIn={() => setFavoritePress(true)} onPress={() => {signed?favoritar(item):navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para favoritar um pet' }})}} >
                        {favoritePress?<ActivityIndicator style={{alignSelf: 'flex-start'}} size="small" color="#000" />:
                        <MaterialIcons name="favorite-border" size={25} color={'black'} />}
                    </TouchableOpacity>
                    )}
            </View>                                
          </ImageBackground>
          }
          
      </TouchableHighlight>
      
    )
  
}