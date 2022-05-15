import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid} from 'react-native';

import global from "../Global/Style"
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import StatusBar from "../Components/StatusBar/Index"

export default function Financeiro({ navigation }) {
    return (
        <View style={global.body}>
            <StatusBar />
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{ marginLeft: 5 }} size={35} color="#166B8A" onPress={() => { navigation.navigate('Home'), limpar() }} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
        </View>
    )
}