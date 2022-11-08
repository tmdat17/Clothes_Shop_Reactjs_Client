import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import clsx from 'clsx';
import styles from './user.module.scss';

function User() {
    useEffect(() => {
        document.title = 'Tài khoản';
    }, []);

    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Container fluid className={clsx(styles.containerUser)}>
                <Row>
                    <Col xs={12} sm={12} md={4} style={{ backgroundColor: 'green' }}>
                        <div>Tên</div>
                        <div>Số điện thoại</div>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <span style={{ fontSize: '2rem' }}>Thông tin cá nhân</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={4} style={{ backgroundColor: 'grey' }}>
                        <h4>Thông tin cá nhân</h4>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <h2>Thông tin cá nhân</h2>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
