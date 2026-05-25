import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { InstagramIcon as Instagram, YoutubeIcon as Youtube } from '../ui/BrandIcons';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Borns & Bumps', path: '/borns-and-bumps' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Films', path: '/films' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          isScrolled
            ? 'py-3 glass border-b border-white/5'
            : 'py-5 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
      >
        <div className="max-container section-padding flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 group">
            <span className="font-playfair text-xl md:text-2xl text-ivory tracking-wide">
              Studio<span className="text-gradient-gold">S</span>weddingz
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-inter text-sm tracking-wide transition-colors duration-300 group ${
                    isActive ? 'text-gold' : 'text-ivory/70 hover:text-ivory'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ease-luxury ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/build-quote"
              className="ml-4 px-6 py-2.5 bg-gradient-gold text-noir text-sm font-inter font-semibold tracking-wide rounded-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-400 hover:scale-105"
            >
              Build Your Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 p-2 text-ivory"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-noir/98 backdrop-blur-xl flex flex-col justify-center items-center"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-playfair text-3xl md:text-4xl transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-ivory/80 hover:text-gold'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  to="/build-quote"
                  className="mt-4 px-8 py-3 bg-gradient-gold text-noir font-inter font-semibold tracking-wide rounded-sm text-lg"
                >
                  Build Your Quote
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu footer */}
            <motion.div
              className="absolute bottom-12 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-ivory/50 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-ivory/50 hover:text-gold transition-colors">
                <Youtube size={20} />
              </a>
              <a href="tel:+919100097900" className="text-ivory/50 hover:text-gold transition-colors">
                <Phone size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
