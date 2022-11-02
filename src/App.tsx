import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, SpecificConversion } from './pages';

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/specificConversion" element={<SpecificConversion />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
