import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import heroWedding from '../../../assets/images/hero-wedding.png';

const BookingCTA = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroWedding} alt="Booking" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-noir/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center section-padding">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cormorant text-gold text-sm md:text-base uppercase tracking-[0.4em] mb-6"
        >
          Book Your Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-display-lg text-ivory mb-8 max-w-4xl text-balance"
        >
          Let's Create Something Beautiful Together
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button to="/build-quote" variant="primary" size="lg" icon>
            Build Your Quote
          </Button>
          <Button to="/contact" variant="white" size="lg" icon>
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;
