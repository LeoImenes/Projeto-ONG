import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./pages/Geral/Login/Index"
import Home from "./pages/Geral/Home/Index"
import Assistido from "./pages/Assistidos/Assistido/Index"
import Funcionario from "./pages/Funcionarios/Funcionario/Index"
import MeuPerfil from './pages/Funcionarios/MeuPerfil/Index'
import ListarFuncionario from "./pages/Funcionarios/ListarFuncionarios/Index"
import ListarAssistidos from './pages/Assistidos/ListarAssistidos/Index'
import CadastrarFuncionario from './pages/Funcionarios/CadastrarFuncionario/Index'
import CadastrarAssistido from './pages/Assistidos/CadastrarAssistido/Index'
import VerFuncionario from './pages/Funcionarios/VerFuncionario/Index'
import VerAssistido from './pages/Assistidos/VerAssistido/Index'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Assistido" component={Assistido} />
        <Stack.Screen name="Funcionario" component={Funcionario} />
        <Stack.Screen name="MeuPerfil" component={MeuPerfil} />
        <Stack.Screen name="ListarFuncionario" component={ListarFuncionario} />
        <Stack.Screen name="ListarAssistidos" component={ListarAssistidos} />
        <Stack.Screen name="CadastrarFuncionario" component={CadastrarFuncionario} />
        <Stack.Screen name="CadastrarAssistido" component={CadastrarAssistido} />
        <Stack.Screen name="VerFuncionario" component={VerFuncionario} />
        <Stack.Screen name="VerAssistido" component={VerAssistido} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}