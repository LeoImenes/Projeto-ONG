import {StyleSheet} from "react-native"

export default StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "space-around"
      },
      header: {
        width: '90%',
        height: '15%',
        borderBottomWidth: 2,
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: 'row'
      },
      image:{
        width: 130,
        height: 100,
      },
      card: {
        width: "50%",
        height: "10%",
        backgroundColor: '#E5E5E5',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        shadowOffset: {width: -2, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      title:{
        fontSize: 18
      }
})