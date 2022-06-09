import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import gStyle from '../global/style'
import Url from '../global/index'
import { useFocusEffect } from '@react-navigation/native';

import Home from '../Home';
import ListarAssistidos from '../Assistido/ListarAssistidos/index';
import VerAssistido from '../Assistido/VerAssistido';
import CadastrarAssistido from '../Assistido/CadastrarAssistido/index';
import ListarFuncionarios from '../Funcionario/ListarFuncionarios';
import VerFuncionario from '../Funcionario/VerFuncionario';
import CadastrarFuncionario from '../Funcionario/CadastrarFuncionario';
import MeuPerfil from '../Funcionario/MeuPerfil';
import Financeiro from '../Financeiro';
import AssistenciaRefeicao from '../Assistencia/AssistenciaRefeicao';
import OutrasAssistencias from '../Assistencia/OutrasAssistencias';

const Drawer = createDrawerNavigator();

export default function ContainerHome() {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            verificar()
        }, [])
    );

    const verificar = async () => {
        let value = await AsyncStorage.getItem('userdata');
        if (value !== null) {
            value = JSON.parse(value);

            fetch(`${Url.URL}/funcionarios/${value}`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setPhoto(data[0].foto);
                    setName(data[0].nome_completo);
                })
                .catch(err => { console.log(err) })
        }
    }

    return (
        <Drawer.Navigator useLegacyImplementation={true} screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: 'rgb(2, 64, 87)',
                width: 200,
                height: 450,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
            },
            drawerHideStatusBarOnOpen: true
        }} drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <View style={{ alignItems: "center", width: "100%", height: 180 }}>
                        <Image source={(photo === null || photo === "" || photo === undefined || photo === "undefined" || photo === "null") ? require("../assets/user.png") : { uri: photo } } style={gStyle.imageUser} />
                        <Text style={{ width: "70%", color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>Olá, {name}</Text>
                    </View>
                    <DrawerItemList {...props} />
                    <DrawerItem labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16 }} style={{ borderBottomWidth: 1, borderBottomColor: "white" }} label="Sair" onPress={async () => {
                        await AsyncStorage.removeItem('userdata');
                        props.navigation.navigate("Login");
                    }} />
                </DrawerContentScrollView>
            )
        }}
            options={{
                drawerContentContainerStyle: { width: 0 }
            }}
        >
            <Drawer.Screen name="Home" component={Home} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="ListarAssistidos" component={ListarAssistidos} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="VerAssistido" component={VerAssistido} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="CadastrarAssistido" component={CadastrarAssistido} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="ListarFuncionarios" component={ListarFuncionarios} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="VerFuncionario" component={VerFuncionario} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="CadastrarFuncionario" component={CadastrarFuncionario} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="Meu Perfil" component={MeuPerfil} options={{
                drawerLabel: "Meu Perfil",
                drawerLabelStyle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
                drawerItemStyle: { borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 40 }
            }} />
            <Drawer.Screen name="Financeiro" component={Financeiro} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="AssistenciaRefeicao" component={AssistenciaRefeicao} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
            <Drawer.Screen name="OutrasAssistencias" component={OutrasAssistencias} options={{
                drawerLabel: () => { return (null) },
                drawerItemStyle: { display: "none" }
            }} />
        </Drawer.Navigator>
    );
}