import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
function Shop() {
    useEffect(() => {
        document.title = 'Shop';
    }, []);
    return (
        <>
            <div className="ms-3 mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs="li" as={Link} to={'/'}>
                        Trang chủ
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Shop</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Danh sách các sản phẩm của shop</h1>
            </div>
        </>
    );
}

export default Shop;
