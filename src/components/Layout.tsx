import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HeartPulse, MessageCircle, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { departmentsData } from '../constants';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello,%20I%20am%20looking%20for%20medical%20tourism%20assistance.', '_blank');
  };

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-teal-200 dark:selection:bg-teal-900 flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 dark:bg-stone-950/90 backdrop-blur-md z-50 border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-bold tracking-tight text-teal-900 dark:text-teal-50">Heal<span className="text-amber-600 dark:text-amber-500">&</span>Explore</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors">Home</Link>
              
              {/* Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors py-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                >
                  Specialties <ChevronDown className="h-4 w-4" />
                </button>
                
                {isDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 w-64 bg-white dark:bg-stone-900 shadow-xl border border-stone-100 dark:border-stone-800 rounded-2xl py-2 overflow-hidden"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {Object.values(departmentsData).map((dept) => (
                      <Link 
                        key={dept.id} 
                        to={`/department/${dept.id}`}
                        className="block px-4 py-3 text-sm text-stone-700 dark:text-stone-300 hover:bg-teal-50 dark:hover:bg-stone-800 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                      >
                        {dept.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/#how-it-works" className="text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors">How it Works</Link>
              
              <button 
                onClick={toggleTheme}
                className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button 
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-sm shadow-green-500/30"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 dark:text-stone-300">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 pt-2 pb-4 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-md">Home</Link>
            <div className="px-3 py-2 text-base font-medium text-stone-900 dark:text-stone-100">Specialties</div>
            <div className="pl-6 space-y-1">
              {Object.values(departmentsData).map((dept) => (
                <Link 
                  key={dept.id} 
                  to={`/department/${dept.id}`}
                  className="block px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-md"
                >
                  {dept.name}
                </Link>
              ))}
            </div>
            <Link to="/#how-it-works" className="block px-3 py-2 text-base font-medium text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-md">How it Works</Link>
            <button 
              onClick={handleWhatsApp}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse className="h-6 w-6 text-teal-500" />
                <span className="text-xl font-bold tracking-tight text-white">Heal<span className="text-amber-500">&</span>Explore</span>
              </div>
              <p className="max-w-sm mb-6">
                Your trusted partner for medical tourism in India. We combine world-class healthcare with unforgettable travel experiences.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Specialties</h4>
              <ul className="space-y-2">
                {Object.values(departmentsData).slice(0, 4).map(dept => (
                  <li key={dept.id}><Link to={`/department/${dept.id}`} className="hover:text-teal-400 transition-colors">{dept.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Heal & Explore India. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Medical Tourists worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
