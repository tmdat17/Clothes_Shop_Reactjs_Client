import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import UserService from '~/services/UserService.js';
import styles from './OrderOfUser.module.scss';
import clsx from 'clsx';
function OrderOfUser() {
    const [detailUser, setDetailUser] = useState({});
    const [rowOrders, setRowOrders] = useState([]);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
    }, []);
    useEffect(() => {
        document.title = 'Lịch sử đặt hàng';
    }, []);
    useEffect(() => {
        const getData = UserService.getOneUser;
        getData(user?._id)
            .then((res) => {
                console.log('userDetail: ', res.data);
                setDetailUser(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setRowOrders([]);
        detailUser?.orders?.map((item) => {
            setRowOrders((prev) => [...prev, item]);
        });
    }, [detailUser]);
    const handleView = (orderId) => {
        navigate(`/order_detail/${orderId}`);
    };
    return (
        <>
            <h2 className={' text-dark mx-3 my-3 '}>Danh sách các đơn hàng</h2>
            {detailUser?.orders?.length > 0 ? (
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="tableCell">Order ID</TableCell>
                                <TableCell className="tableCell">Phone</TableCell>
                                <TableCell className="tableCell">Receiver Name</TableCell>
                                <TableCell className="tableCell">Address</TableCell>
                                <TableCell className="tableCell">Total Price</TableCell>
                                <TableCell className="tableCell">Payment Method</TableCell>
                                <TableCell className="tableCell">Status</TableCell>
                                <TableCell className="tableCell">Order Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowOrders?.map((row) => (
                                <TableRow
                                    key={row._id}
                                    className={clsx(styles.tableRow)}
                                    onClick={() => handleView(row._id)}
                                >
                                    <TableCell className="tableCell">{row._id}</TableCell>
                                    <TableCell className="tableCell">{row.phone}</TableCell>
                                    <TableCell className="tableCell">{row.receiverName}</TableCell>
                                    <TableCell className="tableCell">{row.address}</TableCell>
                                    <TableCell className="tableCell">{row.totalPrice}</TableCell>
                                    <TableCell className="tableCell">{row.methodPayment}</TableCell>
                                    <TableCell className="tableCell">
                                        <span className={`status ${row.status}`}>{row.status}</span>
                                    </TableCell>
                                    <TableCell className="tableCell">{row.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h1>Chưa có đơn đặt hàng!!</h1>
            )}
        </>
    );
}

export default OrderOfUser;
