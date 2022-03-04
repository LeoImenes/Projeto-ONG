import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { Feather } from '@expo/vector-icons';

import global from "../../Global/Style"

export default function Home({navigation}) {
  return (
    <View style={global.body}>
      <View style={css.header}>
        <Feather name="menu" size={35} color="black" />
        <View style={{width: "30%"}}>
          <Text style={css.textLogo}>CASA ACOLHEDORA IRMÃ ANTÔNIA</Text>
        </View>
      </View>
      <ScrollView style={css.scrollView}>
          <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("Assistido")}}>
            <Text style={css.title}>Assistido</Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.card}>
            <Text style={css.title}>Assistência</Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("Funcionario")}}>
            <Text style={css.title}>Funcionário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.card}>
            <Text style={css.title}>Receitas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.card}>
            <Text style={css.title}>Despesas</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const css = StyleSheet.create({
  header: {
    width: '90%',
    height: '15%',
    borderBottomWidth: 2,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row'
  },
  title:{
    fontSize: 18
  },
  textLogo: {
    color: "#166B8A",
    fontSize: 15
  },
  scrollView: {
    width: "100%",
    height: 425
  },
})