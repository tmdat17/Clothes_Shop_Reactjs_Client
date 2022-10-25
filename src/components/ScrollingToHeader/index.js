import { useEffect, useState, memo } from 'react';
import { ChevronDoubleUp } from 'react-bootstrap-icons';
import clsx from 'clsx';
import styles from './scrollingtoheader.module.scss';
function ScrollingToHeader() {
    const [showGoToTop, setShowGoToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 180) {
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
            {showGoToTop && (
                <a href="#" className={clsx(styles.btnBackHeader)}>
                    <ChevronDoubleUp style={{ fontSize: 20, marginTop: '7px', marginLeft: '8px' }} />
                </a>
            )}
            {console.log('component scrolling    ')}
        </>
    );
}

export default memo(ScrollingToHeader);
