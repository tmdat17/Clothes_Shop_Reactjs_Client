import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyles from './components/GlobalStyles';
import Header from '~/components/Header';
import Footer from './components/Footer';

import {
    Home,
    AboutUs,
    Login,
    Signup,
    Shop,
    Product,
    Cart,
    User,
    UpdateUser,
    CategoryTShirt,
    CategoryPolo,
    CategoryTrouser,
    CategoryHoodie,
    CategoryShirt,
    OrderOfUser,
    OrderDetail,
    PageCoding,
    Error404,
} from '~/pages';

import { CartContext } from './Contexts/CartContext';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    const [myCart, setMyCart] = useState([{}]);

    return (
        <Provider store={store}>
            <CartContext.Provider value={{ myCart, setMyCart }}>
                <Router>
                    <GlobalStyles>
                        <div className="App">
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about_us" element={<AboutUs />} />
                                <Route path="/user" element={<User />} />
                                <Route path="/order_user" element={<OrderOfUser />} />
                                <Route path="/order_detail/:id" element={<OrderDetail />} />
                                <Route path="/update/:id" element={<UpdateUser />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/sign_up" element={<Signup />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/category_shirt" element={<CategoryShirt />} />
                                <Route path="/category_tshirt" element={<CategoryTShirt />} />
                                <Route path="/category_polo" element={<CategoryPolo />} />
                                <Route path="/category_hoodie" element={<CategoryHoodie />} />
                                <Route path="/category_trouser" element={<CategoryTrouser />} />
                                <Route path="/product/:id" element={<Product />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/page_loading" element={<PageCoding />} />
                                <Route path="*" element={<Error404 />} />
                            </Routes>
                            <Footer />
                        </div>
                    </GlobalStyles>
                </Router>
            </CartContext.Provider>
        </Provider>
    );
}

export default App;
