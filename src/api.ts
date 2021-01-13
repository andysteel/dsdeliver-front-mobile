import axios from "axios";

const URL_API = 'http://192.168.0.112:8080';

export const fetchOrders = () => {
    return axios(`${URL_API}/orders`);
}

export const confirmDelivery = (id: number) => {
    return axios.patch(`${URL_API}/orders/${id}/delivered`);
} 