import { useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import clsx from 'clsx';
import styles from './cart.module.scss';
import { CartContext } from '../../Contexts/CartContext';

function Cart() {
    const { myCart } = useContext(CartContext);
    let myCartAfterUpdate = myCart.slice(1, myCart.length, 1);
    _.reverse(myCartAfterUpdate);
    console.log('nav myCart:    ', myCartAfterUpdate);
    return (
        <>
            {console.log('myCart in return:     ')}
            <Breadcrumb id="head">
                <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
            </Breadcrumb>

            {myCartAfterUpdate && myCartAfterUpdate.length > 0 ? (
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={12} md={6}>
                            <h5>GIỎ HÀNG</h5>
                            <ul className={clsx(styles.cart)}>
                                {myCartAfterUpdate.map((item, index) => {
                                    return (
                                        <li key={index} className={clsx(styles.cardProduct)}>
                                            <Link to={`/product/${item.idProduct}`}>
                                                <img
                                                    className={styles.imgProduct}
                                                    src={item.img}
                                                    alt="error thumbnail"
                                                />
                                            </Link>
                                            <div className={clsx(styles.contentProduct)}>
                                                <Link to={`/product/${item.idProduct}`}>
                                                    <p className={clsx(styles.nameProduct)}>{item.name}</p>
                                                </Link>
                                                <p>Size {item.size}</p>
                                                <p>x {item.quatity}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <h5>THÔNG TIN GIAO HÀNG</h5>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <>
                    <h3 className="text-center"> GIỎ HÀNG TRỐNG</h3>
                </>
            )}
        </>
    );
}

export default Cart;
