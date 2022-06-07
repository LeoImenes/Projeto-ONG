import { StyleSheet } from "react-native"

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white"
    },
    input: {
        width: "80%",
        height: 40,
        padding: "1%",
        borderBottomWidth: 1,
        marginVertical: "5%"
    },
    cardButton: {
        backgroundColor: "rgb(22,107,138)",
        width: "35%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: "10%",
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center"
    },
    arrow: {
        alignSelf: "flex-start"
    },
    card: {
        width: "80%",
        height: 100,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
        margin: "5.5%",
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
    imageUser: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    cardInfo: {
        width: "90%",
        height: 110,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
        padding: 15,
    },
    headerText: {
        color: "white",
        fontSize: 18
    },
    cardTxt: {
        width: "70%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5
    },
    info: {
        height: 40,
        borderBottomWidth: 2,
        padding: 5,
        margin: 10,
        borderBottomColor: 'lightgray',
    },
    logo: {
        backgroundColor: "#166B8A",
        width: "90%",
        height: 125,
        alignSelf: "flex-end",
        borderBottomLeftRadius: 66,
        alignItems: "center",
        justifyContent: "center",
    },
    textInfo:{
        fontSize: 16,
        textAlign: "center"
      },
})