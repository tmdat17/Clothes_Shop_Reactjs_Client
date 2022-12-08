import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import clsx from 'clsx';
import styles from './user.module.scss';
import UserService from '~/services/UserService';
import { createAxios } from '~/createInstance';
import { logoutSuccess } from '~/redux/authSlice';
import { CartContext } from '../../Contexts/CartContext';
function User() {
    const { myCart, setMyCart } = useContext(CartContext);
    const [inforUser, setInforUser] = useState({});
    useEffect(() => {
        document.title = 'Tài khoản';
    }, []);

    const user = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (user === null) {
            navigate('/login');
        } else navigate('/user');
        if (user) {
            UserService.getOneUser(user?._id)
                .then((res) => setInforUser(res.data))
                .catch((error) => console.log(error));
        }
    }, []);

    // axiosJWT trong trường hợp user muốn logout mà accessToken đã hết hạn
    // thì axiosJWT sẽ tự động gọi refreshToken (tạo ra accessToken mới và refreshToken mới) và axiosJWT sẽ cấu hình headers có accessToken mới
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);
    const idUser = user?._id;
    const accessToken = user?.accessToken;
    const handleLogout = () => {
        UserService.logoutUser(dispatch, idUser, navigate, accessToken, axiosJWT);
        setMyCart([]);
    };

    return (
        <>
            <Container fluid className={clsx(styles.containerUser)}>
                <Row>
                    <Col xs={12} sm={12} md={4}></Col>
                    <Col xs={12} sm={12} md={8}>
                        <span style={{ fontSize: '2rem' }}>Thông tin cá nhân</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                        <hr />
                        <Link
                            to="/user"
                            className={clsx(styles.titleLeft)}
                            style={{ display: 'block', fontWeight: '300' }}
                        >
                            Thông tin cá nhân
                        </Link>

                        <Link
                            to={`/update/${user?._id}`}
                            className={clsx(styles.titleLeft)}
                            style={{ display: 'block' }}
                        >
                            Thay đổi thông tin
                        </Link>
                        <Link to="/order_user" className={clsx(styles.titleLeft)} style={{ display: 'block' }}>
                            Lịch sử đặt hàng
                        </Link>

                        <button onClick={handleLogout} className={clsx(styles.btnLogout)}>
                            Đăng xuất
                        </button>
                    </Col>
                    <Col xs={12} sm={12} md={8}>
                        <hr />
                        <div className={clsx(styles.titleRight)}>Họ và tên</div>
                        <div className={clsx(styles.inforUser)}>{inforUser?.fullname}</div>
                        <div className={clsx(styles.titleRight)}>Số điện thoại</div>
                        <div className={clsx(styles.inforUser)}>{inforUser?.phone}</div>
                        <div className={clsx(styles.titleRight)}>Ngày sinh</div>
                        <div className={clsx(styles.inforUser)}>{inforUser?.birthday}</div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
