/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import styles from './searchheader.module.scss';

const products = [
    {
        item: 'khác',
        link: '',
    },
    {
        item: 'new arrival',
        link: '',
    },
    {
        item: 'polo',
        link: '',
    },
    {
        item: 'Tee',
        link: '',
    },
    {
        item: 'Hoodie',
        link: '',
    },
    {
        item: 'T-shirt',
        link: '',
    },
    {
        item: 'quần',
        link: '',
    },
    {
        item: 'Shortpants',
        link: '',
    },
    {
        item: 'tất cả',
        link: '',
    },
];

const populars = [
    {
        item: 'Clothing',
        link: '',
    },
    {
        item: 'Short',
        link: '',
    },
    {
        item: 'T-shirt',
        link: '',
    },
    {
        item: 'Jacket',
        link: '',
    },
    {
        item: 'Sweater',
        link: '',
    },
];

function SearchHeader() {
    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className="">
                    <ul className="d-flex flex-row flex-wrap">
                        {products.map((product, index) => {
                            return (
                                <li key={index}>
                                    <a className={clsx(styles.serKey)} href="#">
                                        {product.item}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="">
                    <form action="GET">
                        <div className={' input-group mb-3 mx-md-auto flex-grow ' + clsx(styles.serForm)}>
                            <input type="search" className="form-control" placeholder="Search Top" />
                            <button className="btn btn-outline-secondary fs-4 text" type="button" id="button-addon2">
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
                                    <a className={clsx(styles.serPop)} href="#">
                                        {popular.item}
                                    </a>
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
