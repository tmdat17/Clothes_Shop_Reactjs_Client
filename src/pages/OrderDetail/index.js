import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import OrderService from '~/services/OrderService';

const orderColumns = [
    {
        field: 'product',
        headerName: 'ID PRODUCT',
        width: 280,
    },
    {
        field: 'nameProduct',
        headerName: 'Name Product',
        width: 380,
    },
    {
        field: 'size',
        headerName: 'Size',
        width: 180,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 250,
    },
    {
        field: 'quatity',
        headerName: 'Quatity',
        width: 130,
    },
];

function OrderDetail() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
    }, []);
    useEffect(() => {
        document.title = 'Chi tiết đơn hàng';
    }, []);
    const [data, setData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const getData = OrderService.getOneOrder;
        getData(id)
            .then((res) => {
                let temp = [];
                res.data.orderDetails.map((item, index) => {
                    temp.push({ id: index, ...item });
                });

                return setData(temp);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <>
            <div style={{ height: '20rem' }}>
                <h2 className={' text-dark mx-3 my-3 '}>Chi tiết đơn hàng</h2>
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={orderColumns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default OrderDetail;
