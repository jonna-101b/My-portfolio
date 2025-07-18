import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
        return (
                <div className="app">
                        <BrowserRouter>
                                <Navbar />

                                <div className="pages">
                                        <Routes>
                                                {/* <Route path="/" element={<Home />} /> */}
                                        </Routes>
                                </div>

                                <Footer />
                        </BrowserRouter>
                </div>
        )
}

export default App;