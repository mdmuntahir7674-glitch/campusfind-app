import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ItemsProvider } from './context/ItemsContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Application Pages
import Home from './pages/Home'
import Browse from './pages/Browse'
import Report from './pages/Report'
import Dashboard from './pages/Dashboard'
import ItemDetails from './pages/ItemDetails'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ItemsProvider>
        <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F4F4F5] antialiased selection:bg-[#C6F36B] selection:text-[#09090B]">
          {/* Sticky Navigation Header */}
          <Navbar />

          {/* Main Router Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/report" element={<Report />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </ItemsProvider>
    </BrowserRouter>
  )
}