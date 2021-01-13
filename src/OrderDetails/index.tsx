import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import Header from '../Header';
import { Order } from '../types';
import OrderCard from '../OrderCard';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';

type OrderDetailsProps = {
    route: {
        params: {
            order: Order
        }
    }
}

const OrderDetails = ({ route }: OrderDetailsProps) => {

    const { order } = route.params;
    const navigation = useNavigation();

    const handleConfirmDelivery = (id: number) => {
        confirmDelivery(id)
            .then(() => {
                Alert.alert(`Pedido ${id} entregue com sucesso.`)
                navigation.navigate('Orders');
            })
            .catch(() => {
                Alert.alert(`Erro ao tentar confirmar a entrega do Pedido ${id}`)
            })
    }

    const handleOnCancel = () => {
        navigation.navigate('Orders');
    }

    const handleStartNavigation = () => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <OrderCard order={order}/>
                <RectButton style={styles.button}>
                    <Text style={styles.buttonText} onPress={handleStartNavigation}>INICIAR NAVEGAÇÃO</Text>
                </RectButton>
                <RectButton style={styles.button}>
                    <Text 
                        style={styles.buttonText} 
                        onPress={() => handleConfirmDelivery(order.id)}>CONFIRMAR ENTREGA</Text>
                </RectButton>
                <RectButton style={styles.button}>
                    <Text style={styles.buttonText} onPress={handleOnCancel}>CANCELAR</Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    button: {
        backgroundColor: '#DA5C5C',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF',
        letterSpacing: -0.24,
        fontFamily: 'OpenSans_700Bold'
    }
});

export default OrderDetails;