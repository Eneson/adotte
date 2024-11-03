import React, { useState, useEffect } from 'react'
import { Feather, FontAwesome5, FontAwesome, Fontisto,AntDesign,EvilIcons  } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Text, Modal, TouchableOpacity, Alert, Platform, ImageBackground, ToastAndroid, SafeAreaView, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import * as ImagePicker from 'expo-image-picker';
import { Flow  } from 'react-native-animated-spinkit'

import styles from './styles'
import Footer from '../../components/Footer'
import { IsLogin } from '../../utils/IsLogin';
import api from '../../services/api';
 
export default function NewPet(props) {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular
  });

  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [textDate, setTextDate] = useState('Data de nascimento') 
  const { register, handleSubmit, control, formState:{ errors }, setValue,clearErrors } = useForm();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false)

 
  
  
  useEffect(() => {
    register('nome')
    register('desc')
    register('sexo')
    register('tipo')
    register('date')
    register('castrado', { value: 0 })
    register('vacine', { value: 0 })
    register('vermifugado', { value: 0 })
  }, [register])


  const onChangeDate = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' +(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setTextDate(fDate)
    setValue('date',fDate)
    clearErrors("date")
   
  }
  const showMode = (onChange) => {
    setShow(true);
  }  


  const takePhotoAndUpload = async (e) => {  
    setModalVisible(true)
    
    const { nome, desc,date,sexo,tipo,castrado,vacine,vermifugado } = e    
      
    IsLogin(async (resultado) => {
      if(resultado==false){
        setModalVisible(false)
        Alert.alert(
          "Erro no cadastro",
          "Não foi possível autenticar usuário.\nFaça login e tente novamente"
        )
      }
      const token = resultado.Token
      let localUri = image;    
    
      if(!image){           
        setModalVisible(false)
        return Toast('Adicione uma imagem')
      }
      
      let filename = localUri.split('/').pop()    
    
      //Pegar o tipo do arquivo
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      filename = new Date().toISOString().replace(/:/g, '-') + filename

      let formData = new FormData(); 
      formData.append('produto_imagem', { uri: localUri, name: filename, type });
      formData.append('Nome', nome);
      formData.append('Descricao', desc);
      formData.append('DataNasc', date);
      formData.append('Sexo', sexo);
      formData.append('Tipo', tipo);
      formData.append('id_user', resultado.id_user)
      formData.append('Adotado', 0);
      formData.append('Vacina', vacine);
      formData.append('Vermifugado', vermifugado)
      formData.append('Castrado', castrado)
      formData.append('FotoName', filename);
      
      await api.post('/animal', formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'authorization':  'Bearer '+token.replace(/"/g, '')},
      }).then(res => {
        Toast('Cadastrado com sucesso')  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Inicio' },
            ],
          })
        );
      }).catch(err => {
        Alert.alert(
          "Erro no cadastro",
          "Não foi possível estabelecer conexão com o servidor. \nVerifique sua conexão e tente novamente."
        )
        Toast('Erro no cadastro')
      }).finally(() => {
        setModalVisible(false)
      });
      
      })
  }
  
  const Toast = (text) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };  

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
  
  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}> 
      {/* MODAL LOADING */}
      <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <Flow size={50} color="#3ab6ff"/>
        </View>
      </Modal> 
      <ScrollView style={styles.content} behavior={'padding'}> 
        {/* foto */}
        <View style={[styles.contentImage, {borderWidth: !image?1:0}]}>
          {image?<TouchableOpacity onPress={() => pickImage()}>
                  <View style={{height: 300, borderWidth: 1}}>
                    <ImageBackground
                      source={{uri: image}}
                      style={styles.childrenAnimais}
                      resizeMode="cover"
                      >                              
                    </ImageBackground>                   
                    
                  </View>
                  </TouchableOpacity>:
                  <TouchableOpacity onPress={() => pickImage()}>
                    <View style={styles.viewFoto}>
                    <FontAwesome name="photo" size={48} color="black" />
                      <Text style={[styles.actionText,{fontSize: 16, color: '#000'}]}>
                        Adicionar foto
                      </Text>
                    </View>
                  </TouchableOpacity>
          
          }
        </View>  
        
        {/* NOME */}        
        <View style={styles.containerTextField}>    
          <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error } }) => {
            return <View>
              <Text style={[styles.title]}>Nome:</Text>
              <TextInput
                style={[styles.input, {borderColor: invalid? 'red':'#000'}]}
                placeholder='Nome'
                keyboardType='default'
                autoComplete='name'
                placeholderTextColor= {invalid && 'red'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
              <Text style={[{color: 'red'}]}>{errors.nome?errors.nome.type=='required'?'*Campo obrigatório':'':''}</Text>
            </View>
          }}
          name="nome" 
          control={control}
          defaultValue=""
          />  
        </View>  

        {/* ESPECIE */}
        <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error, } }) => {
            return <View style={{marginBottom:0}}>
            <Text style={styles.title}>Espécie:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>  
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: value=='Cão'? '#3ab6ff':'#fff', borderColor: error?'red':'#000'}]} onPress={() => onChange('Cão')}>
              <Text style={[styles.actionText,{color: value=='Cão'? '#fff':'#000'}]}>Cachorro</Text>
            </TouchableOpacity> 
              <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: value=='Gato'? '#3ab6ff':'#fff', borderColor: error?'red':'#000'}]} onPress={() => onChange('Gato')}>
              <Text style={[styles.actionText,{color: value=='Gato'? '#fff':'#000'}]}>Gato</Text>
            </TouchableOpacity>             
          </View>
          {/* {errors.tipo&&errors.tipo.type=='required'?<Text style={{color: 'red',marginTop:-10}}>*Campo obrigatório</Text>:''} */}
          <Text style={[{color: 'red',marginTop:-10}]}>{errors.tipo?errors.tipo.type=='required'?'*Campo obrigatório':'':''}</Text>
          
          </View>
          }}
        name="tipo"
        control={control}
        defaultValue=""
        /> 
        
        {/* Data de nascimento */}
        <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref, },
            fieldState: { invalid, isTouched, isDirty, error, } }) => {
            return <View style={{marginBottom:0}}>
                    <Text style={styles.title}>Data de nascimento:</Text> 
                    <TouchableOpacity style={styles.date} onPress={() => showMode()} >
                      <Feather name="calendar" size={30} color={errors.date? 'red':'#000'} />            
                      <Text style={[styles.dateText, {borderColor: errors.date? 'red':'#000'}]}>{textDate}</Text>
                    </TouchableOpacity> 
                    <Text style={[{color: 'red',marginTop:0}]}>{errors.date?errors.date.type=='required'?'*Campo obrigatório':'':''}</Text>
          
          </View>
          }}
        name="date"
        control={control}
        defaultValue=""
        /> 

        
        {/* SEXO */}
        <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error, } }) => {
            return <View>
            <Text style={styles.title}>Sexo:</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>                    
                <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: value=='Fêmea'? '#3ab6ff':'#fff', borderColor: error?'red':'#000'}]} onPress={() => onChange('Fêmea')}>
                  <Text style={[styles.actionText,{color: value=='Fêmea'? '#fff':'#000'}]}>Fêmea</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: value=='Macho'? '#3ab6ff':'#fff', borderColor: error?'red':'#000'}]} onPress={() => onChange('Macho')}>
                  <Text style={[styles.actionText,{color: value=='Macho'? '#fff':'#000'}]}>Macho</Text>
                </TouchableOpacity>  
              </View>
          </View>
          }}
        name="sexo"
        control={control}
        defaultValue=""
        /> 
        
        {/* CASTRADO VACINADO VERMIFUGADO */}
        <View style={{flexGrow: 1}}>
          <Text style={styles.title}>Outras informações:</Text>
            <View style={{flex: 1}}>
              <Controller
                  rules={{required: 'false'}}
                  render={({ field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error, } }) => {

                    return <View>
                      <TouchableOpacity style={[styles.action,{backgroundColor: value==1? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => onChange(value==1?0:1)}>
                        <Fontisto name="surgical-knife" size={30} color={value==1? '#fff': '#000'} />
                        <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: value==1? '#fff': '#000'}]}>Castrado</Text>
                      </TouchableOpacity>
                  </View>
                  }}
                name="castrado"
                control={control}
                defaultValue=""
                />              
            </View>

            <View style={{flex: 1}}>
              <Controller
                rules={{required: 'false'}}
                render={({ field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error, } }) => {
                  return  <View>
                            <TouchableOpacity style={[styles.action,{backgroundColor: value==1? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => onChange(value==1?0:1)}>
                              <FontAwesome5 name="syringe" size={30} color={value? '#fff': '#000'} />
                              <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: value? '#fff': '#000'}]}>Antirrábica</Text>
                            </TouchableOpacity>
                          </View>
                  }}
                name="vacine"
                control={control}
                defaultValue=""
              />
            </View>

            <View style={{flex: 1}}>
            <Controller
                rules={{required: 'false'}}
                render={({ field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error, } }) => {
                  return  <View>                            
                            <TouchableOpacity style={[styles.action,{backgroundColor: value==1? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => onChange(value==1?0:1)}>
                              <FontAwesome5 name="tablets" size={30} color={value==1? '#fff': '#000'} />
                              <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: value==1? '#fff': '#000'}]}>Vermifugado</Text>
                            </TouchableOpacity>
                          </View>
                  }}
                name="vermifugado"
                control={control}
                defaultValue=""
              />
            </View>
        </View>
        
        {/* DETALHES DO PET */}
        <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error } }) => {
            return <View>
            <Text style={styles.title}>Descrição:</Text>
            <TextInput
              style={[styles.input, {borderColor: invalid? 'red':'#000',}]}
              multiline
              numberOfLines={5}
              textAlignVertical='top'
              maxLength={150}
              placeholder='Conte mais um pouco sobre o pet'
              keyboardType='default'
              placeholderTextColor= {invalid && 'red'}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
            <Text style={[{color: 'red'}]}>{errors.desc?errors.desc.type=='required'?'*Campo obrigatório':'':''}</Text>
          </View>
          }}
        name="desc"
        control={control}
        defaultValue=""
        />  
        <TouchableOpacity disabled={modalVisible} style={[styles.action, {borderColor: '#000', marginTop: 10, borderWidth: 0}]} onPress={handleSubmit(takePhotoAndUpload)}>
          <Text style={styles.actionText}>CONTINUAR</Text>
        </TouchableOpacity>         
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
