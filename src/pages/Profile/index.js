import React, { useState, useEffect } from 'react'
import { AntDesign, FontAwesome5,FontAwesome } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, FlatList, Image, Alert, Modal, ToastAndroid, ActivityIndicator  } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flow  } from 'react-native-animated-spinkit'

import Footer from '../../components/Footer';
import styles from './styles'
import api from '../../services/api'

import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

import { onSignOut, IsLogin } from '../../utils/IsLogin'; 
import { isLoaded } from 'expo-font';



export default function Initial(props) {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular,
    Montserrat_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });
  
  const [userEmail, setUserEmail] = useState()
  const [id_user, setId_User] = useState()
  const [telefone, setTelefone] = useState()
  const [nome, setNome] = useState()
  const [animais, setAnimais] = useState()
  const [index, setIndex] = useState(0);  
  const [modalVisible, setmodalVisible] = useState(false)
  const [error, setError] = useState()
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation()
  const [signed,setSigned] = useState(false);
  const [isChecked,setChecked] = useState(false);
  
  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };
  
  const [routes] = useState([
    { key: 'first', title: 'Meus Pets' },
    { key: 'second', title: 'Configurações' },
  ]);
  
  function navigateToEditar() {
    IsLogin((resultado) => {
      if(resultado!=false){
        navigation.navigate('Editar', {screen: 'Editar2', params: { item: resultado }})             
      }              
      setSigned(resultado)            
    })

  }
  
  useEffect(() => {
    loadAnimais()

    IsLogin((resultado) => {
      if(resultado!=false){
          var palavras = resultado.nome.split(' ');
          setNome(palavras.slice(0, 2).join(' '))                
          setTelefone(resultado.telefone)                
          setUserEmail(resultado.email)
      }              
      setSigned(resultado)            
    })
  }, [])
  
  
  async function loadAnimais() {  
    setError()
    setRefreshing(true)

    const token = await AsyncStorage.getItem('@Profile:token')

    await api.get('/animal/myanimals', {
      headers: {'authorization':  'Bearer '+token.replace(/"/g, '') },
    }).then((response) => {
      if(response.data.length === 0){
        setAnimais(null)   
      }else{
        setAnimais(response.data) 
      }
      setError(false) 
    }).catch((err) => {
      setError('Erro no servidor')
    }).finally(() => {
      setRefreshing(false)
    })
        
  }

  async function deleteAnimal(id) {
    Alert.alert('ATENÇÃO', 'Tem certeza que deseja excluir o pet selecionado?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      { text: 'Sim', onPress: async () => {
        setmodalVisible(true)
        const token = await AsyncStorage.getItem('@Profile:token')
          
        try {
          await api.delete(`animal/${id}`, {
            headers: {
              Authorization: 'Bearer '+token.replace(/"/g, ''),
              Id_user: id_user
            }
          }).then((e) =>{        
            setmodalVisible(false)
            setAnimais(animais.filter(animal => animal.id !== id))
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Profile' }, 
                ],
              })
            );
          })
          
          
        } catch (err) {
          alert('Erro ao deletar animal, tente novamente.')
          setmodalVisible(false)
        }
      } },
  ]);

    
  }

 

  async function deleteDoador() { 
    Alert.alert('ATENÇÃO', 'Tem certeza que deseja apagar todos os seus dados?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      { text: 'Sim', onPress: async () => {
        setmodalVisible(true)
        try {
          await api.delete(`user/${signed.id_user}`, {
            headers: { 'authorization':  'Bearer '+signed.Token.replace(/"/g, '')},
          }).then(() => {
            onSignOut(navigation,CommonActions)
          })    
        } catch (err) {
          alert('Erro ao deletar usuário, tente novamente.')
        }
        setmodalVisible(false)
        
      } },
  ]);  
    
  }

  //Configuraçoes
  const FirstRoute = () => (
    <View style={styles.container}>
      <View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigateToEditar('Editar')}>
        <FontAwesome5 name="edit" size={20} color="black" />
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity >
      <TouchableOpacity style={styles.button} onPress={() => deleteDoador() }>
        <AntDesign name="deleteuser" size={20} color="black" />
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {onSignOut(navigation,CommonActions)}} style={styles.button}>
        <AntDesign name="logout" size={20} color="black" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );

  async function adotado(id,Adotado) {
    setmodalVisible(true)
    const token = await AsyncStorage.getItem('@Profile:token')
    var data;
    if(Adotado=='0'){
      data = '1'
    }else{
      data = '0'
    }
    
    const dados = {
      "Adotado": data
    }  
    await api.post(`/animal/update_adotado/${id}`, dados, {
      headers: { 
        'authorization':  'Bearer '+token.replace(/"/g, ''),
        'id_user': id_user
      },
    }).then(res => {
        Toast('Alterado com sucesso')
        loadAnimais()
        setChecked(!isChecked)
    }).catch(err => {    
      Alert.alert(
        "Erro",
        "Não foi possível estabelecer conexão com o servidor. \nVerifique sua conexão e tente novamente."
      )
    })
    setmodalVisible(false)
  }

  const filtroAdotado = (Adotado) => {
    if(Adotado){
      return 'tr:h-300,e-grayscale,l-text,i-ADOTADO,bg-white,pa-10,fs-40,rt-340,l-end/'
    }
    return ''
  }
  //Meus pets
  const SecondRoute = () => (
    <View style={styles.container}>
      {/* MODAL LOADING */}
      <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <Flow size={50} color="#3ab6ff"/>
        </View>
      </Modal> 
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
            <TouchableOpacity style={styles.action_error} onPress={() => {loadAnimais()}}>
              <Text style={styles.actionText_error}>Repetir</Text>
            </TouchableOpacity>
          </View>
      }
      {
        error==false&&animais==null&&
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text>
           Sem pet cadastrado em sua conta.
          </Text>
        </View>
      }
      <FlatList
      data={animais}      
      keyExtractor={(item, index) => String(item.id ?? index)} 
      refreshing={true}
      renderItem={({ item: item }) => (     
        
        <TouchableOpacity 
          disabled={isChecked} 
          onPress={() => props.navigation.navigate('Adotar', {screen: 'Adotar2', params: { item: item, source: 'https://ik.imagekit.io/adote/'+item.FotoName }})}
        >
          <View style={styles.viewAnimal}>
            <Image              
              style={[styles.animalImage]}
              source={{uri: "https://ik.imagekit.io/adote/"+filtroAdotado(item.Adotado)+JSON.parse(item.FotoName)[0]}}
            
              //source={{uri: 'https://ik.imagekit.io/adote/'+isChecked?'tr:h-300,e-grayscale':''+'/'+item.FotoName}}
            />
            <View style={styles.animalFooter}>                
              <View style={styles.animalDesc}>
                <Text style={styles.animalName}>{item.Nome}</Text>
              </View>
              <View style={styles.animalButton}>
              <TouchableOpacity style={[styles.action, {backgroundColor: '#fff',borderColor: '#000', borderWidth: 1}]} onPress={() => props.navigation.navigate('UpdatePet', {screen: 'updatePet2', params: { item: item, source: JSON.parse(item.FotoName) }})}>
                <Text style={[styles.actionText, {color: '#000'}]}> Editar </Text>
                <AntDesign name="form" size={20} color="#000" />             
              </TouchableOpacity>
              <TouchableOpacity style={[styles.action, {backgroundColor: '#fff', borderColor: '#000', borderWidth: 1}]} onPress={() => adotado(item.id,item.Adotado) }>
                <Text style={[styles.actionText, {color: '#000'}]}> Adotado </Text>
                {item.Adotado?<FontAwesome name="check" size={20} color="#000" />:''}
                     
              </TouchableOpacity>
              <TouchableOpacity style={[styles.action, {backgroundColor: '#DC3545'}]} onPress={() => deleteAnimal(item.id)}>
                <Text style={styles.actionText}> Excluir </Text>
                <AntDesign name="delete" size={20} color="#fff" />             
              </TouchableOpacity>
              
              </View>
            </View>    
          </View>
        </TouchableOpacity>  
      )} /> 
          
    </View>
  );
  
  const renderScene = SceneMap({
    first: SecondRoute,
    second: FirstRoute,
    
  });
  
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000' }}
      style={{ backgroundColor: '#fff' }}
      activeColor={'#000'}
      inactiveColor={'#000'}
      
    />
  );
  
  return (
      <View style={styles.container}>        
        <View style={styles.content}> 
        <View style={styles.profileHeader}>
          <Text style={styles.headerName}>{nome}</Text>
          <Text style={styles.headerNumber}>{telefone}</Text>
          <Text>{userEmail}</Text>
        </View>
          <TabView
          keyExtractor={(item, index) => String(item.id ?? index)}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}    
            renderTabBar={renderTabBar}        
          />          
        </View>
      <Footer Navigation={props}/>
      </View>
  )
}
