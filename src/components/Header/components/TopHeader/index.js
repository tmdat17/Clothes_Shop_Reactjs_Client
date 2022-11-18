import clsx from 'clsx';
import { Globe2, ArrowRightCircleFill } from 'react-bootstrap-icons';
import styles from './topheader.module.scss';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function TopHeader() {
    const classes = 'bg-black d-flex justify-content-between ' + clsx(styles.wrapperTopHeader, styles.textLight);

    return (
        <div className={classes}>
            <div className="ms-5">
                <i className={clsx(styles.icon)}>
                    <Globe2 />
                </i>
                <span> LEVENTS LOVE YOU!!!</span>
            </div>
            <div className="me-5 d-flex ">
                <Nav.Link as={Link} to="/shop" className="my-auto me-1">
                    {' '}
                    BUY NOW!
                </Nav.Link>
                <i className={clsx(styles.icon)}>
                    <ArrowRightCircleFill />
                </i>
            </div>
        </div>
    );
}

export default TopHeader;
