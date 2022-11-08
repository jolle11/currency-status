import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, SpecificConversion } from './pages';

// TOASTIFY
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/specificConversion" element={<SpecificConversion />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </Router>
        </>
    );
}

export default App;
