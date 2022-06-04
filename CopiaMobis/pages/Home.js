import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import gStyle from './global/style'
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBar from './Components/StatusBar/Index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from './global/index'

export default function Home({ navigation }) {
    const cargo = "v"

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        let value = await AsyncStorage.getItem('userdata');
        if (value !== null) {
            value = JSON.parse(value);

            fetch(`${Url.URL}/funcionarios/${value}`)
                .then(resp => { return resp.json() })
                .then(data => {

                })
                .catch(err => { console.log(err) })
        }
    }

    return (
        <View style={gStyle.body}>
            <StatusBar />
            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={[css.cardColor, { borderBottomLeftRadius: 112.5 }]}>
                <View />
            </LinearGradient>
            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={[css.cardColor, { bottom: 0, borderTopRightRadius: 112.5 }]}>
                <View />
            </LinearGradient>
            <View style={css.header}>
                <Feather onPress={() => { navigation.openDrawer() }} name="menu" size={35} color="white" />
                <View style={css.headerText}>
                    <Text style={[css.title, { color: "white", fontSize: 15 }]}>CASA ACOLHEDORA</Text>
                    <Text style={[css.title, { color: "white", fontSize: 15 }]}> IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <ScrollView style={css.scrollView}>
                {
                    (cargo === "Diretor")
                        ?
                        <View>
                            <View style={css.align}>
                                <TouchableOpacity style={css.card} onPress={() => { navigation.navigate("ListarAssistidos") }}>
                                    <Feather name="list" size={24} color="black" style={{ marginBottom: 10 }} />
                                    <Text style={css.title}>Listar</Text>
                                    <Text style={css.title}>Assistidos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={css.card} onPress={() => { navigation.navigate("CadastrarAssistido") }}>
                                    <FontAwesome5 name="address-card" size={24} color="black" style={{ marginBottom: 10 }} />
                                    <Text style={css.title}>Cadastrar</Text>
                                    <Text style={css.title}>Assistido</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={css.align}>
                                <TouchableOpacity style={css.card} onPress={() => { navigation.navigate("ListarFuncionarios") }}>
                                    <Feather name="list" size={24} color="black" style={{ marginBottom: 10 }} />
                                    <Text style={css.title}>Listar</Text>
                                    <Text style={css.title}>Funcionários</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={css.card} onPress={() => { navigation.navigate("CadastrarFuncionario") }}>
                                    <FontAwesome5 name="address-card" size={24} color="black" style={{ marginBottom: 10 }} />
                                    <Text style={css.title}>Cadastrar</Text>
                                    <Text style={css.title}>Funcionários</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={gStyle.card} onPress={() => { navigation.navigate("AssistenciaRefeicao") }}>
                                <MaterialCommunityIcons name="food-variant" size={24} color="black" />
                                <Text style={css.title}>Alimentação</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={gStyle.card} onPress={() => { navigation.navigate("OutrasAssistencias") }}>
                                <MaterialCommunityIcons name="home-assistant" size={24} color="black" />
                                <Text style={css.title}>Assistência</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={gStyle.card} onPress={() => { navigation.navigate("Financeiro") }}>
                                <MaterialCommunityIcons name="finance" size={24} color="black" />
                                <Text style={css.title}>Financeiro</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <TouchableOpacity style={[gStyle.card, {height: 120, margin: "7%"}]} onPress={() => { navigation.navigate("ListarAssistidos") }}>
                                <Feather name="list" size={24} color="black" style={{ marginBottom: 10 }} />
                                <Text style={css.title}>Listar Assistidos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[gStyle.card, {height: 120, margin: "7%"}]} onPress={() => { navigation.navigate("CadastrarAssistido") }}>
                                <FontAwesome5 name="address-card" size={24} color="black" style={{ marginBottom: 10 }} />
                                <Text style={css.title}>Cadastrar Assistido</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[gStyle.card, {height: 120, margin: "7%"}]} onPress={() => { navigation.navigate("AssistenciaRefeicao") }}>
                                <MaterialCommunityIcons name="food-variant" size={24} color="black" />
                                <Text style={css.title}>Alimentação</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[gStyle.card, {height: 120, margin: "7%"}]} onPress={() => { navigation.navigate("OutrasAssistencias") }}>
                                <MaterialCommunityIcons name="home-assistant" size={24} color="black" />
                                <Text style={css.title}>Assistência</Text>
                            </TouchableOpacity>
                        </View>
                }
            </ScrollView>
        </View>
    )
}

const css = StyleSheet.create({
    cardColor: {
        width: "100%",
        height: "25%",
        backgroundColor: "#166B8A",
        position: "absolute"
    },
    header: {
        width: '90%',
        height: '15%',
        borderBottomWidth: 2,
        borderBottomColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
    },
    headerText: {
        width: "45%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    scrollView: {
        width: "100%",
        height: 425
    },
    card: {
        width: 140,
        height: 140,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    align: {
        flexDirection: "row",
        width: '100%',
        height: 160,
        justifyContent: 'space-around'
    }
});