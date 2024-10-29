import React, { useState, useEffect } from 'react'
import { Feather, FontAwesome5, Fontisto  } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, Platform, Modal, ImageBackground, TouchableHighlight, ToastAndroid, SafeAreaView, ScrollView } from 'react-native'
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

export default function UpdatePet(props) {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular
  });

  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [textDate, setTextDate] = useState(props.route.params.item.DataNasc)
  const [sexo, setSexo] = useState(props.route.params.item.Sexo)
  const [Vacina, setVacina] = useState(props.route.params.item.Vacina)
  const [Vermifugado, setVermifugado] = useState(props.route.params.item.Vermifugado)
  const [tipo, setTipo] = useState(props.route.params.item.Tipo)  
  const [ pressButton, setPressButton ] = useState(false)
  const [castrado ,setCastrado] = useState(props.route.params.item.Castrado)  
  const [modalVisible, setModalVisible] = useState(false)
  const [image, setImage] = useState(props.route.params.source);  
  const [dateError, setDateError] = useState(false)
  const [sexoError, setSexoError] = useState(false)
  
  const navigation = useNavigation()
  const { register, handleSubmit, control, formState:{ errors } } = useForm({
    defaultValues: {
      nome: props.route.params.item.Nome,
      desc: props.route.params.item.Descricao
    }
  });
  
  useEffect(() => {
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
  
 
  const updateNewPet = async (e) => {
    setModalVisible(true)
    if(textDate == 'Data de Nascimento'){
      setDateError(true)
    }
    if(sexo == ''){
      setSexoError(true)
    }
    if(textDate == 'Data de Nascimento'||sexo == ''){
      setModalVisible(false)
      return Toast("Preencha todos os dados")
    }

    const { nome, desc } = e  
    
    IsLogin(async (resultado) => {
      if(resultado==false){
        Alert.alert( 
          "Erro no cadastro",
          "Não foi possível autenticar usuário.\nFaça login e tente novamente."
        )
        return
      }
      const token = resultado.Token
      let localUri = image;    
    
      if(!image){
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
      formData.append('DataNasc', textDate);
      formData.append('Sexo', sexo);
      formData.append('Tipo', tipo);
      formData.append('Vacina', Vacina);
      formData.append('id_user', resultado.id_user)
      formData.append('Vermifugado', Vermifugado)
      formData.append('Castrado', castrado)
      formData.append('FotoName', filename);    
      formData.append('id', props.route.params.item.id);    
      formData.append('Image_old', props.route.params.source)

      await api.post('/animal/update', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'authorization':  'Bearer '+token.replace(/"/g, ''),
            'id_user': resultado.id_user
          },
      }).then(res => {
        Toast('Atualizado com sucesso')
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
          "Erro",
          "Não foi possível estabelecer conexão com o servidor. \nVerifique sua conexão e tente novamente."
        )
      })
      setModalVisible(false)
    });

    // IsLogin().then(async (data) => {
    //   const token = await AsyncStorage.getItem('@Profile:token')
    //   let localUri = image;    
    
    // if(!image){
    //   return Toast('Adicione uma imagem')
    // }
    
    // let filename = localUri.split('/').pop()    
   
    // //Pegar o tipo do arquivo
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
    // filename = new Date().toISOString().replace(/:/g, '-') + filename

    // let formData = new FormData(); 
    // formData.append('produto_imagem', { uri: localUri, name: filename, type });
    // formData.append('Nome', nome);
    // formData.append('Descricao', desc);
    // formData.append('DataNasc', textDate);
    // formData.append('Sexo', sexo);
    // formData.append('Tipo', tipo);
    // formData.append('Vacina', Vacina);
    // formData.append('id_user', data.id_user)
    // formData.append('Vermifugado', Vermifugado)
    // formData.append('Castrado', castrado)
    // formData.append('FotoName', filename);    
    // formData.append('id', props.route.params.item.id);    
    // formData.append('Image_old', props.route.params.source)


    // await api.post('/animal/update', formData, {
    //     headers: { 
    //       'Content-Type': 'multipart/form-data',
    //       'authorization':  'Bearer '+token.replace(/"/g, ''),
    //       'id_user': data.id_user
    //     },
    // }).then(res => {
    //   Toast('Atualizado com sucesso')
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [
    //         { name: 'Inicio' },
    //       ],
    //     })
    //   );
    // }).catch(err => {    
    //   Alert.alert(
    //     "Erro",
    //     "Não foi possivel estabelecer conexão com o servidor. \nVerifique sua conexão e tente novamente"
    //   )
    // })
    
    // }).catch(() => {
    //   Alert.alert( 
    //     "Erro no cadastro",
    //     "Não foi possivel autenticar usuário.\nFaça login e tente novamente"
    //   )
    // }).finally(() => {
    //   setModalVisible(false)
    // })
    
    
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
                      <FontAwesome5 name="plus-circle" size={100} color="black" />
                      <Text style={{fontSize: 20}}>
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
                style={[styles.input, {borderColor: invalid? 'red':'#000',}]}
                placeholder='Nome'
                keyboardType='default'
                autoComplete='name'
                placeholderTextColor= {invalid && 'red'}
                defaultValue={props.route.params.item.Nome}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
              <Text style={[{color: 'red'}]}>{errors.nome?errors.nome.type=='required'?'Campo obrigatório':'':''}</Text>
            </View>
          }}
          name="nome" 
          control={control}
          />  
        </View>  
        {/* ESPECIE */}
        <View>
          <Text style={styles.title}>Espécie:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>  
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: tipo=='Cão'? '#3ab6ff':'#fff', }]} onPress={() => setTipo('Cão')}>
              <Text style={[styles.actionText,{color: tipo=='Cão'? '#fff':'#000'}]}>Cachorro</Text>
            </TouchableOpacity> 
              <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: tipo=='Gato'? '#3ab6ff':'#fff', }]} onPress={() => setTipo('Gato')}>
              <Text style={[styles.actionText,{color: tipo=='Gato'? '#fff':'#000'}]}>Gato</Text>
            </TouchableOpacity> 
          </View>
        </View>
        
        <View>     
          {/* Data de nascimento */}
        <Text style={styles.title}>Data de nascimento:</Text> 
          <TouchableOpacity style={styles.date} onPress={() => setShow(true)} >
            <Feather name="calendar" size={30} color={dateError? 'red':'#000'} />
            <Text style={[styles.dateText, {borderColor: dateError? 'red':'#000'}]}>{textDate}</Text>
          </TouchableOpacity>  
                         
        </View>
        
        {/* SEXO */}
        <View>
          <Text style={styles.title}>Sexo</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>                    
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: sexo=='Fêmea'? '#3ab6ff':'#fff', borderColor: sexoError?'red':'#000'}]} onPress={() => setSexo('Fêmea')}>
              <Text style={[styles.actionText,{color: sexo=='Fêmea'? '#fff':'#000'}]}>Fêmea</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={[styles.action,{flex: 0.48, backgroundColor: sexo=='Macho'? '#3ab6ff':'#fff', borderColor: sexoError?'red':'#000'}]} onPress={() => setSexo('Macho')}>
              <Text style={[styles.actionText,{color: sexo=='Macho'? '#fff':'#000'}]}>Macho</Text>
            </TouchableOpacity>  
          </View>
        </View>
        <View style={{flexGrow: 1}}>
          <Text style={styles.title}>Outras informações:</Text>
            <View style={{flex: 1}}>
              <TouchableOpacity style={[styles.action,{backgroundColor: castrado? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => castrado==1?setCastrado(0):setCastrado(1)}>
                <Fontisto name="surgical-knife" size={30} color={castrado? '#fff': '#000'} />
                <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: castrado? '#fff': '#000'}]}>Castrado</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity style={[styles.action,{backgroundColor: Vacina? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => Vacina==1?setVacina(0):setVacina(1)}>
                <FontAwesome5 name="syringe" size={30} color={Vacina? '#fff': '#000'} />
                <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: Vacina? '#fff': '#000'}]}>Antirrábica</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity style={[styles.action,{backgroundColor: Vermifugado? '#3ab6ff': '#fff',flexDirection: 'row', paddingHorizontal: 20}]} onPress={() => Vermifugado==1?setVermifugado(0):setVermifugado(1)}>
                <FontAwesome5 name="tablets" size={30} color={Vermifugado? '#fff': '#000'} />
                <Text style={[styles.actionText,{textAlign: 'center', marginStart: 20, color: Vermifugado? '#fff': '#000'}]}>Vermifugado</Text>
              </TouchableOpacity>
            </View>
        </View>
        <Controller
          rules={{required: 'true'}}
          render={({ field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error } }) => {
            return <View>
            <Text style={styles.title}>Descrição:</Text>
            <TextInput
              style={[styles.input, {borderColor: invalid? 'red':'#000',}]}
              multiline
              numberOfLines={6}
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
        defaultValue={props.route.params.item.Descricao}
        />  
        <TouchableHighlight 
          activeOpacity={1} 
          onShowUnderlay={() => setPressButton(true)}  
          onHideUnderlay={() => setPressButton(false)} 
          underlayColor="#3a77ff" 
          style={[styles.action, {borderColor: '#000', marginTop: 20}]} 
          onPress={handleSubmit(updateNewPet)}
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
