import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import empresaStack from './screens/empresa/empresaStack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
          <Tab.Screen
        name="Empresa"
        component={empresaStack}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-group-outline" size={26} />
          ),
        }}
      />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
