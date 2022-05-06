import React, { useState } from 'react'
import { View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity } from "react-native"

import global from "../../Global/Style"

import Checkbox from 'expo-checkbox';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function NovaAssistencia({ navigation }) {
    const [roupas, setRoupas] = useState(false);
    const [data, setData] = useState(day);
    const day = new Date();
    console.log(day.toString())

    return (
        <View style={global.body}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true} />
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{ marginLeft: 5 }} size={35} color="#166B8A" onPress={() => { navigation.navigate('Home'), limpar() }} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginTop: "2%" }}>Nova Assistência</Text>
                    <TextInput style={global.info} placeholder="Data de registro" value={day.toLocaleDateString()} onChangeText={setData}></TextInput>
                    <View style={{ display: "flex", flexDirection: "row", width: "70%", alignSelf: "center", justifyContent: "space-evenly", height: 40, alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Vc é idiota?</Text>
                        <Checkbox
                            style={{ borderRadius: 30, width: 25, height: 25 }}
                            value={roupas}
                            onValueChange={setRoupas}
                            color={roupas ? '#166B8A' : undefined}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}