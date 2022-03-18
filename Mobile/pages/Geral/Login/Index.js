import React, { useState, useEffect} from 'react';
import { StyleSheet,Text, View, Image, TextInput, ToastAndroid} from 'react-native';

import global from "../../Global/Style"
import md5 from 'md5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [recupSenha, setRecupSenha] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const recuperarSenha = () => {
    setRecupSenha(true);
  }

  useEffect(async() => {
    if(await AsyncStorage.getItem('userdata') !== null) {
      navigation.navigate("ContainerHome");
    }
  }, [])

  const autenticar = () => {
    let funcionario = {
      email: email,
      senha: senha
    }

    fetch(`http://10.87.207.27:3000/funcionarios`, {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      },
      "body": JSON.stringify(funcionario),
    })
    .then(resp => {return resp.json()})
    .then(async data => {
      if(data.id_funcionario !== undefined) {
        await AsyncStorage.setItem('userdata', JSON.stringify(data));
        navigation.navigate('ContainerHome');
      }else {
          ToastAndroid.show('Email ou Senha Invalidos', ToastAndroid.SHORT);
      }
    })
    .catch(err => { console.log(err) });
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
            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={css.input}/>
            <TextInput secureTextEntry={true} placeholder="Senha" value={senha} onChangeText={setSenha} style={css.input}/>
            <Text style={css.button} onPress={() => {recuperarSenha()}}>Esqueci a senha</Text>
            <Text style={global.buttonText} onPress={() => autenticar()}>Entrar</Text>
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