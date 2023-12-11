import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import empresa from './empresa';
import empresaForm from './empresaForm';


const Stack = createNativeStackNavigator();

const empresaStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="empresa" component={empresa} options={{ title: 'empresa' }} />
                <Stack.Screen name="empresa-form" component={empresaForm} options={{ title: 'empresa' }} />
            </Stack.Navigator>
        </>
    )
}

export default empresaStack