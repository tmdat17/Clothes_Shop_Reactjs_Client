import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './error404.module.scss';
function Error404() {
    useEffect(() => {
        document.title = 'Page not found';
    }, []);
    return (
        <div className={clsx(styles.errorContainer)}>
            <div className={clsx(styles.content)}>
                <p className={styles.title}>404</p>
                <p className={styles.revise}>Trang này không tồn tại. Vui lòng quay lại trang chủ!!</p>
                <Link to="/" className={styles.btnBackHome}>
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}

export default Error404;
