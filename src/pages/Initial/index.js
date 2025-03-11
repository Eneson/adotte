import React, { useState, useEffect, Suspense } from 'react'
import { View, TouchableOpacity,Text, FlatList, RefreshControl, StyleSheet} from 'react-native'
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
  const [animais, setAnimais] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    loadAnimais(true);
  }, []);

  async function loadAnimais(reset = false,Tipo = false) {
    setError();
    setRefreshing(true);
    
    // Se resetar for true, redefina a página para 1 e limpe os animais
    if (reset) {
      setPage(1);
      setAnimais([]);
    }

    try {
      const response = await api.get('animal', { 
        params: { 
          page: reset ? 1 : page,
          adotado: 0 
      } });
      setRefreshing(false);

      if (total > 0 && animais.length == total && !reset) return;

      var newAnimals = response.data
      
      if (Tipo) {
        newAnimals = response.data.filter(animal => animal.Tipo === Tipo);
      }

      setAnimais(reset ? newAnimals : [...animais, ...newAnimals]);
      setTotal(response.headers['x-total-count']);
      setPage(prevPage => (reset ? 2 : prevPage + 1));
    } catch (err) {
      setRefreshing(false);
      setError('Erro no servidor');
    }
  }

  // Função para atualizar todos os animais ao arrastar para baixo
  const onRefresh = () => {
    loadAnimais(true); // Passa 'true' para resetar e carregar tudo novamente
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={StylesIcon.filter}>
          <TouchableOpacity style={filter=='Todos'?StylesIcon.headerIcons:StylesIcon.headerIcons2} 
            onPress={() => {setFilter('Todos'), loadAnimais(true)}}>
              <Text style={filter=='Todos'?StylesIcon.textIconFilter:StylesIcon.textIconFilter2}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={filter=='Cão'?StylesIcon.headerIcons:StylesIcon.headerIcons2}
            onPress={() => {setFilter('Cão'),loadAnimais(true,'Cão')}}>
            <Text style={filter=='Cão'?StylesIcon.textIconFilter:StylesIcon.textIconFilter2}>Cães</Text>
          </TouchableOpacity>
          <TouchableOpacity style={filter=='Gato'?StylesIcon.headerIcons:StylesIcon.headerIcons2} onPress={() => {setFilter('Gato'),loadAnimais(true, 'Gato')}}>
              <Text style={filter=='Gato'?StylesIcon.textIconFilter:StylesIcon.textIconFilter2}>Gatos</Text>
          </TouchableOpacity>
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
              <Text>Sem pet disponível para adoção.</Text>
            </View>
          }
          {
            animais.length >= 1&&
              <FlatList
              data={animais}
              style={{backgroundColor:'#fff'}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              horizontal={false}
              numColumns={2}
              keyExtractor={(item, index) => String(item.id ?? index)}
              onEndReached={() => {loadAnimais}}
              renderItem={({ item: item }) => (            
                <View style={[styles.viewAnimais]}> 
                  <ProgressiveImage
                    source={'https://ik.imagekit.io/adote/'+JSON.parse(item.FotoName)[0]}
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

const StylesIcon = StyleSheet.create({
  textIconFilter: {
    color: '#ffffff'
  },
  textIconFilter2: {
    color: '#3ab6ff'
  },
  headerIcons:{
    marginEnd: 10,
    borderRadius: 20,      
    paddingVertical: 3,
    padding:7,
    alignContent: 'center',
    alignItems: 'center',     
    borderColor: '#3ab6ff',
    borderWidth: 1,
    backgroundColor: '#3ab6ff',
    width: 60
  },
  headerIcons2:{
    marginEnd: 10,
    borderRadius: 20,      
    paddingVertical: 3,
    padding:7,
    alignContent: 'center',
    alignItems: 'center',     
    borderColor: '#3ab6ff',
    borderWidth: 1,
    width: 60
  },
  filter:{
    marginTop: 5,
    marginStart: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom:10,
  },
  

})
