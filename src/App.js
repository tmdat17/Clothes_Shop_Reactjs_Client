import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyles from './components/GlobalStyles';
import Header from '~/components/Header';
import Footer from './components/Footer';

import { Home, AboutUs, Login, Signup, Shop, Product, Cart, Error404 } from '~/pages';

import { CartContext } from './Contexts/CartContext';
function App() {
    const [myCart, setMyCart] = useState([{}]);
    return (
        <CartContext.Provider value={{ myCart, setMyCart }}>
            <Router>
                <GlobalStyles>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about_us" element={<AboutUs />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign_up" element={<Signup />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                        <Footer />
                    </div>
                </GlobalStyles>
            </Router>
        </CartContext.Provider>
    );
}

export default App;
