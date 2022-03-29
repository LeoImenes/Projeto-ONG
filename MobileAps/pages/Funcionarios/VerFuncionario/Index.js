import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons } from '@expo/vector-icons';

export default function VerFuncionario({navigation, route}){
    const {item} = route.params;

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

    return(
        <View style={global.body}>
            <View style={global.headerFunc}>
                <View style={global.alignHeader}>
                    <Ionicons name="arrow-back-circle-outline" style={css.icon} size={35} color="#166B8A" onPress={() => {navigation.navigate('ListarFuncionario')}} />
                    <Image source={(item.foto === null || item.foto === "") ? require("../../assets/user.png") : {uri: item.foto}} style={global.imageUser}/>
                </View>
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                    <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <View style={css.scroll}>
                <ScrollView>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{item.nome_completo}</Text>
                    </View>
                    {/* <View style={global.info}>
                        <Text style={global.textInfo}>Matricula:</Text>
                        <Text style={global.textInfo}>{item.matricula}</Text>
                    </View> */}
                    <View style={global.info}>
                        <Text style={global.textInfo}>RG:</Text>
                        <Text style={global.textInfo}>{item.rg}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>CPF:</Text>
                        <Text style={global.textInfo}>{item.cpf}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nascimento:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(item.data_nascimento))}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cargo:</Text>
                        <Text style={global.textInfo}>{item.cargo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>{item.sexo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>E-mail:</Text>
                        <Text style={global.textInfo}>{item.email}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Data admissão:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(item.data_admissao))}</Text>
                    </View>
                    {
                        (item.data_demissao !== null)
                        ?
                            <View style={global.info}>
                                <Text style={global.textInfo}>Data demissão:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(item.data_demissao))}</Text>
                            </View>
                        :
                        <TouchableOpacity style={global.cardButton1} onPress={() => {navigation.navigate("CadastrarFuncionario")}}>
                            <Text style={global.buttonText1}>ATUALIZAR</Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    scroll:{
        width: '100%',
        height: '70%',
    }
})