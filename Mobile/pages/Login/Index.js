import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import css from './Style'

export default function Login({navigation}) {
  const [recupSenha, setRecupSenha] = useState("");

  const recuperarSenha = () => {
    setRecupSenha(true);
  }

  return (
    <View style={css.body}>
      <Image style={css.image} source={require('../assets/logo.PNG')}/>
      {
        (recupSenha) ?
          <View style={css.card}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Recuperar senha</Text>
            <TextInput placeholder={"Matrícula..."} style={css.input}></TextInput>
            <TextInput placeholder={"Nova senha..."} style={css.input}></TextInput>
            <TouchableOpacity style={css.botao2}>
              <Text style={css.botaoText} onPress={() => { setRecupSenha(false)}}>Salvar</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={css.card}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>LOGIN</Text>
            <TextInput placeholder={"Matrícula..."} style={css.input}></TextInput>
            <TextInput placeholder={"Senha..."} style={css.input}></TextInput>
            <Text style={css.botao1} onPress={() => {recuperarSenha()}}>Esqueci a senha</Text>
            <TouchableOpacity style={css.botao2}>
              <Text style={css.botaoText} onPress={() => { navigation.navigate("Home")}}>Entrar</Text>
            </TouchableOpacity>
        </View>
      }
    </View>
  );
}