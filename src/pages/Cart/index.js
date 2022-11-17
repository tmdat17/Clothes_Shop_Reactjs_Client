import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import clsx from 'clsx';
import styles from './cart.module.scss';
import { CartContext } from '../../Contexts/CartContext';
import helper from '~/helpers';

import ScrollingToHeader from '~/components/ScrollingToHeader';
import UserService from '~/services/UserService';
import OrderService from '~/services/OrderService';
import OrderDetailService from '~/services/OrderDetailService';

function Cart() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        document.title = 'Thanh toán';
    });
    const { myCart, setMyCart } = useContext(CartContext);
    let cart = [...myCart];

    const [receiverName, setReceiverName] = useState(user?.fullname);
    const [phone, setPhone] = useState(user?.phone);
    const [birthday, setBirthday] = useState(user?.birthday);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [methodPayment, setMethodPayment] = useState('');

    const [orderId, setOrderId] = useState('');
    console.log('myCart khi re render  ', cart);

    // const itemLocal = JSON.parse(localStorage.getItem('listProductInCart'));
    // if (cart.length === 1) {
    //     if (itemLocal !== null) cart = [...itemLocal];
    // }

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
        const productNeedDelete = {
            idProduct: id,
            size: size,
        };
        const indexNeedDelete = _.findIndex(cart, { idProduct: id, size: size });
        let itemDeleted = _.pullAt(cart, indexNeedDelete);
        console.log('Phan tu vua lay ra: ', itemDeleted);
        console.log('Phan tu con lai: ', cart);
        // localStorage.setItem('listProductInCart', JSON.stringify(cart));
        UserService.changeItemCart(user?._id, productNeedDelete);
        setMyCart(cart);
        console.log('Sau khi xoa san pham:   ', myCart);
    };

    const changeCity = (e) => {
        setCity(e.target.value);
    };

    const changeMethodPayment = (e) => {
        setMethodPayment(e.target.value);
    };

    const handleCheckOut = async (e) => {
        e.preventDefault();
        const inforShipment = {
            receiverName,
            phone,
            birthday,
            address,
            city,
            ward,
            methodPayment,
            totalPrice: helper.formatProductPrice(total).split('₫')[0] + 'vnd',
            user: user?._id,
        };
        const getData = OrderService.addOrder(inforShipment);
        getData
            .then((res) => {
                myCart.map((item) => {
                    const newOrderDetail = {
                        order: res.data,
                        product: item.idProduct,
                        nameProduct: item.name,
                        price: item.price,
                        quatity: item.quatity,
                        size: item.size,
                    };
                    OrderDetailService.addOrderDetail(newOrderDetail);
                    const updateCart = {
                        idProduct: item.idProduct,
                        size: item.size,
                    };
                    UserService.changeItemCart(user?._id, updateCart);
                });
                setMyCart([]);
            })
            .catch((error) => console.log(error));
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

            {cart && cart.length > 0 && cart[0].idProduct !== undefined ? (
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
                            <div className={clsx(styles.containerInforShip)}>
                                <h5>THÔNG TIN GIAO HÀNG</h5>
                                <form onSubmit={handleCheckOut}>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="receiverName">Tên người nhận:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <input
                                                    className={clsx(styles.inforShip)}
                                                    value={receiverName}
                                                    type="text"
                                                    required={true}
                                                    id="receiverName"
                                                    onChange={(e) => setReceiverName(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="phone">Số điện thoại:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <input
                                                    className={clsx(styles.inforShip)}
                                                    value={phone}
                                                    type="tel"
                                                    required={true}
                                                    size={10}
                                                    id="phone"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="birthday">Ngày sinh:</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <input
                                                    className={clsx(styles.inforShip)}
                                                    value={birthday}
                                                    type="date"
                                                    required={true}
                                                    id="birthday"
                                                    onChange={(e) => setBirthday(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="address">Địa chỉ:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <input
                                                    className={clsx(styles.inforShip)}
                                                    value={address}
                                                    type="text"
                                                    required={true}
                                                    id="address"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="receiver">Thành phố:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <select
                                                    required={true}
                                                    defaultValue=""
                                                    className={clsx(styles.inforShip)}
                                                    onClick={(e) => changeCity(e)}
                                                >
                                                    <option value="">Chọn thành phố</option>
                                                    <option value="An Giang">An Giang</option>
                                                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                                    <option value="Bắc Giang">Bắc Giang</option>
                                                    <option value="Bắc Kạn">Bắc Kạn</option>
                                                    <option value="Bạc Liêu">Bạc Liêu</option>
                                                    <option value="Bắc Ninh">Bắc Ninh</option>
                                                    <option value="Bến Tre">Bến Tre</option>
                                                    <option value="Bình Định">Bình Định</option>
                                                    <option value="Bình Dương">Bình Dương</option>
                                                    <option value="Bình Phước">Bình Phước</option>
                                                    <option value="Bình Thuận">Bình Thuận</option>
                                                    <option value="Bình Thuận">Bình Thuận</option>
                                                    <option value="Cà Mau">Cà Mau</option>
                                                    <option value="Cao Bằng">Cao Bằng</option>
                                                    <option value="Đắk Lắk">Đắk Lắk</option>
                                                    <option value="Đắk Nông">Đắk Nông</option>
                                                    <option value="Điện Biên">Điện Biên</option>
                                                    <option value="Đồng Nai">Đồng Nai</option>
                                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                                    <option value="Gia Lai">Gia Lai</option>
                                                    <option value="Hà Giang">Hà Giang</option>
                                                    <option value="Hà Nam">Hà Nam</option>
                                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                                    <option value="Hải Dương">Hải Dương</option>
                                                    <option value="Hậu Giang">Hậu Giang</option>
                                                    <option value="Hòa Bình">Hòa Bình</option>
                                                    <option value="Hưng Yên">Hưng Yên</option>
                                                    <option value="Khánh Hòa">Khánh Hòa</option>
                                                    <option value="Kiên Giang">Kiên Giang</option>
                                                    <option value="Kon Tum">Kon Tum</option>
                                                    <option value="Lai Châu">Lai Châu</option>
                                                    <option value="Lâm Đồng">Lâm Đồng</option>
                                                    <option value="Lạng Sơn">Lạng Sơn</option>
                                                    <option value="Lào Cai">Lào Cai</option>
                                                    <option value="Long An">Long An</option>
                                                    <option value="Nam Định">Nam Định</option>
                                                    <option value="Nghệ An">Nghệ An</option>
                                                    <option value="Ninh Bình">Ninh Bình</option>
                                                    <option value="Ninh Thuận">Ninh Thuận</option>
                                                    <option value="Phú Thọ">Phú Thọ</option>
                                                    <option value="Quảng Bình">Quảng Bình</option>
                                                    <option value="Quảng Bình">Quảng Bình</option>
                                                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                                                    <option value="Quảng Ninh">Quảng Ninh</option>
                                                    <option value="Quảng Trị">Quảng Trị</option>
                                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                                    <option value="Sơn La">Sơn La</option>
                                                    <option value="Tây Ninh">Tây Ninh</option>
                                                    <option value="Thái Bình">Thái Bình</option>
                                                    <option value="Thái Nguyên">Thái Nguyên</option>
                                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                                    <option value="Tiền Giang">Tiền Giang</option>
                                                    <option value="Trà Vinh">Trà Vinh</option>
                                                    <option value="Tuyên Quang">Tuyên Quang</option>
                                                    <option value="Vĩnh Long">Vĩnh Long</option>
                                                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                                    <option value="Yên Bái">Yên Bái</option>
                                                    <option value="Phú Yên">Phú Yên</option>
                                                    <option value="Tp.Cần Thơ">Cần Thơ</option>
                                                    <option value="Tp.Đà Nẵng">Đà Nẵng</option>
                                                    <option value="Tp.Hải Phòng">Hải Phòng</option>
                                                    <option value="Tp.Hà Nội">Hà Nội</option>
                                                    <option value="TP  HCM">HCM</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="district">Quận/Huyện:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <input
                                                    className={clsx(styles.inforShip)}
                                                    value={district}
                                                    type="text"
                                                    required={true}
                                                    id="district"
                                                    onChange={(e) => setDistrict(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="ward">Phường:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <input
                                                    className={clsx(styles.inforShip)}
                                                    value={ward}
                                                    type="text"
                                                    required={true}
                                                    id="ward"
                                                    onChange={(e) => setWard(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4}>
                                                <label htmlFor="receiver">Hình thức thanh toán:</label>
                                                <span>*</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={8}>
                                                <select
                                                    required={true}
                                                    defaultValue=""
                                                    className={clsx(styles.inforShip)}
                                                    onClick={(e) => changeMethodPayment(e)}
                                                >
                                                    <option value="">Chọn hình thức thành toán</option>
                                                    <option value="Cod">Thanh toán khi nhận hàng</option>
                                                    <option value="Online">Thanh toán trực tuyến</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={clsx(styles.wrapperInforShip)}>
                                        <button className={clsx(styles.btnOrder)}> Đặt hàng </button>
                                    </div>
                                </form>
                            </div>
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
