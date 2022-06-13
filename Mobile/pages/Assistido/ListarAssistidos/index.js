import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';

import gStyle from '../../global/style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Url from '../../global/index'
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from "lottie-react-native";
import house from '../../assets/77534-house-build-loader.json'

export default function ListarAssistidos({ navigation }) {
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const SCREEN_HEIGHT = Dimensions.get('window').height;

    useFocusEffect(
        React.useCallback(() => {
            fetch(`${Url.URL}/assistidos`)
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

    const listing = () => {
        let newData = [...data];

        newData.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

        setList(newData)
    }

    return (
        <View style={gStyle.body}>
            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={[css.header, (SCREEN_HEIGHT <= 592) ? { height: 120 } : {}]}>
                <View style={css.filter}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => { navigation.navigate("Home") }} />
                    <TextInput placeholder="Pesquisar..." placeholderTextColor="white" style={[gStyle.input, { borderBottomColor: 'white', color: 'white', borderBottomWidth: 2 }]} value={searchText} onChangeText={(t) => setSearchText(t)} />
                </View>
                <View style={css.down}>
                    <Text style={[gStyle.headerText, { fontWeight: 'bold' }]}>Filtrar por:</Text>
                    <TouchableOpacity style={{ height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { listing() }}>
                        <Text style={[gStyle.headerText, { fontWeight: 'bold' }]}>A-Z</Text>
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
                                        <TouchableOpacity style={gStyle.cardInfo} key={index} onPress={async () => {
                                            await AsyncStorage.setItem("assistido", JSON.stringify(item.id_assistido));
                                            navigation.navigate("VerAssistido")
                                        }}>
                                            <Image source={(item.foto_antes === "null" || item.foto_antes === "" || item.foto_antes === "undefined") ? require("../../assets/user1.png") : { uri: `${item.foto_antes}` }} style={gStyle.imageUser}/>
                                            {/* <Image source={{uri: `http://10.87.207.33:3000/foto_assistido/${item.id_assistido}`}} style={gStyle.imageUser} /> */}
                                            <View style={gStyle.cardTxt}>
                                                <Text style={[gStyle.headerText, { color: "black" }]}>{item.nome_completo}</Text>
                                            </View>
                                        </TouchableOpacity>
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
    },
    down: {
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
        height: "50%",
        justifyContent: "space-around",
        flexDirection: "row"
    }
})