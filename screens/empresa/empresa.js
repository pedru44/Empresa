import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'

const empresa = ({ navigation }) => {

    const [empresa, setEmpresa] = useState([])

    const [idExcluir, setIdExcluir] = useState(0)

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
            carregarDados()
        }, [])
    );

    function carregarDados() {
        AsyncStorage.getItem('empresa').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setEmpresa(resultado)
        })
    }

    function confirmarExclusao(id) {
        setIdExcluir(id)
        setVisible(true)
    }

    function excluir() {
        empresa.splice(idExcluir, 1)
        AsyncStorage.setItem('empresa', JSON.stringify(empresa))
        carregarDados()
        setVisible(false)
    }

    return (
        <>
            <ScrollView style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }} />
                {empresa.map((item, i) => (
                    <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
                        <Card.Content>
                            <Text variant="titleLarge">{item.razao_social}</Text>
                            <Text variant="bodyMedium">CNPJ: {item.cnpj}</Text>
                            <Text variant="bodyMedium">Endereço: {item.endereco}</Text>
                            <Text variant="bodyMedium">Telefone: {item.telefone}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton
                                icon='pencil-outline'
                                onPress={() => navigation.push('empresa-form', { id: i, empresa: item })}
                            />
                            <IconButton
                                icon='trash-can-outline'
                                onPress={() => confirmarExclusao(i)}
                            />
                        </Card.Actions>
                    </Card>
                ))}
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Atenção</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Deseja realmente excluir o registro?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={excluir}>Confirmar</Button>
                            <Button onPress={hideDialog}>Cancelar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>

            <FAB
                icon="plus"
                size='small'
                mode='elevated'
                style={{ position: 'absolute', right: 10, bottom: 10 }}
                onPress={() => navigation.push('empresa-form')}
            />
        </>
    )
}

export default empresa