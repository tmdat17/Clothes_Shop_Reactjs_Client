import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './about_us.module.scss';
import { Row, Col, Container } from 'react-bootstrap';
import { ChevronDoubleUp } from 'react-bootstrap-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import banner_1 from '~/assets/banner_girl_1.jpg';
import banner_2 from '~/assets/banner_girl_2.jpg';
import banner_3 from '~/assets/banner_girl_3.png';

import ScrollingToHeader from '~/components/ScrollingToHeader';
function AboutUs() {
    useEffect(() => {
        document.title = 'Về chúng tôi';
    }, []);

    return (
        <>
            <div className="mt-3 ms-3 ">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                        Trang chủ
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Về chúng tôi</Breadcrumb.Item>
                </Breadcrumb>
                <h2 className="fs-4 fw-normal text-center text-uppercase">Về chúng tôi</h2>
                <h3 className="fs-3 fw-normal text text-center mb-4 mb-sm-4 mb-md-5 mt-2 mt-sm-5 mt-md-5">
                    Levents® - Popular Streetwear brand
                </h3>
                <div className="d-flex justify-content-center w-100">
                    <p className="fw-light fs-6 text text-wrap text-center" style={{ width: '32rem' }}>
                        Chúng tôi là thương hiệu thời trang Streetwear nổi tiếng với định hướng cung cấp sản phẩm có
                        chất lượng cao, sành điệu với giá thành hợp lý.
                    </p>
                </div>
                <div className="introduce-shop">
                    <div
                        className="d-flex flex-row align-center justify-content-center"
                        style={{ marginLeft: '-20px' }}
                    >
                        <img src={banner_1} alt="banner-girl" className="img-fluid " />
                    </div>
                    <Container fluid>
                        <Row className={clsx(styles.blockIntro)}>
                            <Col xs={12} sm={12} md={6} className={' text mb-4 mb-sm-3 ' + clsx(styles.titleWe)}>
                                <h1 style={{ fontWeight: '300' }}>Chúng tôi là ai?</h1>
                            </Col>
                            <Col xs={12} sm={12} md={6} className={'fs-6 text text-center ' + clsx(styles.introWe)}>
                                <p className="text-start text-wrap" style={{ width: '25rem' }}>
                                    Levents® là lựa chọn hàng đầu dành cho các tín đồ thời trang Streetwear sành điệu.
                                    Sứ mệnh của Levents® là trao quyền cho thế hệ trẻ toàn thế giới tự do thể hiện phong
                                    cách thông qua thời trang, thương hiệu vượt qua ranh giới của thời trang streetwear
                                    bằng cách không ngừng sáng tạo các trang phục với các bộ sưu tập độc đáo.
                                </p>
                            </Col>
                        </Row>
                    </Container>{' '}
                    {/*  end introduce-1 */}
                    <div
                        className="d-flex flex-row align-center justify-content-center"
                        style={{ marginLeft: '-20px' }}
                    >
                        <img src={banner_2} alt="banner-girl" className="img-fluid " />
                    </div>
                    <Container fluid>
                        <Row className={styles.blockIntro}>
                            <Col xs={12} sm={12} md={6} className={' text mb-4 mb-sm-3 ' + clsx(styles.titleWe)}>
                                <h1 style={{ fontWeight: '300' }}>Chất lượng trải nghiệm vượt trội</h1>
                            </Col>
                            <Col xs={12} sm={12} md={6} className={'fs-6 text text-center ' + clsx(styles.introWe)}>
                                <p className="text-start text-wrap" style={{ width: '25rem' }}>
                                    Chúng tôi không ngừng nỗ lực, tập trung vào chất lượng sản phẩm và trải nghiệm mua
                                    sắm vượt trội nhất chưa từng có trước đây, các cửa hàng vật lý của chúng tôi, tối ưu
                                    hóa trải nghiệm, giúp người dùng mua sắm một sản phẩm cao cấp thật sự. Mua sắm
                                    online dễ dàng, đa nền tảng trải nghiệm tuyệt vời. Giá thành hợp lý. Điều này đã
                                    giải quyết bài toán để bạn vừa cân đối khả năng tài chính, vừa đáp ứng hoàn hảo cho
                                    nhu cầu thời trang của bạn và xu hướng nhanh của thời đại.
                                </p>
                            </Col>
                        </Row>
                    </Container>{' '}
                    {/*  end introduce-2 */}
                    <div
                        className="d-flex flex-row align-center justify-content-center"
                        style={{ marginLeft: '-20px' }}
                    >
                        <img src={banner_3} alt="banner-girl" className="img-fluid " />
                    </div>
                    <Container fluid>
                        <Row className={clsx(styles.blockIntro)}>
                            <Col xs={12} sm={12} md={6} className={' text mb-4 mb-sm-3 ' + clsx(styles.titleWe)}>
                                <h1 style={{ fontWeight: '300' }}>
                                    Biểu tượng thời trang thời đại mới Fashion icon for young generation
                                </h1>
                            </Col>
                            <Col xs={12} sm={12} md={6} className={'fs-6 text text-center ' + clsx(styles.introWe)}>
                                <p className="text-start text-wrap" style={{ width: '25rem' }}>
                                    Tại Levents®, mỗi sản phẩm đều mang theo sự cá tính và sành điệu, đại diện cho hình
                                    ảnh giới trẻ hiện đại - biểu tượng cho sự dẫn đầu phong cách thời đại mới. <br />{' '}
                                    <br />
                                    Quần áo có thể sẽ lỗi thời nhưng phong cách thời trang thì không. Tầm nhìn độc đáo
                                    của Levents® chính là để mỗi cá nhân tự do thể hiện phong cách khi khoác lên mình
                                    những sản phẩm được tạo nên từ sự đam mê, mang giá trị của thế hệ mới, đầy trẻ
                                    trung, năng động và luôn không ngừng khẳng định bản thân, hướng đến tương lai.{' '}
                                    <br /> <br />
                                    Sự đầu tư từ chất lượng đóng gói, bao bì sản phẩm đến mỗi thước phim, hình ảnh cho
                                    tới cách làm chủ được nghệ thuật sắc màu và chỉn chu trong từng chi tiết đã đưa
                                    Levents® trở thành một trong những thương hiệu thời trang Streetwear được giới trẻ
                                    yêu thích, tin dùng hàng đầu tại Việt Nam.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <ScrollingToHeader />
        </>
    );
}

export default AboutUs;
