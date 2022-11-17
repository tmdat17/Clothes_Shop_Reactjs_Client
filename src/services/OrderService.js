import axios from 'axios';

const url_add_order = 'http://localhost:5000/order/add';

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
};

export default OrderService;
