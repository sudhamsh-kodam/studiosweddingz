import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Phone } from 'lucide-react';
import Button from './Button';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if we've already shown it this session to avoid annoying the user
    const hasShown = sessionStorage.getItem('exitIntentShown');
    
    if (hasShown) return;

    const handleMouseLeave = (e) => {
      // If mouse leaves from the top of the window (clientY <= 0), it's an exit intent
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        // Remove listener once triggered
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Delay adding the listener so it doesn't trigger immediately on load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || isSubmitting || submitted) return;
    
    setIsSubmitting(true);
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby605S3bhvZiQ0DmRKWUhgveSH2LrwO7gdlwEP0G9H0kXWbk4qIKq9u-lnUmytVpOJDiw/exec';
      const formData = new FormData();
      formData.append('Name', 'Exit Intent Offer (10% Off)'); // Identifier for the sheet
      formData.append('Phone', phoneNumber);
      formData.append('EventDate', 'Not specified');

      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
    } catch (error) {
      console.error("Failed to save exit intent lead:", error);
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Optional: Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const closePopup = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-noir/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-noir-900 border border-gold/20 p-8 md:p-12 max-w-lg w-full text-center overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/50" />

            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-ivory/50 hover:text-gold transition-colors"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <Sparkles className="text-gold mx-auto mb-6" size={32} />
                <h2 className="font-playfair text-3xl md:text-4xl text-ivory mb-4">Wait! Before you go...</h2>
                <p className="text-ivory/60 font-inter text-sm mb-8 leading-relaxed">
                  We noticed you haven't completed your quote. Leave your WhatsApp number and our lead photographer will reach out with a <span className="text-gold font-medium">complimentary consultation</span> to discuss your vision.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30" size={16} />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Your WhatsApp Number"
                      className="w-full bg-noir border border-ivory/20 rounded-sm py-3 pl-12 pr-4 text-ivory placeholder:text-ivory/30 font-inter focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Get Free Consultation'}
                  </Button>
                </form>
                <p className="text-[10px] text-ivory/30 font-inter mt-4">We respect your privacy. No spam, just beautiful photography.</p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-10"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-gold" size={32} />
                </div>
                <h3 className="font-playfair text-2xl text-ivory mb-2">Thank You</h3>
                <p className="text-ivory/60 font-inter text-sm">We've received your details. Our team will contact you on WhatsApp shortly!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Quick Check icon component since we only need it here for the success state
const Check = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ExitIntentPopup;
