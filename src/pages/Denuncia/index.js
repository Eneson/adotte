import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TextInput, TouchableHighlight, Image, ScrollView, Modal, ToastAndroid, TouchableOpacity} from 'react-native'
import { RadioButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IsLogin } from '../../components/IsLogin'
import styles from './styles'
import Footer from '../../components/Footer'
import api from '../../services/api'
import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';

export default function Denuncia(props) {
  const [message, setMessage] = useState("")  
  const [modalVisible, setmodalVisible] = useState(false)
  const [data, setData] = useState(null)

  const navigation = useNavigation()
  const {Foto, Nome, Sexo, DataNasc, DoadorTelefone, id} = props.route.params.item
  console.log(props.route.params.item)
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular
  });
  
 
  async function sendReport(e){
    var dados = {}

    if(message==""){
      return Toast("Selecione uma das opções")
    }

    dados = {
      "desc": message,
      "animal_id": id,
      "animal_nome": Nome,
    }
    const token = await AsyncStorage.getItem('@Profile:token')
    try {
      await api.post('/report', dados, {
        headers: { 'authorization':  'Bearer '+token.replace(/"/g, '')},
      })
      .then(res => {
        Toast(res.data.mess)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Inicio' },
            ],
          })
        );
        })        
    } 
    catch {
        Toast('Erro no servidor')
        
    }

    
  }
  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };  

  return ( 
      
    <View style={styles.container}>
      <View>
        
      </View>
      <ScrollView>
      <View style={styles.content}>
        <Text style={{fontSize:22, fontWeight: '600', letterSpacing: 1}}>Por que você quer reportar o anúncio?</Text>
        <View style={{flexDirection:'row', alignItems: 'center', borderWidth: 0.5, marginTop:20}}>
          <View>
            <Image
              style={{width:80, height:80}}
              source={{
                uri: 'https://ik.imagekit.io/adote/resize_'+Foto,
              }}
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize:20, fontWeight:'500'}}>{Nome}</Text>
            <Text>{Sexo}</Text>
            <Text>{DataNasc}</Text>
          </View>          
        </View>
        <View style={{ marginTop:20}}>
          <RadioButton.Group  onValueChange={value => setMessage(value)} value={message}>
            <RadioButton.Item style={styles.RadioButton} labelStyle={styles.RadioLabel} position='leading'
              value="O animal parece ser resultado de um ato ilegal."
              label="O animal parece ser resultado de um ato ilegal."/>
            <RadioButton.Item style={styles.RadioButton} labelStyle={styles.RadioLabel} position='leading'
              value="O anunciante não é o verdadeiro dono do animal."
              label="O anunciante não é o verdadeiro dono do animal."/>
            <RadioButton.Item style={styles.RadioButton} labelStyle={styles.RadioLabel} position='leading'
              value="Sugere no anúncio ações que podem ser fraudulentas."
              label="Sugere no anúncio ações que podem ser fraudulentas."/>
            <RadioButton.Item style={styles.RadioButton} labelStyle={styles.RadioLabel} position='leading'
              value="O animal está sendo vendido."
              label="O animal está sendo vendido."/>
            <RadioButton.Item style={[styles.RadioButton, {borderBottomWidth: 0.5}]} labelStyle={styles.RadioLabel} position='leading'
              value="O anúncio tem conteúdo ofensivo, obsceno ou discriminatório."
              label="O anúncio tem conteúdo ofensivo, obsceno ou discriminatório."/>
          </RadioButton.Group>
          <TouchableOpacity style={styles.action} onPress={()=>sendReport()}>
            <Text style={styles.actionText}>CONTINUAR</Text>
          </TouchableOpacity> 
        </View>
      </View>  
               
       

      
      </ScrollView>
      <Footer Navigation={{...props}}/>
    </View>
    
    
  )
}
