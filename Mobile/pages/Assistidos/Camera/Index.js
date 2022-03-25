import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, PermissionsAndroid} from 'react-native';

import global from "../../Global/Style"

import { Camera } from 'expo-camera';
// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';

import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function TelaCamera({navigation}) {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [permission, setPermission] = useState(null);
  const [foto, setFoto] = useState(null)

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
      console.log(status);
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
      setFoto(data.uri)
    }
  }

  const submitPicture = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          "title": "Access Storage",
          "message": "Access Storage for the pictures"
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await CameraRoll.saveToCameraRoll(foto);
      } else {
        console.log("Permissao de camera negada.");
      }
    } catch (err) {
      console.warn(err);
    }

    setFoto(null);
  }

  return (
    <View style={styles.container}>
      <Camera style={{flex: 1}} type={type} zoom={0.1} ref={camRef}>
      <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5, marginTop: 20}} size={35} color="#166B8A" onPress={() => {navigation.navigate('CadastrarAssistido')}} />
        <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: "row"}}>
          <View style={{width: '100%', height: '10%', position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',marginBottom: "2%"}}>
            <TouchableOpacity style={styles.buttons} onPress={() => {
              setType(
                  type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                  )
                }}
              >
                <Ionicons name="md-camera-reverse-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.buttons}>
              <MaterialCommunityIcons name="camera-iris" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
      {foto &&
        <View style={{width: "100%", height: '100%', alignItems: 'center', marginTop: "10%", justifyContent: "space-evenly"}}>
            <Text style={{fontSize: 25, left: "40%"}} onPress={() => setFoto(false)}>X</Text>
            <Image source={{uri: foto}} style={{width: "70%", height: "70%", borderRadius: 10}}/>
            <TouchableOpacity style={global.cardButton1} onPress={() => submitPicture()}>
              <Text style={global.buttonText1}>SALVAR</Text>
            </TouchableOpacity>
        </View>     
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttons:{
    width: "17%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(100, 100, 100, 0.31)",
    borderRadius: 50
  }
});
