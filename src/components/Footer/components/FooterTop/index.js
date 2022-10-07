import clsx from 'clsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Youtube, Discord } from 'react-bootstrap-icons';
import styles from './footertop.module.scss';
function FooterTop() {
    return (
        <div className={clsx(styles.wrapperFooterBot)}>
            <hr />
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <h3 className="text-uppercase fw-normal">
                            Về chúng tôi <br />
                        </h3>
                        <h5>
                            Levents® – Popular Streetwear Brand <br /> <br />
                        </h5>
                        <p className="fw-light">
                            HỘ KINH DOANH Levents <br />
                            GPKD được cấp bởi Ủy ban nhân dân Quận 1– TP Hồ Chí Minh <br />
                            Mã số thuế: 8547618080 <br />
                            Ngày cấp: 07/12/2020
                        </p>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <Row>
                            <Col xs={6} sm={3} md={3}>
                                <div className="text-uppercase fs-4 text fw-normal">
                                    liên hệ <br /> <br />
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        Hotline <br />
                                    </li>
                                    <li className="fw-lighter" style={{ color: '#848384' }}>
                                        1900 633 028 <br /> <br />
                                    </li>
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        Email <br />
                                    </li>
                                    <li className="fw-lighter">
                                        <a className="" href="#" style={{ color: '#848384' }}>
                                            contact@levent.vn <br /> <br />{' '}
                                        </a>
                                    </li>
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        Mon - Sun <br />
                                    </li>
                                    <li className="fw-lighter" style={{ color: '#848384' }}>
                                        09:30 ~ 21:30 <br /> <br />
                                    </li>
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        Email Business <br />
                                    </li>
                                    <li className="fw-lighter">
                                        <a className="" href="#" style={{ color: '#848384' }}>
                                            business@levents.asia <br /> <br />
                                        </a>
                                    </li>
                                </div>
                            </Col>
                            {/* end contact-shop */}
                            <Col xs={6} sm={3} md={3} className={clsx(styles.retailShop)}>
                                <div className="text-uppercase fs-4 text fw-normal">
                                    Cửa hàng <br /> <br />
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        <a className="" href="#">
                                            325 Hoàng Sa, Tân Định, quận 1, HCM <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            The New Playground, 04 Phạm Ngũ Lão, quận 1, HCM <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            842 Sư Vạn Hạnh, phường 12, quận 10, HCM <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            54 Mậu Thân, Xuân Khánh, quận Ninh Kiều, Cần Thơ <br /> <br />
                                        </a>
                                    </li>
                                </div>
                            </Col>
                            {/* end retail-shop */}
                            <Col xs={6} sm={3} md={3} className={clsx(styles.helpPolicy)}>
                                <div className="text-uppercase fs-4 text fw-normal">
                                    Hỗ trợ <br /> <br />
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        <a className="" href="#">
                                            Chính sách đổi trả <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Tài khoản <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Chính sách vận chuyển <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Thanh toán online <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Chính sách bảo mật thông tin <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Chính sách bảo hành <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Chính sách khiếu nại <br /> <br />
                                        </a>
                                    </li>
                                </div>
                            </Col>
                            {/* end help-policy */}
                            <Col xs={6} sm={3} md={3} className={clsx(styles.expandShop)}>
                                <div className="text-uppercase fs-4 text fw-normal">
                                    Mở rộng <br /> <br />
                                </div>
                                <div className="text" style={{ fontSize: '1.05rem' }}>
                                    <li>
                                        <a className="" href="#">
                                            Tuyển dụng <br /> <br />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="" href="#">
                                            Blog <br /> <br />
                                        </a>
                                    </li>
                                    <li className="d-flex flex-row justify-content-even">
                                        <a className="me-3 me-md-3 text-dark" href="#">
                                            <Facebook className={clsx(styles.icon)} />
                                        </a>
                                        <a className="me-3 me-md-3 text-dark" href="#">
                                            <Youtube className={clsx(styles.icon)} />
                                        </a>
                                        <a className="me-3 me-md-3 text-dark" href="#">
                                            <Discord className={clsx(styles.icon)} />
                                        </a>
                                    </li>
                                </div>
                            </Col>
                            {/* end expand-shop */}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FooterTop;
