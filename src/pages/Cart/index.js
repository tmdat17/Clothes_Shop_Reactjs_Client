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
import axios from 'axios';

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

    const [provinceApi, setProvinceApi] = useState([]);
    const [provinceUpdated, setProvinceUpdated] = useState([]);
    const [districtUpdated, setDistrictUpdated] = useState([]);
    const [wardUpdated, setWardUpdated] = useState([]);
    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('https://provinces.open-api.vn/api/?depth=3');
            return response;
        };
        getData()
            .then((res) => {
                setProvinceApi(res.data);
            })
            .catch((error) => console.log('api province:  ', error));
    }, []);

    useEffect(() => {
        const updateProvince = () => {
            provinceApi?.map((item) => {
                if (item.name.includes('Thành phố')) {
                    item.name = item.name.slice(10, item.name.length);
                    setProvinceUpdated((prev) => [...prev, item]);
                } else if (item.name.includes('Tỉnh')) {
                    item.name = item.name.slice(5, item.name.length);
                    setProvinceUpdated((prev) => [...prev, item]);
                }
            });
        };
        updateProvince();
    }, [provinceApi]);

    useEffect(() => {
        const getDistrict = () => {
            provinceUpdated?.map((item) => {
                if (item.name === city) {
                    setDistrictUpdated([]);
                    item.districts.map((item_district) => {
                        setDistrictUpdated((prev) => [...prev, item_district]);
                    });
                    return;
                }
            });
        };
        getDistrict();
    }, [city]);

    useEffect(() => {
        const getWard = () => {
            provinceUpdated?.map((item) => {
                if (item.name === city) {
                    item.districts.map((item_district) => {
                        if (item_district.name === district) {
                            setWardUpdated([]);
                            item_district.wards.map((item_ward) => {
                                setWardUpdated((prev) => [...prev, item_ward]);
                            });
                            return;
                        }
                    });
                }
            });
        };
        getWard();
    }, [district]);

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
    const changeDistrict = (e) => {
        setDistrict(e.target.value);
    };
    const changeWard = (e) => {
        setWard(e.target.value);
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
            district,
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
                                                    {provinceUpdated?.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.name}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
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
                                                <select
                                                    required={true}
                                                    defaultValue=""
                                                    className={clsx(styles.inforShip)}
                                                    onClick={(e) => changeDistrict(e)}
                                                >
                                                    {districtUpdated?.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.name}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
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
                                                <select
                                                    required={true}
                                                    defaultValue=""
                                                    className={clsx(styles.inforShip)}
                                                    onClick={(e) => changeWard(e)}
                                                >
                                                    {wardUpdated?.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.name}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
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
