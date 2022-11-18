import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './pagecoding.module.scss';
function PageCoding() {
    useEffect(() => {
        document.title = 'Page not found';
    }, []);
    return (
        <div className={clsx(styles.errorContainer)}>
            <div className={clsx(styles.content)}>
                <p className={styles.title}>Updating</p>
                <p className={styles.revise}>Trang đang được nâng cấp. Vui lòng quay lại trang chủ!!</p>
                <Link to="/" className={styles.btnBackHome}>
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}

export default PageCoding;
