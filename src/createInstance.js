import axios from 'axios';
import jwt_decode from 'jwt-decode';

const url_refreshToken = 'http://localhost:5000/auth/refresh/';

const refreshToken = async () => {
    try {
        console.log('truoc khi goi api axios: ');
        const res = await axios.post(url_refreshToken, {
            withCredentials: true, // gắn cookies vào
        });

        console.log('Sau khi refreshtoken:  ', res.data);
        return res.data;
        // trả về accessToken mới và còn refreshToken mới sẽ được lưu ngược lại vào cookies
    } catch (error) {
        console.log(error);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    // interceptors sẽ thực hiện các logic ở đây, trước khi việc gọi api xảy ra
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken); // giải mã accessToken
            // nếu thời gian hết hạn nhỏ hơn thời gian hiện giờ nghĩa là hết hạn => refreshToken
            // decodedToken.exp thời gian hết hạn trên jwt.io
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = refreshToken();
                // Sau khi có accessToken mới thì chỉ cập nhật lại accessToken mới cho user
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                // tạo lại headers mới
                // Thay thế token mới vào header giống postMan
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    return newInstance;
};
