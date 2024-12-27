import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
                <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Solar Explorer
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" isActive={isActive('/')}>Home</NavLink>
            <NavLink to="/planets" isActive={isActive('/planets')}>Planets</NavLink>
            <NavLink to="/about" isActive={isActive('/about')}>About</NavLink>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pb-3 space-y-1">
            <MobileNavLink to="/" isActive={isActive('/')} onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/planets" isActive={isActive('/planets')} onClick={() => setIsOpen(false)}>
              Planets
            </MobileNavLink>
            <MobileNavLink to="/about" isActive={isActive('/about')} onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => (
  <Link
    to={to}
    className={`relative px-3 py-2 transition-colors duration-200 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
    {isActive && (
      <motion.div
        layoutId="underline"
        className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500"
      />
    )}
  </Link>
)

const MobileNavLink = ({ 
  to, 
  children, 
  isActive,
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-3 py-2 rounded-md ${
      isActive 
        ? 'bg-blue-500/10 text-blue-500' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    {children}
  </Link>
)

export default Navbar
