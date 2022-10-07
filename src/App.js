import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyles from './components/GlobalStyles';
import Header from '~/components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
function App() {
    return (
        <GlobalStyles>
            <div className="App">
                <Header />

                {/* <h1 style={{ height: 800 }}>Content</h1> */}
                <Home />

                <Footer />
            </div>
        </GlobalStyles>
    );
}

export default App;
