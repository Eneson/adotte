import React, { useState, useEffect } from 'react'
import { AntDesign, FontAwesome5, Feather  } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, FlatList, Image, Alert, Modal, ActivityIndicator  } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Footer from '../../components/Footer';
import styles from './styles'
import IsLogin from '../../components/IsLogin'
import api from '../../services/api'
import Logout from '../../components/Logout';

export default function Initial(props) {
  const {telefone, nome, id_doador}= IsLogin()
  
  const [animais, setAnimais] = useState()
  const [index, setIndex] = useState(0);  
  const [modalVisible, setmodalVisible] = useState(false)
  const navigation = useNavigation()
  const [routes] = useState([
    { key: 'first', title: 'Meus Pets' },
    { key: 'second', title: 'Configuraçoes' },
  ]);

  useEffect(() => {
    loadAnimais()
  })
  
  function maskPhone(telefone){     
    
    var value =  new String(telefone)
    
    if(value){
      
      if(value.length==11){
        var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        
        return(value)
      }else{
        var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        
        return(value)
      }
    }
    else{
      return('err')
    }
  }

  async function loadAnimais() {  
    if(animais){
      return
    }
    const response = await api.get('animal', {
      params: { telefone: telefone }
    })
    setAnimais(response.data)    

        
  }

  async function deleteAnimal(id) {
    setmodalVisible(true)
    try {
      await api.delete(`animal/${id}`, {
        headers: {
          Authorization: id_doador,
        }
      }).then((e) =>{        
        setmodalVisible(false)
        setAnimais(animais.filter(animal => animal.id !== id))
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Inicio' },
            ],
          })
        );
      })
      
      
    } catch (err) {
      alert('Erro ao deletar animal, tente novamente.')
      setmodalVisible(false)
    }
  }

  // async function logOut(){
  //   try{
  //     await AsyncStorage.removeItem('@Profile:token');
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [
  //           { name: 'Inicio' },
  //         ],
  //       })
  //     );
  //   }catch {

  //   }
  // }

  const createTwoButtonAlert = () =>
    Alert.alert('CUIDADO', 'Tem certeza que deseja apagar todos os seus dados?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => deleteDoador() },
  ]);
  async function deleteDoador() {

    
    try {
      await api.delete(`doador/${telefone}`, {
        headers: {
          Authorization: telefone,
        }
      }).then(() => {
        logOut()
      })
      
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  //Configuraçoes
  const FirstRoute = () => (
    <View style={styles.container}>
      <View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Editar')}>
        <FontAwesome5 name="edit" size={20} color="black" />
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity >
      <TouchableOpacity style={styles.button} onPress={createTwoButtonAlert}>
        <AntDesign name="deleteuser" size={20} color="black" />
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Logout(navigation)}} style={styles.button}>
        <AntDesign name="logout" size={20} color="black" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );

  //Meus pets
  const SecondRoute = () => (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: 'center'
        }}>
          <View style={{backgroundColor:'#fff',padding:10, borderRadius:5}}>
            <ActivityIndicator  size="large" />
          </View>
        
        </View>
      </Modal> 
      
      
      <FlatList
        data={animais}
        keyExtractor={item => String(item.id)} 
        refreshing={true}
        ListEmptyComponent={() => (
          <View style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
            <Text>
              Clique no icone <Feather name="sun" size={30} color="#000" /> Para DOAR um pet
            </Text>
          </View> 
        )}
        renderItem={({ item: item }) => (          
          <View style={styles.viewAnimal}>
            <Image
              style={styles.animalImage}
              source={{uri: 'https://ik.imagekit.io/adote/resize_'+item.Foto}}
            />
            <View style={styles.animalFooter}>
              <View style={styles.animalButton}>
                <TouchableOpacity onPress={() => deleteAnimal(item.id)}>
                  <AntDesign name="delete" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.animalDesc}>
                <Text style={styles.animalName}>{item.Nome}</Text>
                <Text style={styles.animalSexo}>Sexo: {item.Sexo}</Text>
                <Text style={styles.animalNasc}>Nascimento: {item.DataNasc}</Text>
                <Text style={styles.animalPorte}>Porte: {item.Porte}</Text>
                <Text style={styles.animalTextDesc}>{item.Descricao}</Text>
              </View>
              
            </View>    
          </View>

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
          <Text style={styles.headerNumber}>{maskPhone(telefone)}</Text>
        </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}    
            renderTabBar={renderTabBar}        
          />
          
        </View>
        
      <Footer Navigation={{...props}}/>
      </View>
  )
}
