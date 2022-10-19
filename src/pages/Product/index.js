import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Plus, Dash, ChevronDoubleUp, ChevronDown } from 'react-bootstrap-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Scrollbar, Autoplay, FreeMode, Thumbs, EffectFade } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import clsx from 'clsx';
import styles from './product.module.scss';

import { CartContext } from '../../Contexts/CartContext';
import ProductService from '~/services/ProductService';
function Product() {
    // State detail product
    const [product, setProduct] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quatity, setQuatity] = useState(1);
    const [size, setSize] = useState('');

    // Show
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [showInfor, setShowInfor] = useState(false);
    const [showSizeBoard, setShowSizeBoard] = useState(false);
    const [showReturnPolicy, setShowReturnPolicy] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(0);

    const { id } = useParams();
    const [idProduct, setIdProduct] = useState(id);
    const { myCart, setMyCart } = useContext(CartContext);
    useEffect(() => {
        const getDataAllProduct = ProductService.getAllProduct;
        const getData = ProductService.getOneProduct(idProduct);
        getData
            .then((res) => {
                setProduct(res.data);
                document.title = res.data.name_product;
            })
            .catch((error) => console.log(error));

        getDataAllProduct()
            .then((res) => setAllProducts(res.data))
            .catch((error) => console.log(error));
    }, [idProduct]);

    const increaseQuatity = () => {
        return setQuatity((prev) => {
            if (prev >= 100) return prev;
            else return prev + 1;
        });
    };

    const decreaseQuatity = () => {
        return setQuatity((prev) => {
            if (prev <= 1) return prev;
            else return prev - 1;
        });
    };

    const changeQuatity = (e) => {
        return setQuatity((prev) => {
            let quatity = Number(e.target.value);
            if (isNaN(quatity)) quatity = prev;
            else if (quatity >= 100) quatity = 100;
            else if (quatity < 1) quatity = 1;
            return (prev = quatity);
        });
    };

    const changeSize = (e) => {
        console.log('size trong changeSize attri name:  ', e.target.value);
        setSize(e.target.value);
    };

    const addToCart = () => {
        if (size === '') {
            alert('Size là trường bắt buộc chọn');
            return;
        }
        const newItem = {
            id,
            name: product.name_product,
            img: product.thumbnail[0],
            size: size,
            quatity: quatity,
        };
        return setMyCart((prev) => [...prev, newItem]);
    };
    console.log('myCart:    ', myCart);
    const toggleInfor = () => {
        return setShowInfor(!showInfor);
    };

    const toggleSizeBoard = () => {
        return setShowSizeBoard(!showSizeBoard);
    };

    const toggleReturnPolicy = () => {
        return setShowReturnPolicy(!showReturnPolicy);
    };

    const handleHoverImage = (pro_id) => {
        setShowThumbnail(pro_id);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 280) {
                //show
                setShowGoToTop(true);
            } else {
                //hide
                setShowGoToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        //cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Breadcrumb id="head">
                <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item linkAs="li" as={Link} to={'/shop'} style={{ width: '4rem' }}>
                    Shop
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{product.name_product}</Breadcrumb.Item>
            </Breadcrumb>

            <Container fluid>
                <Row className="mb-5">
                    <Col xs={12} sm={12} md={6} className="">
                        <Row>
                            <Col xs={12} sm={12} md={4}>
                                <Swiper
                                    modules={[FreeMode, Thumbs, Scrollbar, Mousewheel]}
                                    onSwiper={setThumbsSwiper}
                                    scrollbar={{ el: '.swiper-scrollbar', draggable: true }}
                                    direction={'vertical'}
                                    autoplay={true}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    mousewheel={true}
                                    style={{
                                        width: 100,
                                        height: 580,
                                    }}
                                >
                                    {product.galerys && product.galerys.length > 0
                                        ? product.galerys.map((item, index) => {
                                              return (
                                                  <SwiperSlide key={index}>
                                                      <img
                                                          className="img-fluid"
                                                          src={item.image_url}
                                                          style={{ height: 100, width: 100 }}
                                                          alt="error swiper slide"
                                                      />
                                                  </SwiperSlide>
                                              );
                                          })
                                        : null}
                                </Swiper>
                            </Col>
                            <Col xs={12} sm={12} md={8}>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': 'blue',
                                        '--swiper-pagination-color': 'blue',
                                        height: 500,
                                    }}
                                    spaceBetween={10}
                                    autoplay={true}
                                    loop={true}
                                    direction={'vertical'}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    effect={'fade'}
                                    mousewheel={true}
                                    modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectFade, Mousewheel]}
                                    className="mySwiper2"
                                >
                                    {product.galerys && product.galerys.length > 0
                                        ? product.galerys.map((item, index) => {
                                              return (
                                                  <SwiperSlide key={index}>
                                                      <img className="img-fluid" src={item.image_url} />
                                                  </SwiperSlide>
                                              );
                                          })
                                        : null}
                                </Swiper>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="">
                        <ul className={clsx(styles.detailProduct)}>
                            <li className={clsx(styles.nameProduct)}>{product.name_product}</li>
                            <li className={clsx(styles.price)}>{product.price}</li>
                            <li className={clsx(styles.color)}>
                                Màu sắc: {product.color}
                                {product.thumbnail && product.thumbnail.length > 0 ? (
                                    <img src={product.thumbnail[0]} alt="color_img" />
                                ) : null}
                            </li>
                            <li>
                                Size:
                                <select
                                    className={clsx(styles.formSize)}
                                    name="size"
                                    required={true}
                                    onClick={(e) => changeSize(e)}
                                >
                                    <option value="" disabled="">
                                        Chọn Size
                                    </option>
                                    {product.size && product.size.length > 0
                                        ? product.size.map((item, index) => {
                                              return (
                                                  <option key={index} value={item} disabled="">
                                                      SIZE {item}
                                                  </option>
                                              );
                                          })
                                        : null}
                                </select>
                            </li>
                            <li>
                                <div className={clsx(styles.quatity)}>
                                    Số lượng:
                                    <button className={clsx(styles.decreaseBtn)} onClick={decreaseQuatity}>
                                        <Dash />
                                    </button>
                                    <input
                                        type="text"
                                        value={quatity}
                                        min="0"
                                        max="100"
                                        onChange={(e) => changeQuatity(e)}
                                        style={{ textAlign: 'center' }}
                                    />
                                    <button className={clsx(styles.increaseBtn)} onClick={increaseQuatity}>
                                        <Plus />
                                    </button>
                                </div>
                            </li>
                            <li>
                                <button className={clsx(styles.addProduct)} onClick={addToCart}>
                                    Thêm vào giỏ hàng
                                </button>
                            </li>
                        </ul>
                        <hr />
                        <div className={clsx(styles.inforWrapper)} onClick={toggleInfor}>
                            <div className={clsx(styles.inforHead)}>
                                <h5>Thông tin</h5>
                                <ChevronDown style={{ marginTop: 10 }} />
                            </div>
                            {showInfor && (
                                <div className={clsx(styles.inforContent)}>
                                    <p>{product.name_product}</p>
                                    <p>{product.description}</p>
                                    <p>
                                        SIZE:{' '}
                                        {product.size.map((item, index) => (
                                            <span key={index}>
                                                {item} {'  '}
                                            </span>
                                        ))}
                                    </p>
                                    <p>
                                        Sản phẩm thuộc Special Collection “Make everything popular” DORAEMON | LEVENTS®
                                    </p>
                                </div>
                            )}
                        </div>
                        <hr />
                        <div className={clsx(styles.sizeBoardWrapper)} onClick={toggleSizeBoard}>
                            <div className={clsx(styles.sizeBoardHead)}>
                                <h5>Bảng size</h5>
                                <ChevronDown style={{ marginTop: 10 }} />
                            </div>
                            {showSizeBoard && (
                                <div className={clsx(styles.sizeBoardContent)}>
                                    <p>
                                        Form áo được Fit size theo form và tiêu chuẩn tương đối của người Việt Nam, nếu
                                        bạn đang cân nhắc giữa hai size, nên chọn size lớn hơn.
                                    </p>
                                    <p>Size 1: Chiều cao từ 1m50 – 1m65, cân nặng trên 55kg</p>
                                    <p>Size 2: Chiều cao từ 1m65 – 1m72, cân nặng dưới 65kg</p>
                                    <p>Size 3: Chiều cao từ 1m70 – 1m77, cân nặng dưới 80kg</p>
                                    <p>Size 4: Chiều cao trên 1m72, cân nặng dưới 95kg.</p>
                                    <img
                                        src="https://levents.asia/wp-content/uploads/2022/09/Website-Popular-cat-tee-Mau-xam-100.jpg"
                                        alt="error img size board"
                                    />
                                    <img
                                        src="https://levents.asia/wp-content/uploads/2022/09/Website-Popular-cat-tee-Mau-kem-100.jpg"
                                        alt="error img size board"
                                    />
                                </div>
                            )}
                        </div>
                        <hr />
                        <div className={clsx(styles.returnPolicyWrapper)} onClick={toggleReturnPolicy}>
                            <div className={clsx(styles.returnPolicyHead)}>
                                <h5>Quy định đổi trả</h5>
                                <ChevronDown style={{ marginTop: 10 }} />
                            </div>
                            {showReturnPolicy && (
                                <div className={clsx(styles.returnPolicyContent)}>
                                    <p>
                                        Nhằm mang lại cho bạn sự tiện lợi và những trải nghiệm tuyệt vời khi mua hàng,
                                        tụi mình đã phát triển dịch vụ đổi hàng tận nơi và chính sách bảo hành.
                                    </p>
                                    <p>
                                        Tham khảo thêm thông tin về chính sách <a href="#">tại đây</a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <hr />

                {/* slider co the ban se thich  */}
                <div>
                    <h5 style={{ fontWeight: 400, textAlign: 'center', margin: '0 0 4rem 0' }}>Có thể bạn sẽ thích</h5>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        autoplay={true}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                    >
                        {allProducts && allProducts.length > 0
                            ? allProducts.map((item, index) => {
                                  return (
                                      <SwiperSlide
                                          key={index}
                                          className="text-center"
                                          onClick={() => setIdProduct(item._id)}
                                      >
                                          {showThumbnail === item.product_id ? (
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
                                      </SwiperSlide>
                                  );
                              })
                            : null}
                    </Swiper>
                </div>
            </Container>
            {showGoToTop && (
                <a href="#head" className={clsx(styles.btnBackHeader)}>
                    <ChevronDoubleUp style={{ fontSize: 20, marginTop: '7px', marginLeft: '8px' }} />
                </a>
            )}
        </>
    );
}

export default Product;
