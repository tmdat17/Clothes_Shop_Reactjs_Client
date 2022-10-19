import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { CartContext } from '../../Contexts/CartContext';

function Cart() {
    const { myCart } = useContext(CartContext);
    console.log('nav myCart:    ', myCart);
    return (
        <>
            <Breadcrumb id="head">
                <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
            </Breadcrumb>

            <Container fluid>
                <Row></Row>
            </Container>
        </>
    );
}

export default Cart;
