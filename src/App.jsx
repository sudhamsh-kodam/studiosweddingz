import { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import LoadingScreen from './components/ui/LoadingScreen';
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import ExitIntentPopup from './components/ui/ExitIntentPopup';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Films = lazy(() => import('./pages/Films'));
const BuildQuote = lazy(() => import('./pages/BuildQuote'));
const BornsAndBumps = lazy(() => import('./pages/BornsAndBumps'));
const Contact = lazy(() => import('./pages/Contact'));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-noir">
    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/films" element={<Films />} />
          <Route path="/borns-and-bumps" element={<BornsAndBumps />} />
          <Route path="/build-quote" element={<BuildQuote />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <SmoothScroll>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <WhatsAppWidget />
          <ExitIntentPopup />
        </SmoothScroll>
      )}
    </Router>
  );
}

export default App;
