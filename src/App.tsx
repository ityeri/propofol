import { Route, Routes } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import { RainyDayPage } from '@/pages/RainyDayPage'
import { useLocation } from 'react-router-dom'
import AboutMePage from '@/pages/AboutMePage'

function App() {
    const location = useLocation()

    return (
        <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/rainy" element={<RainyDayPage />} />
                <Route path="/about" element={<AboutMePage />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App
