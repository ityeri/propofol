import {BrowserRouter, Route, Routes} from "react-router";
import {AnimatePresence} from "framer-motion";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    )
}

export default App
