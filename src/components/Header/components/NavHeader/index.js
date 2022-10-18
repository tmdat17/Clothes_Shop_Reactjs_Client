import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './navheader.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Bell, Search, Cart2, Person } from 'react-bootstrap-icons';
import { SearchHeader } from '~/components/Header/components';
import logolevent from '~/assets/logoLeventWithoutBg.png';
function NavHeader() {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };
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
                        <Nav.Link href="/home">
                            <Bell className={styles.icon} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/home" className="">
                            <span className={styles.icon}>Wishlist</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">
                            <Search className={styles.icon} onClick={handleShow} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/home">
                            <Cart2 className={styles.icon} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="login">
                            <Person className={styles.icon} />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <hr />
            {show && <SearchHeader />}
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
                                <NavDropdown.Item href="/home">T-Shirt</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/home">Polo</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/home">Quần</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/home" className={clsx(styles.navHeaderItem)}>
                                Sale
                            </Nav.Link>
                            <Nav.Link href="/home" className={clsx(styles.navHeaderItem)}>
                                Bộ sưu tâp
                            </Nav.Link>
                            <Nav.Link href="/home" className={clsx(styles.navHeaderItem)}>
                                Outfits
                            </Nav.Link>
                            <Nav.Link href="/home" className={clsx(styles.navHeaderItem)}>
                                Blogs
                            </Nav.Link>
                            <Nav.Link href="/home" className={clsx(styles.navHeaderItem)}>
                                Đăng sản phẩm
                            </Nav.Link>
                            <NavDropdown
                                title="Chăm sóc khách hàng"
                                className={clsx(styles.navHeaderItem)}
                                id="navbarScrollingDropdown"
                            >
                                <NavDropdown.Item href="/home">Chính sách đổi trả & bảo hành</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/home">Chính sách membership</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/home">Chính sách vận chuyển</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/home">Hướng dẫn mua hàng và bảo hành</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/home">Q & A</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/home" className={clsx(styles.navHeaderItem)}>
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
