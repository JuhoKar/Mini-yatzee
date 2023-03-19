import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#8e918f',
    flexDirection: 'row'
  },
  footerText: {
    textAlign: 'center',
    fontSize: 20
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 10,
    textAlign: 'center',
  },
  dicepoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center'
  },
  header: {
    alignContent: 'center',
    padding: 15
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  homeText: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 15
  },
  
  textInput: {
    justifyContent: 'center',
    marginRight: 40,
    marginLeft: 40,
    padding: 17,
    borderWidth: 2,
    borderRadius: 10
  },
  
  pressable: {
    alignContent: 'center',
    marginRight: 100,
    marginLeft: 100,
    marginTop: 5,
    textAlign: 'center',
    borderWidth: 3,
    borderRadius: 10
  },
  ruleText: {
    margin: 10

  }
});