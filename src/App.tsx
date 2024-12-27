import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Planets from './pages/Planets'
import About from './pages/About'
import { motion } from 'framer-motion'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-primary"
    >
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </motion.div>
  )
}

export default App
