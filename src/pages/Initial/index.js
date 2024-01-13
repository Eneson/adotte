import React, { useState, useEffect } from 'react'
import { AntDesign, MaterialIcons  } from '@expo/vector-icons'
//import Share from "react-native-share";
import { View, TouchableOpacity,Text, FlatList, ActivityIndicator, RefreshControl, Share} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import Footer from '../../components/Footer';
import styles from './styles'
import api from '../../services/api'
import ProgressiveImage from '../../components/ProgressiveImage';
import { Picker } from '@react-native-picker/picker';

export default function Initial(props) {
  const [animais, setAnimais] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [favorite, setFavorite] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadAnimais()
  }, [])  

  React.useEffect(
    () => props.navigation.addListener('focus', () => loadFavorites()),
    []
  );

  async function loadAnimais(a) { 
    setRefreshing(true);   
    if(a){
      setPage(1)
    }
    await api.get('animal', {
      params: { page }
    })
    .then((response) => {     
      setError(false)
      if (total > 0 && animais.length == total) {
        setRefreshing(false);
        return
      }
      if(props.route.params){      
        const {tipo} = props.route.params
        
        if(tipo == false){
          setAnimais([...animais, ...response.data])
        }else{
          setAnimais([...animais, ...response.data.filter(animal => animal.Tipo === tipo)])
        }
        
      }else {
        setAnimais([...animais, ...response.data])
      }
      setTotal(response.headers['x-total-count'])
      setPage(page + 1)
      //setLoading(false)
      setRefreshing(false);
    })
    .catch((a) => {
      setError('Erro no servidor')
      setRefreshing(false);
      return
    })
  }

  //Função carregar favoritos
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
  }

  async function favoritar(item) {
    //operador ternario adcionar e remover favorito
    {favorite.includes(item.id) ? (await AsyncStorage.removeItem('@Favorite:'+item.id))
    : ( await AsyncStorage.setItem('@Favorite:'+item.id, JSON.stringify(item)))}
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
        <View style={{alignItems: 'flex-start', marginBottom:0,width: 120,}}>
            <Picker
            numberOfLines={10}
              style={{
                width: '100%',
                color: '#000',
              }}
              selectedValue={props.route.params? props.route.params.tipo: 'Filtrar'}
              onValueChange={itemValue => props.navigation.replace('Inicio', { screen: 'Inicio2', params: { tipo: itemValue}, })}
              >
              <Picker.Item label="Filtro" value={false} />
              <Picker.Item label="Cão" value="dog" />
              <Picker.Item label="Gato" value="cat" />
            </Picker>          
      </View>    

        {
          <Text style={{display: error=='Erro no servidor'? 'flex': 'none'}}>{error}</Text>
        }
        <FlatList
          data={animais}
          style={{flex:1}}
          refreshing={refreshing}
          scrollViewContainer={{flexGrow: 1}}
          keyExtractor={item => String(item.id)} 
          onEndReached={loadAnimais}
          onRefresh={loadAnimais}    
          ListEmptyComponent={() => (
            <View style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
              <Text>
                Sem pet disponivel para adoção
              </Text>
            </View> 
          )}     
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
                {favorite.includes(item.id) ? (
                  <MaterialIcons name="favorite" size={28} color={'red'} />
                ): (<MaterialIcons name="favorite-border" size={28} color={'black'} />)}
                  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Denuncia', { screen: 'Denuncia2', params: { tipo: item}, })}>
                  <AntDesign name="warning" size={28} color="black" />                  
                </TouchableOpacity>
              </View>    
            </View>

          )} />

      </View>
      <Footer Navigation={{...props}}/>
    </SafeAreaView >
  )
}
