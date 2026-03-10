import {Route, Routes} from "react-router";
import {AnimatePresence} from "framer-motion";
import Home from "./pages/Home";
import {RainyDayPage} from "@/pages/RainyDayPage";
import {useLocation} from "react-router-dom";

function App() {
    const location = useLocation()

    return (
        <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/rainy" element={<RainyDayPage/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default App
