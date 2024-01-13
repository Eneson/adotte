import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TextInput, TouchableHighlight, Image, ScrollView, Modal, ToastAndroid, TouchableOpacity} from 'react-native'
import { RadioButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'
import IsLogin from '../../components/IsLogin'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
import Footer from '../../components/Footer'
import api from '../../services/api'

export default function Denuncia(props) {
  const { register, setValue, handleSubmit, getValues, control, formState:{ errors } } = useForm()
  const [ pressButton, setPressButton ] = useState(false)
  const [message, setMessage] = useState("")  
  const [modalVisible, setmodalVisible] = useState(false)
  const {telefone, nome}= IsLogin()
  const navigation = useNavigation()
  const {Foto, Nome, Sexo, DataNasc, DoadorTelefone, id} = props.route.params.tipo
  
  
  useEffect(() => {
    register('nome')
    register('telefone')
  }, [register])

  
  function phoneField(onChange, onBlur, value)  {
    
    
    if(errors.telefone){
      return <TextInputMask                  
        style={[styles.input, {borderColor: errors.telefone.type=== "required"? 'red':''}]}
        placeholder={'Telefone'}
        placeholderTextColor= {errors.telefone.type=== "required" && 'red'}
        value={value}                  
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
          
        }}                  
        onChangeText={onChange}
      />
    }else {
      return <TextInputMask                  
        style={[styles.input]}
        placeholder={'Telefone'}
        value={value}                  
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
          
        }}                  
        onChangeText={onChange}
      />
    }
  }

  

  async function sendReport(e){
    var dados = {}

    if(message==""){
      return Toast("Selecione uma das opções")
    }

    if(e){
      dados = {
        "desc": message,
        "animal_id": id,
        "animal_nome": Nome,
        "doador_tel": DoadorTelefone,
        "user_nome": e.nome,
        "user_tel": e.telefone
      }
    }
    else{
      
      dados = {
        "desc": message,
        "animal_id": id,
        "animal_nome": Nome,
        "doador_tel": DoadorTelefone,
        "user_nome": nome,
        "user_tel": telefone
      }
    }
    try {
      await api.post('/report', dados)
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
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Inicio' },
            ],
          })
        );
    }

    
  }
  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };  

  return ( 
      
    <View style={styles.container}>
      <View>
        <Modal
          visible={modalVisible}
          style={{backgroundColor: '#000'}}
          transparent={true}
          onRequestClose={() => {setmodalVisible(false)}}
          
        >
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
          }}>
            <View style={{backgroundColor:'#fff',width:'80%', padding: 30, borderRadius:5}}>
              <Text style={{fontSize: 16}}>
                Nome completo e telefone para contato 
              </Text>

              <View style={styles.loginForm}>
                <Controller
                  rules={{required: 'true'}}
                  render={({ 
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => {
                    
                      return <TextInput
                      style={[styles.input, {borderColor: invalid? 'red':'#000'}]}
                      placeholder='Nome'
                      placeholderTextColor= {invalid && 'red'}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                    />
                    
                    }

                  }
                  name="nome"
                  control={control}
                  defaultValue=""
                /> 
                <View style={styles.containerTextField}>
                  <Controller
                    rules={{required: 'true'}}
                    render={({ field: {onChange, onBlur, value} }) => (
                      phoneField(onChange, onBlur, value)
                    )}
                    name="telefone"
                    control={control}
                    defaultValue=""
                    /> 
                  
                </View>                      
                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.action, {marginTop: 15}]} onPress={IsLogin()?handleSubmit(sendReport):()=>setmodalVisible(true)} >
                    <Text style={styles.actionText}>ENVIAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.action, {marginTop: 5}]} onPress={() => setmodalVisible(false)} >
                    <Text style={styles.actionText}>VOLTAR</Text>
                  </TouchableOpacity>
                </View>  
              </View>
            </View>          
          </View>
        </Modal> 
      </View>
      <ScrollView>
      <View style={styles.content}>
        <Text style={{fontSize:22, fontWeight: '600', letterSpacing: 1}}>Por que você quer reportar o anúncio?</Text>
        <View style={{flexDirection:'row', alignItems: 'center', borderWidth: 0.5, marginTop:20}}>
          <View>
            <Image
              style={{width:80, height:80}}
              source={{
                uri: 'http://adote.store/files/resize_'+Foto,
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
          <TouchableHighlight activeOpacity={1} onShowUnderlay={() => setPressButton(true)}  onHideUnderlay={() => setPressButton(false)}  underlayColor="#3ab6ff" style={styles.action} 
            onPress={IsLogin()?()=>sendReport():()=>setmodalVisible(true)}>
            <Text style={pressButton?styles.pressText: styles.actionText}>CONTINUAR</Text>
          </TouchableHighlight> 
        </View>
      </View>  
               
       

      
      </ScrollView>
      <Footer Navigation={{...props}}/>
    </View>
    
    
  )
}
