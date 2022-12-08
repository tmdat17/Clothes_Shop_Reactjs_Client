import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import clsx from 'clsx';
import styles from './updateUser.module.scss';
import UserSerive from '~/services/UserService';
import { createAxios } from '~/createInstance';
import { logoutSuccess } from '~/redux/authSlice';

function UpdateUser() {
    const [inforUser, setInforUser] = useState({});
    useEffect(() => {
        document.title = 'Cập nhật tài khoản';
    }, []);

    const user = useSelector((state) => state.auth.login?.currentUser);
    const idUser = useParams();

    useEffect(() => {
        UserSerive.getOneUser(idUser.id)
            .then((res) => setInforUser(res.data))
            .catch((error) => console.log(error));
    }, []);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        setFullName(inforUser.fullname);
        setPhone(inforUser.phone);
        setBirthday(inforUser.birthday);
    }, [inforUser]);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
    }, []);

    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        e.preventDefault();
        const newUpdate = {
            fullname: fullName,
            phone: phone,
            birthday: birthday,
        };
        if (user) {
            UserSerive.updateUser(newUpdate, dispatch, navigate, inforUser?._id);
        }
    };

    let axiosJWT = createAxios(user, dispatch, logoutSuccess);
    const id = user?._id;
    const accessToken = user?.accessToken;
    const handleLogout = () => {
        UserSerive.logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
    };
    return (
        <>
            <Container fluid className={clsx(styles.containerUser)}>
                <Row>
                    <Col xs={12} sm={12} md={4}></Col>
                    <Col xs={12} sm={12} md={8}>
                        <span style={{ fontSize: '2rem' }}>Thay đổi thông tin</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                        <hr />

                        <Link to="/user" className={clsx(styles.titleLeft)} style={{ display: 'block' }}>
                            Thông tin cá nhân
                        </Link>

                        <Link
                            to={`/update/${user?._id}`}
                            className={clsx(styles.titleLeft)}
                            style={{ display: 'block', fontWeight: '300' }}
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
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={fullName}
                                required={true}
                                placeholder="Họ và tên"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.titleRight)
                                }
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <input
                                type="tel"
                                value={phone}
                                required={true}
                                size={10}
                                placeholder="Số điện thoại"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.titleRight)
                                }
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                type="date"
                                value={birthday}
                                required={true}
                                placeholder="dd/mm/yyyy"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.titleRight)
                                }
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            <button className={' fs-3 ' + clsx(styles.updateBtn)}>Cập nhật</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UpdateUser;
