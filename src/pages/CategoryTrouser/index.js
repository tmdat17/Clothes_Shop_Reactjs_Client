import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './categoryTrouser.module.scss';
import { Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ScrollingToHeader from '~/components/ScrollingToHeader';
import ProductService from '~/services/ProductService';
function CategoryTrouser() {
    const [allTrousers, setAllTrousers] = useState([]);

    useEffect(() => {
        document.title = 'Trouser';
    }, []);

    useEffect(() => {
        const getData = ProductService.getAllProduct;
        getData()
            .then((res) => {
                res.data.map((item) => {
                    if (item.category.type_product === 'quan jean dai') {
                        setAllTrousers((prev) => [...prev, item]);
                    }
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const [show, setShow] = useState(0);
    const handleHoverImage = (pro_id) => {
        setShow(pro_id);
    };
    return (
        <>
            <div className="ms-3 mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                        Trang chủ
                    </Breadcrumb.Item>
                    <Breadcrumb.Item linkAs="li" as={Link} to={'/shop'} style={{ width: '4rem' }}>
                        Shop
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Trouser</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Quần dài</h1>
            </div>
            <Row className={clsx(styles.listProduct)}>
                {allTrousers.map((item) => {
                    return (
                        <Col xs={12} sm={12} md={4} className={clsx(styles.productItem)} key={item.product_id}>
                            <div className={clsx(styles.topProduct)}>
                                <Link to={`/product/${item._id}`}>
                                    {show === item.product_id ? (
                                        <img
                                            className={'img-fluid ' + clsx(styles.itemThumbnail)}
                                            src={item.thumbnail[1]}
                                            alt="error img"
                                            onMouseOver={() => handleHoverImage(-item.product_id)}
                                        />
                                    ) : (
                                        <img
                                            className={'img-fluid ' + clsx(styles.itemThumbnail)}
                                            src={item.thumbnail[0]}
                                            alt="error img"
                                            onMouseOver={() => handleHoverImage(item.product_id)}
                                        />
                                    )}
                                </Link>
                            </div>
                            <div className={clsx(styles.botProduct)}>
                                <Link to={`/product/${item._id}`}>
                                    {item.name_product} / {item.color}
                                    <p>{item.price}</p>
                                </Link>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            <ScrollingToHeader />
        </>
    );
}

export default CategoryTrouser;
