import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import clsx from 'clsx';

import styles from './login.module.scss';
import AuthService from '~/services/AuthService';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            phone: phone,
            password: password,
        };
        AuthService.loginUser(newUser, dispatch, navigate);
    };

    return (
        <>
            <Container fluid>
                <div className={' my-3 my-sm-3 my-md-5 ' + clsx(styles.loginForm)}>
                    <h2 className="text-center" style={{ fontWeight: '400', marginBottom: '2rem' }}>
                        ĐĂNG NHẬP
                    </h2>
                    <form
                        className="d-flex justify-content-start d-sm-flex justify-content-sm-start d-md-flex justify-content-md-center"
                        onSubmit={handleLogin}
                    >
                        <div className="">
                            <p className="fs-4 text" style={{ fontWeight: '300' }}>
                                Bạn chưa có tài khoản?
                                <Link to="/sign_up">Đăng ký</Link>
                            </p>
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
                                type="password"
                                required={true}
                                placeholder="Mật khẩu"
                                className={' d-block my-3 my-sm-3 my-md-4 form-control ' + clsx(styles.inputInfor)}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input className="form-check-input" type="checkbox" defaultValue="" id="remember_acc" />
                            <label className="text-secondary fs-5 text-center" htmlFor="remember_acc">
                                Ghi nhớ tài khoản
                            </label>
                            <div className="d-flex justify-content-around w-100 mt-3 mt-sm-3 mt-md-4 ">
                                <a className="fs-4 pt-1" href="#" style={{ fontWeight: '300' }}>
                                    Quên mật khẩu
                                </a>
                                <button className={'w-50 fs-3 ms-md-4 ' + clsx(styles.loginBtn)}>Đăng nhập</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default Login;
