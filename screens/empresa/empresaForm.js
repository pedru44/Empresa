import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import empresaValidator from '../../Validators/empresaValidator'

const empresaForm = ({ navigation, route }) => {

    let empresa = {
        razao_social: '',
        cnpj: '',
        telefone: '',
        endereço: ''
    }

    const id = route.params?.id

    if (id >= 0) {
        empresa = route.params?.empresa
    }



    function salvar(dados) {

        AsyncStorage.getItem('empresa').then(resultado => {

            const empresas = JSON.parse(resultado) || []

            if (id >= 0) {
                empresas.splice(id, 1, dados)
            } else {
                empresas.push(dados)
            }

            console.log(empresas)

            AsyncStorage.setItem('empresa', JSON.stringify(empresas))

            navigation.goBack()
        })

    }



    return (
        <>
            <ScrollView style={{ margin: 15 }}>
                <Text>Formulário de Empresas</Text>

                <Formik
                    initialValues={empresa}
                    validationSchema={empresaValidator}
                    onSubmit={values => salvar(values)}
                >

                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <View>

                            <TextInput
                                style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Razão Social'
                                value={values.razao_social}
                                onChangeText={handleChange('razao_social')}
                            />

                            {console.log(errors)}

                            {(errors.razao_social && touched.razao_social) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.razao_social}
                                </Text>
                            }

                            <TextInput
                                style={{ marginTop: 10 }}
                                mode='outlined'
                                label='CNPJ'
                                value={values.cnpj}
                                onChangeText={(value) => (setFieldValue('cnpj', mask(value, '99.999.999/9999-99')))}
                            />
                            {console.log(errors)}

                            {(errors.cnpj && touched.cnpj) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.cnpj}
                                </Text>
                            }

                            <TextInput
                                style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Endereço'
                                value={values.endereco}
                                onChangeText={handleChange('endereco')}
                            />
                            {console.log(errors)}

                            {(errors.endereco && touched.endereco) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.endereco}
                                </Text>
                            }

                            <TextInput
                                style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Telefone'
                                value={values.telefone}
                                onChangeText={(value) => (setFieldValue('telefone', mask(value, '(55)9999999-9999')))}
                            />
                            {console.log(errors)}

                            {(errors.telefone && touched.telefone) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.telefone}
                                </Text>
                            }
                            <Button onPress={handleSubmit}>Salvar</Button>

                        </View>
                    )}

                </Formik>

            </ScrollView >
        </>
    )
}

export default empresaForm