import axios from 'axios';

const url_add_order_detail = 'http://localhost:5000/orderDetail/add';

const OrderDetailService = {
    // Add new order
    addOrderDetail: async (newInfo) => {
        try {
            let response = await axios.post(url_add_order_detail, newInfo);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default OrderDetailService;
