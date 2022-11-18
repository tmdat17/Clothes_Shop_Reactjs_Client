import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

import clsx from 'clsx';
import styles from './signup.module.scss';
import ScrollingToHeader from '~/components/ScrollingToHeader';
import AuthService from '~/services/AuthService';

function Signup() {
    useEffect(() => {
        document.title = 'Đăng ký';
    }, []);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [acceptPassword, setAcceptPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        const userRegister = {
            fullname: fullName,
            phone: phone,
            birthday: birthday,
            password: password,
            accept_password: acceptPassword,
        };
        AuthService.registerUser(userRegister, dispatch, navigate);
    };
    const msg = useSelector((state) => state.auth?.msgRegister);
    return (
        <>
            <Container fluid>
                <div className={' my-3 my-sm-3 my-md-5 ' + clsx(styles.signupForm)}>
                    <h2 className="text-center" style={{ fontWeight: '400', marginBottom: '2rem' }}>
                        TẠO TÀI KHOẢN
                    </h2>
                    <div className={clsx(styles.errorRegister)}>{msg}</div>
                    <form
                        className=" d-flex justify-content-start d-sm-flex justify-content-sm-start d-md-flex justify-content-md-center"
                        onSubmit={handleRegister}
                    >
                        <div className="">
                            <input
                                type="text"
                                required={true}
                                placeholder="Họ và tên"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <input
                                type="tel"
                                required={true}
                                size={10}
                                placeholder="Số điện thoại"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                type="date"
                                required={true}
                                placeholder="dd/mm/yyyy"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            <input
                                type="password"
                                required={true}
                                placeholder="Mật khẩu"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                required={true}
                                placeholder="Xác nhận lại mật khẩu"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                                onChange={(e) => setAcceptPassword(e.target.value)}
                            />
                            <Row className=" mx-auto ">
                                <Col xs={12} sm={12} md={12} className=" my-2 ">
                                    <input
                                        className="form-check-input mt-4 me-2"
                                        type="checkbox"
                                        defaultValue=""
                                        id="acpt_cookie"
                                        required={true}
                                    />
                                    <label
                                        className="text-secondary mt-4 "
                                        style={{ fontSize: 16 }}
                                        htmlFor="acpt_cookie"
                                    >
                                        Tôi đồng ý với các điều khoản và điều kiện, chính sách bảo mật và <br /> chính
                                        sách cookie
                                    </label>
                                </Col>
                                <Col xs={12} sm={12} md={12} className=" text-center">
                                    <button className={' w-50 fs-3 ms-md-4 mx-auto ' + clsx(styles.signupBtn)}>
                                        Tạo
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </div>
                <p className="mx-auto " style={{ width: '70%', fontSize: '1rem' }}>
                    Nếu sdt hoặc email của bạn báo đã tồn tại, bấm{' '}
                    {
                        <a className="fw-bold" href="#">
                            vào đây
                        </a>
                    }{' '}
                    và login với sdt hoặc email đó với một mật khẩu bất kì để kích hoạt tài khoản hoặc liên hệ với bộ
                    phận cskh của Levents để được hỗ trợ
                </p>
            </Container>
            <ScrollingToHeader />
        </>
    );
}

export default Signup;
