import axios from 'axios';

const url = 'http://localhost:5000/product';

const ProductService = {
    getAllProduct: async () => {
        try {
            let response = await axios.get(url);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default ProductService;
