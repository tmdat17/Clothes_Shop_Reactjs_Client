import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import clsx from 'clsx';
import styles from './cart.module.scss';
import { CartContext } from '../../Contexts/CartContext';

function Cart() {
    const { myCart, setMyCart } = useContext(CartContext);
    let cart = [...myCart];
    console.log('myCart khi re render  ', cart);

    // const [myCartAfterDelete, setMyCartAfterDelete] = useState(cart);

    // console.log('nav myCart:    ', myCartAfterUpdate);

    const deleteProductItem = (id, size) => {
        console.log('id - size deleted:  ', id, size);
        const indexNeedDelete = _.findIndex(cart, { idProduct: id, size: size });
        let itemDeleted = _.pullAt(cart, indexNeedDelete);
        console.log('Phan tu vua lay ra: ', itemDeleted);
        console.log('Phan tu con lai: ', cart);
        setMyCart(cart);
        console.log('Sau khi xoa san pham:   ', myCart);
    };
    return (
        <>
            {console.log('myCart in return:     ')}
            <Breadcrumb id="head">
                <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
            </Breadcrumb>

            {cart && cart.length > 1 && cart[0].idProduct === undefined ? (
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={12} md={6}>
                            <h5>GIỎ HÀNG</h5>
                            <ul className={clsx(styles.cart)}>
                                {cart.map((item, index) => {
                                    if (item.idProduct !== undefined) {
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
                                                    <div className={clsx(styles.wrapperDeleteProduct)}>
                                                        <Link to={`/product/${item.idProduct}`}>
                                                            <p className={clsx(styles.nameProduct)}>{item.name}</p>
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteProductItem(item.idProduct, item.size)}
                                                        >
                                                            <Trash />
                                                        </button>
                                                    </div>
                                                    <p>Size {item.size}</p>
                                                    <p>x {item.quatity}</p>
                                                </div>
                                            </li>
                                        );
                                    }
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
