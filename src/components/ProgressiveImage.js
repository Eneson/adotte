import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  animaisDesc: {
    bottom: 0,
    height: '15%',
    width: '100%',
    position: 'absolute',
    opacity: 0.7,
    backgroundColor: '#939393',
    paddingLeft: 10,
    paddingTop: 5,
    
  },
  descText: {
    color: '#cecece',
    fontSize: 13,
  },
  descTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  childrenAnimais: {
    flex: 1,    
    justifyContent: 'center',
   
  },
});


export default function ProgressiveImage(props) {
  const {source, item} = props  
  
  const navigation = useNavigation()

  function navigateToDetail(item) {
    navigation.navigate('Adotar', {screen: 'Adotar2', params: { item: item, source: source }})
  }

    return (
      <TouchableHighlight style={styles.childrenAnimais} onPress={() => {navigateToDetail(item)}}>
          <ImageBackground
            source={{uri: source}}
            style={styles.childrenAnimais}
            resizeMode="cover"
            >                      
              <View style={styles.animaisDesc}>
                <Text style={styles.descTitle}> {item.Nome} </Text>
                <Text style={styles.descText}> {item.Sexo} </Text>
              </View>                                
          </ImageBackground>
      </TouchableHighlight>
      
    )
  
}