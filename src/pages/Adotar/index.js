import React, { useState, useEffect,useRef} from 'react'
import { useNavigation,useIsFocused } from '@react-navigation/native'
import {  StyleSheet, SafeAreaView,Image, ScrollView, View, Text, TouchableOpacity,Modal, Linking, ImageBackground, ActivityIndicator } from 'react-native'
import { FontAwesome, AntDesign,Fontisto, FontAwesome5, MaterialIcons, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flow  } from 'react-native-animated-spinkit'
import { useFonts, Roboto_500Medium, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import PagerView from 'react-native-pager-view';

import styles from './styles'
import Footer from '../../components/Footer';
import { IsLogin } from '../../utils/IsLogin';
import { sendWhatsApp } from '../../utils/sendWhatsapp';


export default function Adotar(props) {
  const [signed, setSigned] = useState(false)
  const [modalVisible, setmodalVisible] = useState(false)
  const [favoritePress, setFavoritePress] = useState(false)
  const [favorite, setFavorite] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0) 
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisibleImage, setModalVisibleImage] = useState(false);
  
  
  const navigation = useNavigation()

  const ref = useRef(PagerView);

  useEffect(() => {    
    IsLogin((resultado) => {
      setSigned(resultado)
    });
  }, [])

  useEffect(() => {    
    loadFavorites()
  }, [useIsFocused()])

  async function loadFavorites(){
    const keys = await AsyncStorage.getAllKeys()
    var teste = []
    for(var i =0; i<keys.length;i++){
      if(keys[i].includes('Favorite')){
        const get = await AsyncStorage.getItem(keys[i])
        const get2 = JSON.parse(get)
        teste[i] = get2.id
      }      
    }
    setFavorite(teste)
    setLoading(false)    
    setFavoritePress(false)
  }

  async function removeFavorito(item) {       
    await AsyncStorage.removeItem('@Favorite:'+item.id).then(() => {
      setFavorite(favorite.filter(res => res.id !== item.id))  
    })
    loadFavorites()
  }

  async function favoritar(item) {
    //operador ternario adcionar e remover favorito
    {favorite.includes(item.id) ? (await AsyncStorage.removeItem('@Favorite:'+item.id))
    : ( await AsyncStorage.setItem('@Favorite:'+item.id, JSON.stringify(item)))}
    loadFavorites()
  }

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_500Medium,
    Roboto_400Regular,
    OpenSans_400Regular,
    Montserrat_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  const {item, source} = props.route.params
  const images = JSON.parse(item.FotoName)
  let modifiedUrl = source.replace("/adote/", "/adote/tr:r-max/");

  const message = `Olá, vi o anúncio no aplicativo ADOTE e gostaria de adotar o "${item.Nome}" `
  
  function contato() {
    Linking.openURL(`whatsapp://send?phone=+55${item.telefone}&text=${message}`)
  }

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisibleImage(true);
  };

  const closeModal = () => {
    setModalVisibleImage(false);
    setSelectedImage(null);
  };

  if (!fontsLoaded) {
    return null
  } 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} behavior={'padding'}>  
        {/* Modal para exibir a imagem ampliada */}
        <Modal
          visible={modalVisibleImage}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            
            {selectedImage && (
              <Image source={{ uri: "https://ik.imagekit.io/adote/"+images[currentIndex] }} style={styles.fullImage} />
            )}
          </View>
        </Modal>
        {/* MODAL LOADING */}
        <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
              <Flow size={50} color="#3ab6ff"/>
          </View>
        </Modal>
        <View style={styles.incident}>
           <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            ref={ref}
            pageMargin={20}
            onPageSelected={(e) => {
              setCurrentIndex(e.nativeEvent.position);
              
            }}
          >
              {images.map((uri, index) => (
                <View style={styles.page} key={index}>
                    <TouchableOpacity key={index} onPress={() => openModal("https://ik.imagekit.io/adote/"+uri)}>
                    <View style={{ height: 300 }}>
                      <ImageBackground
                        //source={{uri: uri.replace("/adote/", "/adote/tr:r-max/")}}
                        source={ {uri: "https://ik.imagekit.io/adote/tr:r-max/"+uri} }
                        style={styles.childrenAnimais}
                        resizeMode="cover"
                      />
                    </View>
                      </TouchableOpacity>
                </View>
              ))}              
            </PagerView> 
            {images.length > 1 &&
          <View style={{
                  flexDirection:'row',
                  position:'absolute',
                  bottom:5,
                  alignSelf: 'center'
                }}>
                  {images.map((uri, index) => (
                    <Ionicons 
                      style={{marginLeft: 3, }}
                      key={index}
                      name={currentIndex==index?'ellipse':'ellipse-outline'}
                      size={13}
                      color="#000" 
                    />
                                       
                  ))}
          </View>
        }
{/*                       
          <ImageBackground
            source={{uri: source.replace("/adote/", "/adote/tr:r-max/")}}
            style={styles.childrenAnimais}
            resizeMode="contain"
            >                                                          
          </ImageBackground>  */}
          
        </View>
        <View style={styles.animaisDesc}>
                <View>
                <View style={{
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10, // Adicionando padding para evitar que o conteúdo fique grudado nas bordas
    }}>
        {/* Botão de Favoritar */}
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 10, // Ajuste a posição do botão favoritar à esquerda
            top: '50%',
            transform: [{ translateY: -20 }],
        }}>
            {favorite.includes(item.id) ? (
                <TouchableOpacity onPressIn={() => {}} onPress={() => {
                    setFavoritePress(true);
                    props.callbackParent ? props.callbackParent(item) : removeFavorito(item);
                }}>
                    {favoritePress ? <ActivityIndicator style={{ alignSelf: 'flex-start' }} size="small" color="#000" /> :
                        <MaterialIcons name="favorite" size={25} color={'#DC3545'} />}
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPressIn={() => {}} onPress={() => {
                    setFavoritePress(true);
                    signed ? favoritar(item) : navigation.navigate('Welcome', { screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para favoritar um pet' } });
                }}>
                    {favoritePress ? <ActivityIndicator style={{ alignSelf: 'flex-start' }} size="small" color="#000" /> :
                        <MaterialIcons name="favorite-border" size={25} color={'black'} />}
                </TouchableOpacity>
            )}
            <Text style={{ fontSize: 12 }}>Favoritar</Text>
        </View>

        {/* Nome do Pet*/}
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10, // Garantir que o nome tenha espaço e não sobreponha os botões
            width: '100%'
        }}>
            <Text style={styles.textNome}>
                {item.Nome}
            </Text>
        </View>

        {/* Botão de Denunciar */}
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10, // Ajuste a posição do botão de denunciar à direita
            top: '50%',
            transform: [{ translateY: -20 }],
        }}>
            <TouchableOpacity onPress={() => {
                signed ? props.navigation.navigate('Denuncia', { screen: 'Denuncia2', params: { item: item, source: source } }) :
                    props.navigation.navigate('Welcome', { screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para denunciar um pet' } });
            }}>
                <AntDesign name="warning" size={25} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 12 }}>Denunciar</Text>
        </View>
    </View>      
                   
                        
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom:10}}>
                    <View style={{flex: 1, height: 1, borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth}} />
                  </View>      
                  <View style={{marginHorizontal: 10}}>
                      <Text style={[styles.textMuted,{fontSize: 17}]}>
                        Sobre do pet:
                      </Text>
                    </View>   
                  <View style={{marginTop: 15, marginHorizontal: 10}}> 
                    {/* Seção data de nascimento e sexo */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={styles.descText}>
                        <Text style={styles.textMuted}>Data de Nascimento:</Text>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                          <AntDesign name="calendar" size={24} color="#0D6EFD" />
                          <Text style={styles.textInformation}>{item.DataNasc}</Text>
                        </View>
                      </View>                      
                      <View style={[styles.descText, {}]}>
                        <Text style={styles.textMuted}> Sexo: </Text>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>                      
                        <Ionicons name={item.Sexo=='Macho'?'male':'female'} size={24} color={item.Sexo=='Macho'?'#0D6EFD':'#9e07a3'} />
                          <Text style={{fontSize: 16}}> {item.Sexo} </Text>
                        </View>
                      </View>
                    </View>
                    {/* Seção informações de saúde */}
                    <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={styles.descTextInformation}>
                          <Text style={styles.textMuted}>Antirrábica:</Text>
                          <View style={styles.textContainer}>
                            <FontAwesome5 name="syringe" size={24} color={item.Vacina ? 'green' : 'gray'} />
                            <Text style={styles.textInformation}>{item.Vacina ? 'Sim' : 'Não'}</Text>
                          </View>
                      </View>

                      {/* Vermifugado */}
                      <View style={[styles.descTextInformation]}>
                          <Text style={styles.textMuted}>Vermifugado:</Text>

                          <View style={[styles.textContainer]}>
                            <FontAwesome5 name="tablets" size={24} color={item.Vermifugado? 'green' : 'gray'} />
                            <Text style={styles.textInformation}>{item.Vermifugado ? 'Sim' : 'Não'}</Text>
                          </View>

                      </View>

                      {/* Castrado */}
                      <View style={styles.descTextInformation}>
                          <Text style={styles.textMuted}>Castrado:</Text>
                        <View style={styles.textContainer}>                        
                          <FontAwesome5 name="cut" size={24} color={item.castrado? 'green': 'gray'} />
                          <Text style={styles.textInformation}>{item.Castrado ? 'Sim' : 'Não'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>  
                  {/* DESCRIÇÃO */}

                  <View style={{flexDirection: 'row', alignItems:'center',  marginHorizontal: 10, marginTop: 20,}}>
                      <Text style={[styles.textMuted,{fontSize: 16}]}>
                      Mais Informações
                      </Text>
                      <Ionicons name="information-circle-outline" size={15} color='rgba(33 37 41 / 0.75)' />
                    </View>  
                  <View style={{marginTop:5}}>    
                    <Text style={[styles.textInformation, {textAlign: 'justify', marginTop: 10, marginHorizontal: 10}]}>{item.Descricao}</Text>
                  </View> 
                </View>
        </View> 
        <View style={styles.contactBox}>
         
          <View style={[styles.actions, {
            
            borderTopWidth: 0.5,
            paddingTop: 10
          }]}>
              <TouchableOpacity style={[styles.action, {}]} onPress={()=> {
                setmodalVisible(true)
                sendWhatsApp(item,currentIndex).finally(() => {
                  setmodalVisible(false)
                })
                }}>
                  <Text style={[styles.actionText, {color: '#000'}]}>
                    Compartilhar
                  </Text>
                  <AntDesign  name="sharealt" size={30} color="#3ab6ff" />
              </TouchableOpacity>
                  
            <TouchableOpacity style={[styles.action, {  }]} onPress={contato}>
                <Text style={[styles.actionText, {color: '#000'}]}> Contato </Text>
                <FontAwesome name="whatsapp" size={30} color="#34af23" />              
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer Navigation={{...props}}/>
    </SafeAreaView>
  )
}
