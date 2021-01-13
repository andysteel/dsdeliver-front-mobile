import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

const Orders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    const fetchData = () => {
        setIsLoading(true);
        fetchOrders()
            .then(response => setOrders(response.data))
            .catch(error => Alert.alert('Ocorreu um erro interno.'))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if(isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const navigation = useNavigation();

    const handleOnPress = (order: Order) => {
        navigation.navigate('OrderDetails', { order });
    }

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {isLoading ? (
                    <Text>Carregando...</Text>
                ): (
                    orders.map(order => (
                        <TouchableWithoutFeedback key={order.id} onPress={() => handleOnPress(order)}>
                            <OrderCard order={order}/>
                        </TouchableWithoutFeedback>
                    ))
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Orders;