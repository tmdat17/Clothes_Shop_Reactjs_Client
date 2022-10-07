/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './footerbot.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FooterBot() {
    return (
        <>
            <div className={clsx(styles.wrapperFooterBot)}>
                <Container fluid>
                    <Row>
                        <Col xs={6} md={3}>
                            <div
                                style={{ fontWeight: '100', fontSize: '1.1rem' }}
                                className=" text-start text-md-start mt-md-2 p-1"
                            >
                                <a href="#" className={clsx(styles.footerBotLink)}>
                                    Tuyển dụng
                                </a>
                            </div>
                        </Col>
                        <Col xs={6} md={3}>
                            <div
                                style={{ fontWeight: '100', fontSize: '1.1rem' }}
                                className=" text-end text-md-start mt-md-2 p-1"
                            >
                                <a href="#" className={clsx(styles.footerBotLink)}>
                                    Term & Policies
                                </a>
                            </div>
                        </Col>
                        <Col xs={12} md={6} className="text-center text-md-end mt-md-2 p-1">
                            <h5 style={{ fontWeight: '100', fontSize: '1.1rem' }}>
                                Levents® - Popular Streetwear brand
                            </h5>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default FooterBot;
