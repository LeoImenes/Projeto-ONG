import React, {useState, useEffect , useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { Camera } from 'expo-camera';

export default function CadastrarFuncionario({navigation}){
    const camRef = useRef(null);
    const[permission, setPermission] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const[cam, setCam] = useState(false);

    const[nome, setNome] = useState("");
    const[matricula, setMatricula] = useState("")
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[sexo,setSexo] = useState("");
    const[email,setEmail] = useState("");
    const[senha,setSenha] = useState("");
    const[cargo, setCargo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[dataAdmissao, setDataAdmissao]= useState("");
    const[foto, setFoto] = useState("");

    const cadastrar = () => {
        let anoNasc = nascimento.split('/')[2]
        let mesNasc = nascimento.split('/')[1]
        let diaNasc = nascimento.split('/')[0]

        let anoAdm = nascimento.split('/')[2]
        let mesAdm = nascimento.split('/')[1]
        let diaAdm = nascimento.split('/')[0]
        
        let funcionario = {
            nome_completo: nome,
            matricula: matricula,
            rg: rg,
            cpf: cpf,
            data_nascimento: `${anoNasc}-${mesNasc}-${diaNasc}`,
            estado_civil: estdCivil,
            sexo: sexo,
            cargo: cargo,
            email: email,
            senha: senha,
            data_admissao: `${anoAdm}-${mesAdm}-${diaAdm}`,
            foto: foto
        }
    
        // fetch(`http://10.87.207.27:3000/funcionario`, {
        fetch(`http://192.168.0.103:3000/funcionario`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(funcionario),
        })
        .then(resp => {return resp.json()})
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err) 
        });
    }

    const atualizar = () => {
        let anoNasc = nascimento.split('/')[2]
        let mesNasc = nascimento.split('/')[1]
        let diaNasc = nascimento.split('/')[0]

        let anoDem = nascimento.split('/')[2]
        let mesDem = nascimento.split('/')[1]
        let diaDem = nascimento.split('/')[0]
        
        let funcionario = {
            nome_completo: nome,
            matricula: matricula,
            rg: rg,
            cpf: cpf,
            data_nascimento: `${anoNasc}-${mesNasc}-${diaNasc}`,
            estado_civil: estdCivil,
            sexo: sexo,
            cargo: cargo,
            email: email,
            senha: senha,
            data_demissao: `${anoDem}-${mesDem}-${diaDem}`,
            foto: foto
        }
    
        // fetch(`http://10.87.207.27:3000/funcionario`, {
        fetch(`http://192.168.0.103:3000/funcionario`, {
          "method": "PUT",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(funcionario),
        })
        .then(resp => {return resp.json()})
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err) 
        });
    }

    useEffect(() => {
        (async () => {
          const {status} = await Camera.requestCameraPermissionsAsync();
          setPermission(status === 'granted');
        })();
      }, []);
    
      if(permission === null){
        return <View/>;
      }
    
      if(permission === false){
        return <Text> Acesso negado!</Text>;
      }
    
      async function takePicture(){
        if(camRef){
          const data = await camRef.current.takePictureAsync();
          
          let base = await FileSystem.readAsStringAsync(data.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          
          setFoto({
            uri: `data:image/${data.uri[data.uri.length-1]};base64,`+base
          })
          setCam(false)
        }
    }

    return(
        <View style={global.body}>
            {
                (cam === true)
                ?
                    <View style={{width: "100%", height: "100%", justifyContent: 'center'}}>
                        <Camera style={{flex: 1}} type={type} ref={camRef}>
                            <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5, marginTop: 20}} size={35} color="#166B8A" onPress={() => {navigation.navigate("CadastrarFuncionario")}} />
                            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: "row"}}>
                                <View style={{width: '100%', height: '10%', position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',marginBottom: "2%"}}>
                                    <TouchableOpacity style={css.buttons} onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                            )
                                            }}
                                    >
                                        <Ionicons name="md-camera-reverse-outline" size={30} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={takePicture} style={css.buttons}>
                                        <MaterialCommunityIcons name="camera-iris" size={50} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Camera>
                    </View>
                :
                <View style={css.body2}>
                    <View style={global.header}>
                        <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Home')}} />
                        <View style={global.cardTitle}>
                            <Text style={global.textTitle}>Casa Acolhedora</Text>
                            <Text style={global.textTitle}>Irmã Antônia</Text>
                        </View>
                    </View>
                    <View style={global.scroll}>
                        <ScrollView>
                            <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                            <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                            <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                            <TextInput value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                            <TextInput value={cargo} onChangeText={setCargo} placeholder="Cargo..." style={global.info}></TextInput>
                            <TextInput value={sexo} onChangeText={setSexo} placeholder="Sexo..." style={global.info}></TextInput>
                            <TextInput value={dataAdmissao} onChangeText={setDataAdmissao} placeholder="Data admissão..." style={global.info}></TextInput>
                            <View style={{flexDirection: "row", alignSelf: "center", marginTop: "5%"}}>
                                {
                                    ( foto === null || foto === undefined) ?
                                        <Image source={require("../../assets/user1.png")} style={global.imageUser}/>
                                    :
                                        <Image source={foto} style={global.imageUser}/>
                                }
                                <TouchableOpacity onPress={() => {setCam(true)}} style={css.imageAlign}>
                                    <Feather name="camera" size={24} color="blue" />
                                    <Text style={{color: "blue"}}>Adicionar foto</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={global.cardButton1} onPress={() => {cadastrar()}}>
                                <Text style={global.buttonText1}>SALVAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={global.cardButton1} onPress={() => {atualizar()}}>
                                <Text style={global.buttonText1}>ATUALIZAR</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    imageAlign:{
        width: 110,
        height: 100,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    body2:{
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
    }
})

        // "foto": null,
        // "matricula": "001",
        // "nome_completo": "Jaque Momolada",
        // "rg": "123.312.123.2",
        // "cpf": "321.543.123-2",
        // "data_nascimento": "2003-06-03T03:00:00.000Z",
        // "estado_civil": "",
        // "cargo": "Suplente",
        // "sexo": "Feminino",
        // "data_admissao": "2022-03-22T03:00:00.000Z",
        // "data_demissao": null,
        // "email": "jaque@live.com",
		// "senha": "12345678",
        // "status": 0