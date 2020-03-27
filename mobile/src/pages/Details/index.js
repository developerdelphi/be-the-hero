import React from 'react'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import styles from './style'
import logo from '../../assets/logo.png'

export default function Detail () {
  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident

  const valorFormatado = Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)

  const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso ${incident.title} com o valor de ${valorFormatado}`

  function navigationGoBack () {
    navigation.goBack()  
  }

  async function sendEmail () {
    await MailComposer.composeAsync({
      subject: `Herói do Caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  function sendWhatsApp () {
    Linking.openURL(`whatsapp://send?phone=5562993846793&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigationGoBack}>
          <Feather name="arrow-left" color="#e02041" size={20}/>
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>
        
        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        
        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {valorFormatado}
        </Text>      
      </View>
      <View style={styles.contactBox}>        
        <Text style={styles.heroeTitle}>Seja Herói neste caso!</Text>      
        <Text style={styles.heroeDescription}>Entre em contato.</Text>      
        <View style={styles.actions}>
          <TouchableOpacity onPress={sendWhatsApp} style={styles.action}>            
            <FontAwesome name="whatsapp" size={18} color="#FFF" style={styles.actionIcon}/>
            <Text style={styles.actionText}>
                WhatsApp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendEmail} style={styles.action}>
            <FontAwesome name="envelope" size={18} color="#FFF" style={styles.actionIcon}/>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </View>
  )
}