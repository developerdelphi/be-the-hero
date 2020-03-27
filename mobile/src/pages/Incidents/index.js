import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import api from '../../services/api'
import styles from './styles'
import logo from '../../assets/logo.png'

export default function Incidentes () {
  const navigation = useNavigation()
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  async function loadIncidents () {
    if (loading) { return }
    
    if (total && incidents.length === total) {
      return
    }

    setLoading(true)

    const response = await api.get('/incidents')
    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  },[])

  function navigateDetail (incident) {
    navigation.navigate('Detail',{ incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total}</Text> Casos
        </Text>
      </View>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>
      <FlatList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        style={styles.incidentList}
        renderItem={
          ({item: incident}) => (            
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>
              
              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>
              
              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {
                  Intl
                    .NumberFormat(
                      'pt-BR',
                      {
                        style: 'currency',
                        currency: 'BRL'
                      }
                    )
                    .format(incident.value)
                }
              </Text>          
              <TouchableOpacity style={styles.detailButton}
                onPress={() => navigateDetail(incident)}>
                <Text style={styles.detailButtonText}>Ver Mais Detalhes</Text>
                <Feather name="arrow-right" size={17} color="#E02041"></Feather>
              </TouchableOpacity>
            </View>
          )}
      />       
    </View>
  )
}