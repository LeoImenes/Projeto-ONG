import {StyleSheet} from "react-native"

export default StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    image:{
      width: 150,
      height: 110,
      marginTop: "5%"
    },
    card:{
      backgroundColor: '#E5E5E5',
      width: "60%",
      height: "50%",
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: "15%",
      shadowOffset: {width: -2, height: 8},
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    input:{
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      padding: "2%",
    },
    botao1:{
      color:"blue",
      fontSize: 12,
      marginRight: -60,
      marginTop: -20
    },
    botao2:{
      borderRadius: 10,
      width: 70,
      height: 30,
      alignItems: 'center',
      
    },
    botaoText:{
      color:"blue",
      fontSize: 18,
      fontWeight: "bold",
    }
  });