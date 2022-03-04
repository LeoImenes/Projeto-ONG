import React from 'react';
import { Text, View, Image} from 'react-native';

import { Feather } from '@expo/vector-icons';

import css from './Style'
// import css from './pages/Home/Style'

export default function Home() {
  return (
    <View style={css.body}>
      <View style={css.header}>
        <Feather name="menu" size={35} color="black" />
        <Image style={css.image} source={require('../assets/logo.PNG')}/>
      </View>
      <View style={css.card}>
        <Text style={css.title}>Assistido</Text>
      </View>
      <View style={css.card}>
        <Text style={css.title}>Assistência</Text>
      </View>
      <View style={css.card}>
        <Text style={css.title}>Funcionário</Text>
      </View>
      <View style={css.card}>
        <Text style={css.title}>Receitas</Text>
      </View>
      <View style={css.card}>
        <Text style={css.title}>Despesas</Text>
      </View>
    </View>
  );
}