import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
} from '~/redux/authSlice';

const url_login = 'http://localhost:5000/auth/login';
const url_register = 'http://localhost:5000/auth/register';

const AuthService = {
    loginUser: async (user, dispatch, navigate) => {
        dispatch(loginStart());
        try {
            const res = await axios.post(url_login, user);
            dispatch(loginSuccess(res.data));
            navigate('/user');
        } catch (error) {
            dispatch(loginFailed());
            alert('số điện thoại hoặc mật khẩu nhập bị sai!!');
        }
    },

    registerUser: async (user, dispatch, navigate) => {
        dispatch(registerStart());
        try {
            await axios.post(url_register, user);
            dispatch(registerSuccess());
            navigate('/login');
        } catch (error) {
            alert('số điện thoại có thể đã tồn tại hoặc xác nhận mật khẩu không khớp!!');
            dispatch(registerFailed());
        }
    },
};

export default AuthService;
