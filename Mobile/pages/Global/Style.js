import {StyleSheet} from "react-native"

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
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
        borderRadius: 5
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
      }
})