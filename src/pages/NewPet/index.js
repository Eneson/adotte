import React, { useState, useEffect } from 'react'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, Platform, TouchableHighlight, ToastAndroid, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import styles from './styles'
import Footer from '../../components/Footer'

export default function NewPet(props) {
  const [profile, setProfile] = useState([])
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [textDate, setTextDate] = useState('Data de Nascimento')
  const [porte, setPorte] = useState('Mini')
  const [sexo, setSexo] = useState('')
  const [vacine, setVacine] = useState(false)
  const [Vermifugado, setVermifugado] = useState(false)
  const [tipo, setTipo] = useState('dog')  
  const [ pressButton, setPressButton ] = useState(false)
  const navigation = useNavigation()
  const { register, handleSubmit, control, formState:{ errors } } = useForm();

  
  useEffect(() => {
    getStorage()
    register('nome')
    register('desc')
    register('teste')
  }, [register])

  const onChangeDate = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' +(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setTextDate(fDate)
   
  }
  
  const showMode = () => {
    setShow(true);
  }  

  async function getStorage() {
    try {
      const value = await AsyncStorage.getItem('@Profile:token')
      const valuejson = JSON.parse(value)
      setProfile(valuejson)      
    } catch(e) {
      Alert.alert(
        "falha na leitura de dados",
        "Verifique sua conexão e tente novamente"
      )
      navigation.navigate('Doar')
    }
  }

  const takePhotoAndUpload = async (e) => {
    setPressButton(true)
    if(textDate == 'Data de Nascimento'||sexo == ""){
      return Toast('Preencha todos os dados')
    }

    const { nome, desc } = e

    const formData = {
      'Nome': nome,
      'Descricao': desc,
      'DataNasc': textDate,
      'Porte': porte,
      'Sexo': sexo,
      'Tipo': tipo,
      'Vacina': vacine,
      'Vermifugado': Vermifugado
    };
    navigation.navigate('NewPet', { screen: 'ImageForm', params: { user: formData, profile: profile }, })
    setPressButton(false)
  }
  
  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };  

 
  return (
    <View style={styles.container}> 
      <KeyboardAvoidingView style={styles.content} behavior={'padding'}>     
              <Controller
              rules={{required: 'true'}}
              render={({ field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error } }) => {
                return <TextInput
                  style={[styles.input, {borderColor: invalid? 'red':'#000',marginTop:20}]}
                  placeholder={'Nome do pet'}
                  placeholderTextColor= {invalid && 'red'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              }}
              name="nome"
              control={control}
              defaultValue=""
              />               
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop:20}}>
                <View style={{flexDirection: 'row', flex: 3, lignItems: 'center', justifyContent: 'center'}}>
                  <View style={{marginHorizontal: 20}}>
                    <TouchableOpacity onPress={() => setTipo('dog')}>
                      <Text>Cão</Text>
                      <FontAwesome5 name="dog" size={30} color={tipo=='dog'? '#3ab6ff':'black'} />
                    </TouchableOpacity>                    
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => setTipo('cat')}>
                      <Text>Gato</Text>
                      <FontAwesome5 name="cat" size={30} color={tipo=='cat'? '#3ab6ff':'black'} />
                    </TouchableOpacity>                    
                  </View>
                  <View style={{flex: 3, marginLeft: 50,flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={{textAlign: 'center'}}>Antirrábica</Text>
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => setVacine(!vacine)}>
                          <FontAwesome5 name="syringe" size={30} color={vacine? '#3ab6ff': '#000'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                    <Text style={{textAlign: 'center'}}>Vermifugado</Text>
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => setVermifugado(!Vermifugado)}>
                          <FontAwesome5 name="tablets" size={30} color={Vermifugado? '#3ab6ff': '#000'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between',marginVertical: 20}}>
                <View style={{flex: 0.5}}>
                  <View>
                    <TouchableOpacity style={styles.date} onPress={() => showMode()} >
                      <Feather name="calendar" size={25} color="red" />
                      <Text style={styles.dateText}>{textDate}</Text>
                    </TouchableOpacity> 
                  </View>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', flex: 0.4}}>
                  <Picker
                    style={{
                      marginTop: -15,
                      marginStart: -8,
                      color: '#737380'
                    }}
                    selectedValue={sexo}
                    onValueChange={itemValue => setSexo(itemValue)}            
                    >
                    <Picker.Item label="SEXO DO PET" value="" />
                    <Picker.Item label="MACHO" value="Macho" />
                    <Picker.Item label="FÊMEA" value="Femea" />
                  </Picker> 
                </View>                
              </View>
              <Controller
                rules={{required: 'true'}}
                render={({ field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error } }) => {
                  return <TextInput
                    style={[styles.input, {borderColor: invalid? 'red':'#000', marginTop:0}]}
                    placeholder={'Descrição'}
                    placeholderTextColor= {invalid && 'red'}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    editable
                  />
                }}
              name="desc"
              control={control}
              defaultValue=""
              />  
              <TouchableHighlight 
                activeOpacity={1} 
                onShowUnderlay={() => setPressButton(true)}  
                onHideUnderlay={() => setPressButton(false)} 
                underlayColor="#3ab6ff" 
                style={styles.action} 
                onPress={handleSubmit(takePhotoAndUpload)}
              >
                <Text style={pressButton?styles.pressText: styles.actionText}>CONTINUAR</Text>
              </TouchableHighlight>         
      </KeyboardAvoidingView>   
      {/* Mostrar DatePicker */}
      {show &&(
          <DateTimePicker
            testID='dateTimePicker' 
            value={date}
            mode='date'
            is24Hour={true}
            display='default'
            onChange={onChangeDate}
      />)} 
      <Footer Navigation={{...props}}/>
    </View>
  )
}
