import { TopHeader, NavHeader } from './components';

function Header() {
    return (
        <div className="sticky-top ">
            <TopHeader />
            <NavHeader />
            <hr />
        </div>
    );
}

export default Header;
