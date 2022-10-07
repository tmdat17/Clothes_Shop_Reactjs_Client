import clsx from 'clsx';
import styles from './signup.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

function Signup() {
    return (
        <Container fluid>
            <div className={' my-3 my-sm-3 my-md-5 ' + clsx(styles.signupForm)}>
                <h2 className="text-center">TẠO TÀI KHOẢN</h2>
                <form className="d-flex justify-content-center" method="POST" action="#">
                    <div className="">
                        <input
                            type="text"
                            size={45}
                            required=""
                            name="name"
                            placeholder="Họ và tên"
                            className={
                                ' d-block input-group-md my-3 my-sm-3 my-md-4 mx-auto ' + clsx(styles.inputInfor)
                            }
                        />
                        <input
                            type="tel"
                            size={45}
                            required=""
                            name="number_phone"
                            placeholder="Số điện thoại"
                            className={
                                ' d-block input-group-md my-3 my-sm-3 my-md-4 mx-auto ' + clsx(styles.inputInfor)
                            }
                        />
                        <input
                            type="date"
                            size={45}
                            required=""
                            name="birthday"
                            placeholder="dd/mm/yyyy"
                            className={
                                ' d-block input-group-md my-3 my-sm-3 my-md-4 mx-auto ' + clsx(styles.inputInfor)
                            }
                            style={{ width: '55%', fontWeight: '400' }}
                        />
                        <input
                            type="password"
                            size={45}
                            required=""
                            name="password"
                            placeholder="Mật khẩu"
                            className={
                                ' d-block input-group-md my-3 my-sm-3 my-md-4 mx-auto ' + clsx(styles.inputInfor)
                            }
                        />
                        <input
                            type="password"
                            size={45}
                            required=""
                            name="acpt_password"
                            placeholder="Xác nhận lại mật khẩu"
                            className={
                                ' d-block input-group-md my-3 my-sm-3 my-md-4 mx-auto ' + clsx(styles.inputInfor)
                            }
                        />
                        <Row className=" mx-auto ">
                            <Col xs={12} sm={12} md={12} className=" text-center">
                                <input
                                    className="form-check-input my-4 me-2"
                                    type="checkbox"
                                    defaultValue=""
                                    id="acpt_cookie"
                                />
                                <label className="text-secondary my-3 fs-5 text-center" htmlFor="acpt_cookie">
                                    Tôi đồng ý với các điều khoản và điều kiện, chính sách bảo mật và chính sách cookie
                                </label>
                            </Col>
                            <Col xs={12} sm={12} md={12} className=" text-center">
                                <button
                                    className={' w-25 fs-3 ms-md-4 mx-auto mb-3 ' + clsx(styles.signupBtn)}
                                    type="submit"
                                >
                                    Tạo
                                </button>
                            </Col>
                        </Row>
                        <p className="mx-auto" style={{ fontWeight: '300', width: '600px' }}>
                            Nếu sdt hoặc email của bạn báo đã tồn tại, bấm{' '}
                            {
                                <a className="fw-bold" href="#">
                                    vào đây
                                </a>
                            }{' '}
                            và login với sdt hoặc email đó với một mật khẩu bất kì để kích hoạt tài khoản hoặc liên hệ
                            với bộ phận cskh của Levents để được hỗ trợ
                        </p>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default Signup;
