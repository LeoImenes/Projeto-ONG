import React, { useState} from 'react';
import { StyleSheet,Text, View, Image, TextInput} from 'react-native';

import global from "../../Global/Style"

export default function Login({navigation}) {
  const [recupSenha, setRecupSenha] = useState("");

  const recuperarSenha = () => {
    setRecupSenha(true);
  }

  return (
    <View style={global.body}>
      <Image style={global.image} source={require("../../assets/logo.png")}/>
      {
        (recupSenha) ?
          <View style={css.cardLogin}>
            <Text style={css.title}>Recuperar senha</Text>
            <TextInput placeholder={"Matrícula..."} style={css.input}></TextInput>
            <TextInput placeholder={"Nova senha..."} style={css.input}></TextInput>
            <Text style={global.buttonText} onPress={() => { setRecupSenha(false)}}>Salvar</Text>
          </View>
          :
          <View style={css.cardLogin}>
            <Text style={css.title}>LOGIN</Text>
            <TextInput placeholder={"Matrícula..."} style={css.input}></TextInput>
            <TextInput placeholder={"Senha..."} style={css.input}></TextInput>
            <Text style={css.button} onPress={() => {recuperarSenha()}}>Esqueci a senha</Text>
            <Text style={global.buttonText} onPress={() => { navigation.navigate("Home")}}>Entrar</Text>
        </View>
      }
    </View>
  );
}

const css = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  cardLogin: {
    width: "70%",
    height: "55%",
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: "space-evenly",
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
  input:{
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: "2%",
  },
  button:{
    color:"blue",
    fontSize: 13,
    marginRight: -60,
    marginTop: -20
  }
})