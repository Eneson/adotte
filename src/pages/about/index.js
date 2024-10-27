import React from 'react'
import { View, Text, Image, ScrollView, Modal, TouchableOpacity} from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Flow  } from 'react-native-animated-spinkit'
import styles from './styles'
import Footer from '../../components/Footer'

export default function About(props) {
  

  return ( 
      
    <View style={styles.container}>      
      <ScrollView>
      <View style={styles.content}>
        <Text style={styles.titulo}>Sobre o aplicativo ADOTE</Text>
        <Text style={styles.texto}>
        {'\t'}Bem-vindo ao nosso aplicativo de adoção de animais! Este trabalho de conclusão de curso foi desenvolvido por Enerson Macedo da Silva e Cristiane da Conceição Dias Macedo, alunos do IFPA Campus Itaituba.
        </Text>
        <Text style={styles.texto}>
        {'\t'}Nosso aplicativo tem como objetivo conectar protetores de animais, abrigos e pessoas interessadas em adotar. Acreditamos que a adoção é uma das melhores formas de oferecer um lar seguro e amoroso a esses seres incríveis, que merecem uma segunda chance. Com uma interface amigável e recursos práticos, facilitamos o processo de adoção e incentivamos a conscientização sobre a importância de cuidar dos animais.
        </Text>
        <Text style={styles.texto}>
        {'\t'}Agradecemos a todos que apoiam essa causa e esperamos que, juntos, possamos fazer a diferença na vida de muitos animais. Adotar é um ato de amor!
        </Text>
      </View> 
      </ScrollView>
      <Footer Navigation={{...props}}/>
    </View>
    
    
  )
}
