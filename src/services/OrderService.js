import axios from 'axios';

const url_add_order = 'http://localhost:5000/order/add';
const url_get_one_order = 'http://localhost:5000/order/';
const url_get_all_order = 'http://localhost:5000/order/';

const OrderService = {
    // Add new order
    addOrder: async (newInfo) => {
        try {
            let response = await axios.post(url_add_order, newInfo);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getOneOrder: async (id) => {
        try {
            let response = await axios.get(url_get_one_order + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getAllOrder: async () => {
        try {
            let response = await axios.get(url_get_all_order);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default OrderService;
