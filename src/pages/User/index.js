import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import clsx from 'clsx';
import styles from './user.module.scss';
import UserSerive from '~/services/UserService';

function User() {
    const [inforUser, setInforUser] = useState({});
    useEffect(() => {
        document.title = 'Tài khoản';
    }, []);

    const user = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
        if (user) {
            UserSerive.getOneUser(user?._id)
                .then((res) => setInforUser(res.data))
                .catch((error) => console.log(error));
        }
    }, []);

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

                        <div className={clsx(styles.titleLeft)}>Đăng xuất</div>
                    </Col>
                    <Col xs={12} sm={12} md={8}>
                        <hr />
                        <div className={clsx(styles.titleRight)}>Họ và tên</div>
                        <div>{inforUser?.fullname}</div>
                        <div className={clsx(styles.titleRight)}>Số điện thoại</div>
                        <div>{inforUser?.phone}</div>
                        <div className={clsx(styles.titleRight)}>Ngày sinh</div>
                        <div>{inforUser?.birthday}</div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
