import axios from 'axios';
import { updateStart, updateSuccess, updateError } from '~/redux/userSlice';
const url_get_one_user = 'http://localhost:5000/user/';
const url_update_user = 'http://localhost:5000/user/update/';

const UserSerive = {
    getOneUser: async (id) => {
        try {
            let response = axios.get(url_get_one_user + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (user, dispatch, navigate, id) => {
        dispatch(updateStart());
        try {
            await axios.put(url_update_user + id, user);
            dispatch(updateSuccess());
            navigate('/user');
        } catch (error) {
            dispatch(updateError());
        }
    },
};

export default UserSerive;
