import axios from 'axios';

const url = 'http://localhost:5000/product/';

const ProductService = {
    // [GET] /product
    getAllProduct: async () => {
        try {
            let response = await axios.get(url);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    // [GET] /product/:id
    getOneProduct: async (id) => {
        try {
            let response = await axios.get(url + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default ProductService;
