import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, ToastAndroid, TouchableHighlight,ActivityIndicator, Modal } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import ProgressiveImage from '../../components/ProgressiveImage';


import api from '../../services/api'
import styles from './styles'
import Footer from '../../components/Footer'

export default function NewPet(props) {
  const [image, setImage] = useState(null);
  const [ pressButton, setPressButton ] = useState(false)
  const [modalVisible, setmodalVisible] = useState(false)
  const navigation = useNavigation()
  const uploadNewPet = async () => {
    const { DataNasc, Descricao, Nome, Porte, Sexo, Tipo, Vacina, Vermifugado } = props.route.params.user
    const { telefone, id_doador } = props.route.params.profile
    let localUri = image;    
    
    if(!image){      
      return Toast('Adicione uma imagem')
    }
    setmodalVisible(true)
    let filename = localUri.split('/').pop()    
   
    //Pegar o tipo do arquivo
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    filename = new Date().toISOString().replace(/:/g, '-') + filename

    let formData = new FormData(); 
    formData.append('produto_imagem', { uri: localUri, name: filename, type });
    formData.append('Nome', Nome);
    formData.append('Descricao', Descricao);
    formData.append('DataNasc', DataNasc);
    formData.append('Porte', Porte);
    formData.append('Sexo', Sexo);
    formData.append('Tipo', Tipo);
    formData.append('Vacina', Vacina);
    formData.append('FotoName', filename);
    formData.append('localDir', image)
    formData.append('id_doador', id_doador)
    formData.append('Vermifugado', Vermifugado)

    
    await api.post('/animal', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'authorization':  telefone},
    }).then(res => {
      Toast('Cadastrado com sucesso')
      setmodalVisible(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Inicio' },
          ],
        })
      );
    }).catch(err => {    
      Toast('Erro no cadastro')
      setmodalVisible(false)
    });
  }
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [25, 31],      
      quality: 1,
    });
    if (!result.canceled) {
      
      setImage(result.assets[0].uri);
    }
  };

  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };  
 
  return (
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
      <View style={styles.content}>  
        <View>
          {image&&(
                  <View style={{height: 400}}>
                    <ProgressiveImage
                      source={image}
                      item={ props.route.params.user}
                    />
                  </View>
          )
          }

        </View> 
        <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}> 
          <TouchableOpacity onPress={() => pickImage()}>
            <View style={styles.viewFoto}>
              <Ionicons name="add-circle-outline" size={100} color="black" />
              <Text style={{fontSize: 20}}>
                Adicionar Foto
              </Text>
            </View>
          </TouchableOpacity>
        </View>     
        <TouchableHighlight activeOpacity={1} onShowUnderlay={() => setPressButton(true)}  onHideUnderlay={() => setPressButton(false)} underlayColor="#3ab6ff" style={styles.action} onPress={() => uploadNewPet()} >
          <Text style={pressButton?styles.pressText:styles.actionText}>FINALIZAR</Text>
        </TouchableHighlight>                 
      </View>  
      <Footer Navigation={{...props}}/>
      
    </View>
  )
}
