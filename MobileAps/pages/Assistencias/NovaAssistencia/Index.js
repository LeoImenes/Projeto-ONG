import react from 'react'
import { View, Text, StatusBar } from "react-native"

import global from "../../Global/Style"

import {Picker} from '@react-native-picker/picker';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NovaAssistencia({ navigation }) {
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
            <View style={{ width: "90%", alignSelf: "center", borderBottomWidth: 2 }}>
                {/* <Picker
                    selectedValue={sexo}
                    onValueChange={(itemValue, itemIndex) =>
                        setSexo(itemValue)
                    }>
                    <Picker.Item label="Sexo..." value="" style={{ color: "gray" }} />
                    <Picker.Item label="Feminino" value="Feminino" />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Outro" value="Outro" />
                </Picker> */}
            </View>
        </View>
    );
}