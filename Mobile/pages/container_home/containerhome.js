import { createDrawerNavigator , DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../Geral/Home/Index';
import Assistido from "../Assistidos/Assistido/Index"
import CadastrarAssistido from '../Assistidos/CadastrarAssistido/Index';
import ListarAssistidos from '../Assistidos/ListarAssistidos/Index';
import VerAssistido from '../Assistidos/VerAssistido/Index';
import CadastrarFuncionario from '../Funcionarios/CadastrarFuncionario/Index';
import Funcionario from '../Funcionarios/Funcionario/Index';
import ListarFuncionario from '../Funcionarios/ListarFuncionarios/Index';
import MeuPerfil from '../Funcionarios/MeuPerfil/Index';
import VerFuncionario from '../Funcionarios/VerFuncionario/Index';

const Drawer = createDrawerNavigator();

export default function ContainerHome() {
    return (
        <Drawer.Navigator useLegacyImplementation={true} screenOptions={{ headerShown: false }} drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Sair" onPress={async () => { 
                    await AsyncStorage.removeItem('userdata');
                    props.navigation.navigate("Login") 
                }} />
              </DrawerContentScrollView>
            )
          }}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Assistido" component={Assistido} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="CadastrarAssistido" component={CadastrarAssistido} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="ListarAssistidos" component={ListarAssistidos} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="VerAssistido" component={VerAssistido} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="CadastrarFuncionario" component={CadastrarFuncionario} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="Funcionario" component={Funcionario} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="ListarFuncionario" component={ListarFuncionario} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="MeuPerfil" component={MeuPerfil} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            <Drawer.Screen name="VerFuncionario" component={VerFuncionario} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
        </Drawer.Navigator>
  );
}