import axios from 'axios';
import { logoutStart, logoutSuccess, logoutFailed } from '~/redux/authSlice';
import { updateStart, updateSuccess, updateError } from '~/redux/userSlice';

const url_get_one_user = 'http://localhost:5000/user/';
const url_update_user = 'http://localhost:5000/user/update/';
const url_logout_user = 'http://localhost:5000/auth/logout/';
const url_addToCart = 'http://localhost:5000/user/addToCart/';
const url_changeItemCart = 'http://localhost:5000/user/changeItemCart/';

const UserSerive = {
    getOneUser: async (id) => {
        try {
            let response = axios.get(url_get_one_user + id);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    addToCart: async (id, newItem) => {
        try {
            await axios.post(url_addToCart + id, newItem);
        } catch (error) {
            console.log(error);
        }
    },

    changeItemCart: async (id, itemNeedChange) => {
        try {
            await axios.put(url_changeItemCart + id, itemNeedChange);
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

    logoutUser: async (dispatch, id, navigate, accessToken, axiosJWT) => {
        dispatch(logoutStart());
        try {
            await axios.post(url_logout_user, id, {
                headers: { token: `Bearer ${accessToken}` },
            });
            dispatch(logoutSuccess());
            navigate('/login');
        } catch (error) {
            dispatch(logoutFailed());
        }
    },
};

export default UserSerive;
