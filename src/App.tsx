import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, SpecificConversion } from "./pages";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/specificConversion"
                            element={<SpecificConversion />}
                        />
                    </Routes>
                    <ToastContainer />
                </div>
            </Router>
        </>
    );
}

export default App;
