import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyles from './components/GlobalStyles';
import Header from '~/components/Header';
import Footer from './components/Footer';

import { Home, AboutUs, Login, Signup } from '~/pages';

function App() {
    return (
        <GlobalStyles>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about_us" element={<AboutUs />} />
                    <Route path="my_account/login" element={<Login />} />
                    <Route path="my_account/sign_up" element={<Signup />} />
                </Routes>
                <Footer />
            </div>
        </GlobalStyles>
    );
}

export default App;
