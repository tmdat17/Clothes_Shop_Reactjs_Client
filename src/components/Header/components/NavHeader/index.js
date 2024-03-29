import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import clsx from 'clsx';
import styles from './navheader.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Bell, Search, Cart2, Person } from 'react-bootstrap-icons';
import { SearchHeader } from '~/components/Header/components';
import logolevent from '~/assets/logoLeventWithoutBg.png';

import { CartContext } from '~/Contexts/CartContext';
import UserService from '~/services/UserService';

function NavHeader() {
    const { myCart, setMyCart } = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    const handleShowFromChildComponent = (display) => {
        setShow(display);
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('listProductInCart')) === null) {
            localStorage.setItem('listProductInCart', JSON.stringify(myCart));
            console.log('local bi null   ');
        }
    }, []);

    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        console.log('id cua user:  ', user?._id);
        const getProductFromCart = UserService.getOneUser(user?._id);
        getProductFromCart
            .then((res) => {
                setMyCart(res.data.cart);
            })
            .catch((error) => console.log(error));
    }, [user]);

    return (
        <>
            <div className={' ' + clsx(styles.wrapper_icons_header)}>
                <div className="text-center h-3">
                    <Link to="/">
                        <img src={logolevent} alt="logoLevent" className="img-fluid mt-2 mt-sm-3 mt-md-3" />
                    </Link>
                </div>
                <Nav className={' mx-3 ' + clsx(styles.navIcons)}>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/page_loading">
                            <Bell className={styles.icon} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/page_loading">
                            <span className={styles.icon}>Wishlist</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Search className={styles.icon} onClick={handleShow} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/cart" className={clsx(styles.cartIcon)}>
                            <Cart2 className={styles.icon} />
                            {myCart !== null ? (
                                myCart[0]?.quatity !== undefined ? (
                                    <span className={clsx(styles.quatityProductInCart)}>
                                        {_.sum(
                                            myCart?.map((item) => {
                                                if (item?.quatity !== undefined) {
                                                    return Number(item?.quatity);
                                                }
                                            }),
                                        )}
                                    </span>
                                ) : (
                                    <span></span>
                                )
                            ) : null}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="user">
                            <Person className={styles.icon} />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <hr />
            {console.log('search show:  ', show)}
            {show && <SearchHeader displaySearch={handleShow} />}
            {/* <hr /> */}
            <Navbar bg="light" expand="lg" className={'  ' + clsx(styles.navHeader)}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            style={{ maxHeight: '200px' }}
                            className={' me-auto my-2 my-lg-0 w-100 d-flex justify-content-between '}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to={'about_us'} className={' ' + clsx(styles.navHeaderItem)}>
                                Về chúng tôi
                            </Nav.Link>

                            <NavDropdown
                                title="Shop"
                                id="navbarScrollingDropdown"
                                className={clsx(styles.navHeaderItem)}
                            >
                                <NavDropdown.Item as={Link} to="/shop">
                                    Tất cả
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/category_tshirt">
                                    T-Shirt
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/category_polo">
                                    Polo
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/category_hoodie">
                                    Hoodie
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/category_trouser">
                                    Quần
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/page_loading" className={clsx(styles.navHeaderItem)}>
                                Sale
                            </Nav.Link>
                            <Nav.Link as={Link} to="/page_loading" className={clsx(styles.navHeaderItem)}>
                                Bộ sưu tâp
                            </Nav.Link>
                            <Nav.Link as={Link} to="/page_loading" className={clsx(styles.navHeaderItem)}>
                                Outfits
                            </Nav.Link>
                            <Nav.Link as={Link} to="/page_loading" className={clsx(styles.navHeaderItem)}>
                                Blogs
                            </Nav.Link>

                            <NavDropdown
                                title="Chăm sóc khách hàng"
                                className={clsx(styles.navHeaderItem)}
                                id="navbarScrollingDropdown"
                            >
                                <NavDropdown.Item as={Link} to="/page_loading">
                                    Chính sách đổi trả & bảo hành
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/page_loading">
                                    Chính sách membership
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/page_loading">
                                    Chính sách vận chuyển
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/page_loading">
                                    Hướng dẫn mua hàng và bảo hành
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/page_loading">
                                    Q & A
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/page_loading" className={clsx(styles.navHeaderItem)}>
                                Liên hệ
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavHeader;
