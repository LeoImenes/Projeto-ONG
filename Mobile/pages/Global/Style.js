import {StyleSheet} from "react-native"

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
      },
    bodyAlternative:{
      flex: 1,
      backgroundColor: "#166B8A",
      alignItems: "center"
    },
    header:{
      width: "100%",
      height: "20%",
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cardTitle: {
      backgroundColor: "#166B8A",
      width: "60%",
      height: "100%",
      borderBottomLeftRadius: 66,
      alignItems: "center",
      justifyContent: "center"
    },
    textTitle: {
        color: "white",
        fontSize: 18
    },
    scroll: {
      width: "100%",
      height: "80%"
    },
    scrollAlternative:{
      width: "100%",
      height: "88%"
    },
    cardTxt: {
      width: "70%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5
    },
    image:{
      width: 190,
      height: 150,
      marginTop: "10%"
    },
    textInfo:{
      fontSize: 18,
      color: "white"
    },
    info: {
      width: "80%",
      height: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 2,
      borderBottomColor: "black",
      padding: 5,
      alignSelf: "center",
      margin: 10
    },
    imageUser:{
      borderRadius: 50,
      width: 100,
      height: 100
    },
    card: {
      width: "70%",
      height: 100,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: "center",
      alignSelf: "center",
      margin: "10%",
      borderTopLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24
    },
    cardInfo: {
      width: "80%",
      height: 110,
      borderBottomColor: 'white',
      borderBottomWidth: 2,
      alignItems: 'center',
      justifyContent: "space-between",
      flexDirection: "row",
      alignSelf: "center",
      marginTop: "5%",
      padding: 15
    },
    cardButton1: {
      backgroundColor: "rgb(22,107,138)",
      width: "35%",
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      alignSelf: "center"
    },
    cardButton2: {
      backgroundColor: "white",
      width: "35%",
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      marginTop: "30%"
    },
    buttonText1:{
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "center"
    },
    buttonText2:{
      color: "rgb(22,107,138)",
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "center",
    },
    filter:{
      width: "100%",
      height: 70,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "flex-end",
      marginTop: "5%",
    },
    search:{
      backgroundColor: "white",
      width: "70%",
      height: 40,
      borderRadius: 10,
      padding: 10,
      fontSize: 18
    }
})