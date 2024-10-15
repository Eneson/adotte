import React, { useState, useEffect, Suspense } from 'react'
import { View, TouchableOpacity,Text, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import Footer from '../../components/Footer';
import styles from './styles'
import api from '../../services/api'
import ProgressiveImage from '../../components/ProgressiveImage';
import { Picker } from '@react-native-picker/picker';
import { Flow  } from 'react-native-animated-spinkit'

import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';

function Loading() {
  return <Text>🌀 Loading...</Text>;
}

export default function Initial(props) {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });
  const [animais, setAnimais] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [error, setError] = useState()
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadAnimais()
  }, [])  

  async function loadAnimais(a) { 
    setError()
    setRefreshing(true)
    if(a){
      setPage(1)
    }
    await api.get('animal', {
      params: { page },
    })
    .then((response) => {       
      setRefreshing(false);  
      if (total > 0 && animais.length == total) {      
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
    })
    .catch((a) => {
      setRefreshing(false);   
      setError('Erro no servidor')
    })
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{alignItems: 'flex-start', marginBottom:0,width: 120}}>
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
        
        <Suspense fallback={<Loading />}>
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
              <TouchableOpacity style={styles.action} onPress={() => {loadAnimais()}}>
                <Text style={styles.actionText}>Repetir</Text>
              </TouchableOpacity>
            </View>
          }          
          {
            animais.length === 0&&refreshing==false&&error!=='Erro no servidor'&&
            <View style={{alignItems: 'center',marginTop: 20}}>
              <Text>Sem pet disponivel para adoção</Text>
            </View>
          }
          {
            animais.length >= 1&&
              <FlatList
              data={animais}
              style={{backgroundColor:'#fff'}}
              refreshing={false}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => String(item.id)} 
              onEndReached={() => {loadAnimais}}
              renderItem={({ item: item }) => (            
                <View style={[styles.viewAnimais]}>      
                  <ProgressiveImage
                    source={'https://ik.imagekit.io/adote/'+item.FotoName}
                    item={item}
                  />                    
                </View>
              )}
            />
          }
            
      </Suspense>
        
      </View>
      <Footer Navigation={{...props}}/>
    </SafeAreaView >
  )
}
