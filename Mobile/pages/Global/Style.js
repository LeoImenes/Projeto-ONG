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
        fontSize: 18
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
        borderRadius: 5,
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
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: "5%",
        padding: 15
      },
      buttonText:{
        color:"blue",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center"
      }
})