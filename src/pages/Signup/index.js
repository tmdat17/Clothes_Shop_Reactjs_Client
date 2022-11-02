import { useEffect } from 'react';
import clsx from 'clsx';
import styles from './signup.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

function Signup() {
    useEffect(() => {
        document.title = 'Đăng ký';
    }, []);
    return (
        <>
            <Container fluid>
                <div className={' my-3 my-sm-3 my-md-5 ' + clsx(styles.signupForm)}>
                    <h2 className="text-center" style={{ fontWeight: '400', marginBottom: '2rem' }}>
                        TẠO TÀI KHOẢN
                    </h2>
                    <form
                        className=" d-flex justify-content-start d-sm-flex justify-content-sm-start d-md-flex justify-content-md-center"
                        method="POST"
                        action="#"
                    >
                        <div className="">
                            <input
                                type="text"
                                required=""
                                name="fullname"
                                placeholder="Họ và tên"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                            />

                            <input
                                type="tel"
                                required=""
                                name="phone"
                                placeholder="Số điện thoại"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                            />
                            <input
                                type="date"
                                required=""
                                name="birthday"
                                placeholder="dd/mm/yyyy"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                            />
                            <input
                                type="password"
                                required=""
                                name="password"
                                placeholder="Mật khẩu"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                            />
                            <input
                                type="password"
                                required=""
                                name="accept_password"
                                placeholder="Xác nhận lại mật khẩu"
                                className={
                                    ' d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control ' + clsx(styles.inputInfor)
                                }
                            />
                            <Row className=" mx-auto ">
                                <Col xs={12} sm={12} md={12} className=" my-2 ">
                                    <input
                                        className="form-check-input mt-4 me-2"
                                        type="checkbox"
                                        defaultValue=""
                                        id="acpt_cookie"
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
                                    <button
                                        className={' w-50 fs-3 ms-md-4 mx-auto ' + clsx(styles.signupBtn)}
                                        type="submit"
                                    >
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
        </>
    );
}

export default Signup;
