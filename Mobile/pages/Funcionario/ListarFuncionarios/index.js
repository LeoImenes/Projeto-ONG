import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';

import gStyle from "../../global/style"
import Url from '../../global/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from "lottie-react-native";
import house from '../../assets/77534-house-build-loader.json'

export default function ListarFuncionarios({ navigation }) {
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ativo, setAtivo] = useState(false)
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    useFocusEffect(
        React.useCallback(() => {
            fetch(`${Url.URL}/funcionarios`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setList(data);
                    setData(data);
                    setLoading(false)
                })
                .catch(err => { console.log(err) });
        }, [])
    );

    useEffect(() => {
        if (searchText === '') {
            setList(data);
        } else {
            setList(
                data.filter(item => (item.nome_completo.toLowerCase().indexOf(searchText.toLowerCase()) > -1))
            )
        }
    }, [searchText]);

    const listar = () => {
        let newData = [...data];

        newData.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

        setList(newData)
    }

    const ativos = () => {
        setAtivo(!ativo)
    }

    return (
        <View style={gStyle.body}>
            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={[css.header, (SCREEN_HEIGHT <= 592) ? { height: 120 } : {}]}>
                <View style={css.filter}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => { navigation.navigate("Home") }} />
                    <TextInput placeholder="Pesquisar..." placeholderTextColor="white" style={[gStyle.input, { borderBottomColor: 'white', color: 'white', borderBottomWidth: 2 }]} value={searchText} onChangeText={(t) => setSearchText(t)} />
                </View>
                <View style={{ width: "90%", alignItems: "center", alignSelf: "center", height: "50%", justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Filtrar por:</Text>
                    <TouchableOpacity style={{ height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { listar() }}>
                        <Text style={[gStyle.headerText, { fontWeight: 'bold' }]}>A-Z</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { ativos() }}>
                        <Text style={[gStyle.headerText, { fontWeight: 'bold' }]}>Atividade</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            {
                (loading == true)
                    ?
                    <View style={{ width: "100%", height: "80%" }}>
                        <LottieView source={house} autoPlay loop />
                    </View>
                    :
                    <View style={(SCREEN_HEIGHT - (css.header.height) <= 457) ? { height: SCREEN_HEIGHT - 120 } : { height: "83%" }}>
                        <ScrollView>
                            {
                                list.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            {
                                                (ativo === true && item.status === 0)
                                                    ?
                                                    <TouchableOpacity style={{ display: 'none' }}></TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={gStyle.cardInfo} onPress={async () => {
                                                        await AsyncStorage.setItem("funcionario", JSON.stringify(item.matricula));
                                                        navigation.navigate("VerFuncionario")
                                                    }}>
                                                        <Image source={(item.foto === null || item.foto === "" || item.foto === "undefined" || item.foto === "null" ||  item.foto === undefined) ? require("../../assets/user1.png") : { uri: item.foto }} style={gStyle.imageUser} />
                                                        <View style={gStyle.cardTxt}>
                                                            <Text style={[gStyle.headerText, { color: "black" }]}>{item.nome_completo}</Text>
                                                            <Text style={[gStyle.headerText, (item.status === 0) ? { color: "gray"} : { color: "#4169E1" }]}>{(item.status === 0) ? "Inativo" : "Ativo"}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
            }
        </View>
    )
}
const css = StyleSheet.create({
    header: {
        width: "100%",
        height: 140,
        backgroundColor: "#166B8A",
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40
    },
    filter: {
        width: "100%",
        height: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "8%",
        marginBottom: "1%"
    }
})