import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerText: {
    fontSize: 16,
    color: '#737380'
  },

  headerTextBold: {
    fontWeight: 'bold'
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380'
  },
  incident: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
    marginTop: 20,
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: "#737380"
  },

  detailButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  detailButtonText: {
    color: '#E02041',
    fontSize: 15,
    fontWeight: 'bold'
  },
  contactBox: {
    padding: 20,
    marginBottom: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E02041',
    minHeight: 100,
    backgroundColor: '#FFF',    
  },

  heroeTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131A",
    lineHeight: 30
  },

  heroeDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16

  },

  actions: {
    marginTop: 16,    
    flexDirection: 'row',
    justifyContent: "space-between"
  },

  action: {
    color: '#E02041',
    borderRadius: 8,
    padding: 8,
    // height: '150%',
    width: '45%',
    backgroundColor: '#E02041',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },

  actionText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    padding:0
  },

  actionIcon: {
    marginRight: 0,
    padding: 0
  }
})