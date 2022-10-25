import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import { Trash, ChevronDoubleUp } from 'react-bootstrap-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import clsx from 'clsx';
import styles from './cart.module.scss';
import { CartContext } from '../../Contexts/CartContext';
import helper from '~/helpers';

import ScrollingToHeader from '~/components/ScrollingToHeader';
function Cart() {
    useEffect(() => {
        document.title = 'Thanh toán';
    });
    const { myCart, setMyCart } = useContext(CartContext);
    let cart = [...myCart];
    console.log('myCart khi re render  ', cart);

    const itemLocal = JSON.parse(localStorage.getItem('listProductInCart'));
    if (cart.length === 1) {
        if (itemLocal !== null) cart = [...itemLocal];
    }

    const total = _.sum(
        cart.map((item) => {
            if (item.idProduct !== undefined) {
                let costItem = Number(item.price.split(' ')[0]) * 1000 * Number(item.quatity);
                return Number(costItem);
            }
        }),
    );

    const deleteProductItem = (id, size) => {
        console.log('id - size deleted:  ', id, size);
        const indexNeedDelete = _.findIndex(cart, { idProduct: id, size: size });
        let itemDeleted = _.pullAt(cart, indexNeedDelete);
        console.log('Phan tu vua lay ra: ', itemDeleted);
        console.log('Phan tu con lai: ', cart);
        localStorage.setItem('listProductInCart', JSON.stringify(cart));
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
                            <div className={clsx(styles.cart)}>
                                <ul>
                                    {cart.map((item, index) => {
                                        if (item.idProduct !== undefined) {
                                            let costItem =
                                                Number(item.price.split(' ')[0]) * 1000 * Number(item.quatity);
                                            costItem = helper.formatProductPrice(costItem);
                                            costItem = costItem.split('₫')[0];
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
                                                                onClick={() =>
                                                                    deleteProductItem(item.idProduct, item.size)
                                                                }
                                                            >
                                                                <Trash />
                                                            </button>
                                                        </div>
                                                        <p>Size {item.size}</p>
                                                        <div className="d-flex justify-content-between">
                                                            <p>x {item.quatity}</p>
                                                            <p style={{ marginRight: '2rem' }}>{costItem} vnd</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>

                                <div className={clsx(styles.totalCost)}>
                                    <span>Tổng</span>
                                    <span style={{ marginRight: '2rem' }}>
                                        {' '}
                                        {helper.formatProductPrice(total).split('₫')[0]} vnd
                                    </span>
                                </div>
                            </div>
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
            <ScrollingToHeader />
        </>
    );
}

export default Cart;
