import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const phoneNumber = "919100097900"; // From config
  const defaultMessage = "Hi Studios Weddingz! I'm interested in learning more about your photography services.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-noir-800 text-ivory text-sm font-inter px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg border border-ivory/10">
        Chat with us!
      </span>
      
      {/* Ripple Effect */}
      <span className="absolute w-full h-full rounded-full border border-[#25D366] animate-ping opacity-20" />
    </motion.button>
  );
};

export default WhatsAppWidget;
