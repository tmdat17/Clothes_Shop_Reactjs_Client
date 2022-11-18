/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './searchheader.module.scss';

const products = [
    {
        item: 'khác',
        link: '/shop',
    },
    {
        item: 'new arrival',
        link: '/shop',
    },
    {
        item: 'polo',
        link: '/category_polo',
    },
    {
        item: 'Hoodie',
        link: '/category_hoodie',
    },
    {
        item: 'T-shirt',
        link: '/category_tshirt',
    },
    {
        item: 'quần',
        link: '/category_trouser',
    },
    {
        item: 'tất cả',
        link: '/shop',
    },
];

const populars = [
    {
        item: 'Clothing',
        link: '/shop',
    },
    {
        item: 'Short',
        link: '/shop',
    },
    {
        item: 'T-shirt',
        link: '/category_tshirt',
    },
    {
        item: 'Jacket',
        link: '/shop',
    },
    {
        item: 'Sweater',
        link: '/shop',
    },
];

function SearchHeader({ displaySearch }) {
    const [contentFind, setContentFind] = useState('');
    const navigate = useNavigate();
    const handleFindInput = (content) => {
        let contentNeedFind = content.toLowerCase();
        if (
            contentNeedFind.includes('ao thun') ||
            contentNeedFind.includes('áo thun') ||
            contentNeedFind.includes('tshirt') ||
            contentNeedFind.includes('t-shirt')
        ) {
            navigate('/category_tshirt');
            setContentFind('');
            displaySearch();
            console.log('OK Search');
        } else if (
            contentNeedFind.includes('ao') ||
            contentNeedFind.includes('áo') ||
            contentNeedFind.includes('shirt')
        ) {
            navigate('/category_shirt');
            setContentFind('');
            displaySearch();
            console.log('OK Search');
        } else if (
            contentNeedFind.includes('ao polo') ||
            contentNeedFind.includes('áo polo') ||
            contentNeedFind.includes('áo có cổ') ||
            contentNeedFind.includes('polo')
        ) {
            navigate('/category_polo');
            setContentFind('');
            displaySearch();
            console.log('OK Search');
        } else if (
            contentNeedFind.includes('ao hoodie') ||
            contentNeedFind.includes('áo hoodie') ||
            contentNeedFind.includes('áo khoát') ||
            contentNeedFind.includes('áo khoác') ||
            contentNeedFind.includes('ao khoat') ||
            contentNeedFind.includes('ao khoac') ||
            contentNeedFind.includes('hoodie')
        ) {
            navigate('/category_hoodie');
            setContentFind('');
            displaySearch();
            console.log('OK Search');
        } else if (
            contentNeedFind.includes('quan dai') ||
            contentNeedFind.includes('quần dài') ||
            contentNeedFind.includes('trouser') ||
            contentNeedFind.includes('quan') ||
            contentNeedFind.includes('quần') ||
            contentNeedFind.includes('pants')
        ) {
            navigate('/category_trouser');
            setContentFind('');
            displaySearch();
            console.log('OK Search');
            return;
        }
    };

    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className="">
                    <ul className="d-flex flex-row flex-wrap">
                        {products.map((product, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={product.link}
                                        className={clsx(styles.serKey)}
                                        onClick={() => displaySearch()}
                                    >
                                        {product.item}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="">
                    <form action="GET">
                        <div className={' input-group mb-3 mx-md-auto flex-grow ' + clsx(styles.serForm)}>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search Top"
                                value={contentFind}
                                onChange={(e) => setContentFind(e.target.value)}
                            />
                            <button
                                onClick={() => handleFindInput(contentFind)}
                                className="btn btn-outline-secondary fs-4 text"
                                type="button"
                                id="button-addon2"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className={clsx(styles.tiltePop)}>POPULAR</div>
                    <ul className="d-flex flex-row flex-wrap">
                        {populars.map((popular, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={popular.link}
                                        className={clsx(styles.serPop)}
                                        onClick={() => displaySearch()}
                                    >
                                        {popular.item}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <hr />
        </>
    );
}

export default SearchHeader;
