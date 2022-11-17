import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import ProductService from '../../services/ProductService';

import styles from './home.module.scss';
import { Row, Col } from 'react-bootstrap';
import Ratio from 'react-bootstrap/Ratio';
import videoAds from '~/assets/videos/clip-3-ban-ngang-web-.mp4';
import ScrollingToHeader from '~/components/ScrollingToHeader';

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    useEffect(() => {
        const getData = ProductService.getAllProduct;
        getData()
            .then((res) => setAllProducts(res.data))
            .catch((error) => console.log(error));
    }, []);

    const [show, setShow] = useState(0);
    const handleHoverImage = (pro_id) => {
        setShow(pro_id);
    };

    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Ratio aspectRatio="16x9">
                <video style={{ width: '100%', height: '100%' }} type="video/mp4" src={videoAds} autoPlay loop muted />
            </Ratio>

            <div className={clsx(styles.seeMoreOnVid, styles.btnOnVid)}>
                <Link to="/shop" className={'fs-5 ' + clsx(styles.btnSeeMore)}>
                    Levents New Collection!!
                </Link>
            </div>

            <h5 className={clsx(styles.title)}>NEW COLLECTION</h5>
            <Row className={clsx(styles.listProduct)}>
                {allProducts.map((item) => {
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
            <div className={clsx(styles.seeMore)}>
                <Link to="/shop" className={'fs-5 ' + clsx(styles.btnSeeMore)}>
                    Xem thêm
                </Link>
            </div>

            <ScrollingToHeader />
        </div>
    );
}

export default Home;
