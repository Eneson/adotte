import React, { useState, useEffect } from 'react'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, Platform, TouchableHighlight, ToastAndroid, SafeAreaView, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';

import styles from './styles'
import Footer from '../../components/Footer'
import ImageForm from '../ImageForm'

export default function NewPet(props) {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular
  });

  const [profile, setProfile] = useState([])
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [textDate, setTextDate] = useState('Data de Nascimento')
  const [sexo, setSexo] = useState('')
  const [vacine, setVacine] = useState(false)
  const [Vermifugado, setVermifugado] = useState(false)
  const [tipo, setTipo] = useState('dog')  
  const [ pressButton, setPressButton ] = useState(false)
  const [castrado ,setCastrado] = useState(false)
  const navigation = useNavigation()
  const { register, handleSubmit, control, formState:{ errors } } = useForm();
  
  const [dateError, setDateError] = useState(false)
  const [sexoError, setSexoError] = useState(false)

  
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
    setDateError(false)
   
  }
  
  const showMode = (onChange) => {
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
    if(textDate == 'Data de Nascimento'){
      setDateError(true)
    }
    if(sexo == ''){
      setSexoError(true)
    }
    if(textDate == 'Data de Nascimento'||sexo == ''){
      setPressButton(false)
      return Toast("Preencha todos os dados")
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
    
  }
  
  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };  
  
  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView style={styles.content} behavior={'padding'}> 
      {/* foto */}
      <ImageForm />
        {/* NOME */}
        <View style={styles.containerTextField}>    
          <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error } }) => {
            return <View>
              <Text style={[styles.title]}>Nome</Text>
              <TextInput
                style={[styles.input, {borderColor: invalid? 'red':'#3a77ff',}]}
                placeholder='Nome'
                keyboardType='default'
                autoComplete='name'
                placeholderTextColor= {invalid && 'red'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
              <Text style={[{color: 'red'}]}>{errors.nome?errors.nome.type=='required'?'Campo obrigatorio':'':''}</Text>
            </View>
          }}
          name="nome" 
          control={control}
          defaultValue=""
          />  
        </View>  
        {/* ESPECIE */}
        <View>
          <Text style={styles.title}>Espécie</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>  
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: tipo=='dog'? '#3ab6ff':'#fff', }]} onPress={() => setTipo('dog')}>
              <Text style={[styles.actionText,{color: tipo=='dog'? '#fff':'#000'}]}>Cachorro</Text>
            </TouchableOpacity> 
              <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: tipo=='cat'? '#3ab6ff':'#fff', }]} onPress={() => setTipo('cat')}>
              <Text style={[styles.actionText,{color: tipo=='cat'? '#fff':'#000'}]}>Gato</Text>
            </TouchableOpacity> 
          </View>
        </View>
        <View>     
          {/* Data de nascimento */}
        <Text style={styles.title}>Data de nascimento</Text> 
          <TouchableOpacity style={styles.date} onPress={() => showMode()} >
            <Feather name="calendar" size={30} color={dateError? 'red':'#3a77ff'} />
            <Text style={[styles.dateText, {borderColor: dateError? 'red':'#3a77ff'}]}>{textDate}</Text>
          </TouchableOpacity>  
                         
        </View>
        {/* SEXO */}
        <View>
          <Text style={styles.title}>Sexo</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>                    
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: sexo=='Femea'? '#3ab6ff':'#fff', borderColor: sexoError?'red':'#3a77ff'}]} onPress={() => setSexo('Femea')}>
              <Text style={[styles.actionText,{color: sexo=='Femea'? '#fff':'#000'}]}>Fêmea</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: sexo=='Macho'? '#3ab6ff':'#fff', borderColor: sexoError?'red':'#3a77ff'}]} onPress={() => setSexo('Macho')}>
              <Text style={[styles.actionText,{color: sexo=='Macho'? '#fff':'#000'}]}>Macho</Text>
            </TouchableOpacity>  
          </View>
        </View>
        <View style={{flexGrow: 1}}>
          <Text style={styles.title}>Outras informações:</Text>
            <View style={{flex: 1}}>
              <TouchableOpacity style={[styles.action,{backgroundColor: castrado? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => setCastrado(!castrado)}>
                <FontAwesome5 name="syringe" size={30} color={castrado? '#fff': '#3a77ff'} />
                <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: castrado? '#fff': '#000'}]}>Castrado</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity style={[styles.action,{backgroundColor: vacine? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => setVacine(!vacine)}>
                <FontAwesome5 name="syringe" size={30} color={vacine? '#fff': '#3a77ff'} />
                <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: vacine? '#fff': '#000'}]}>Antirrábica</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity style={[styles.action,{backgroundColor: Vermifugado? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => setVermifugado(!Vermifugado)}>
                <FontAwesome5 name="tablets" size={30} color={Vermifugado? '#fff': '#3a77ff'} />
                <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: Vermifugado? '#fff': '#000'}]}>Vermifugado</Text>
              </TouchableOpacity>
            </View>
        </View>
        <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error } }) => {
            return <View>
            <Text style={styles.title}>Descrição</Text>
            <TextInput
              style={[styles.input, {borderColor: invalid? 'red':'#3a77ff',}]}
              multiline
              numberOfLines={4}
              textAlignVertical='top'
              maxLength={40}
              placeholder='Conte mais um pouco sobre o pet'
              keyboardType='default'
              placeholderTextColor= {invalid && 'red'}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
            <Text style={[{color: 'red'}]}>{errors.desc?errors.desc.type=='required'?'*Campo obrigatorio':'':''}</Text>
          </View>
          }}
        name="desc"
        control={control}
        defaultValue=""
        />  
        <TouchableHighlight 
          activeOpacity={1} 
          onShowUnderlay={() => setPressButton(true)}  
          onHideUnderlay={() => setPressButton(false)} 
          underlayColor="#3a77ff" 
          style={[styles.action, {borderColor: '#3a77ff', marginTop: 20}]} 
          onPress={handleSubmit(takePhotoAndUpload)}
        >
          <Text style={pressButton?styles.pressText: styles.actionText}>CONTINUAR</Text>
        </TouchableHighlight>         
      </ScrollView>   
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
    </SafeAreaView>
  )
}
