import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView} from 'react-native';

import global from "../../Global/Style"

export default function MeuPerfil({navigation}){
    return(
        <View style={global.body}>
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <View style={{
                width: "100%",
                height: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly"
                }}>
                <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                <Text style={global.textInfo}>Matrícula: 000001</Text>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>RG:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>CPF:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nascimento:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cargo:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Data admissão:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    scrollView: {
        width: "100%",
        height: 430
    }
})