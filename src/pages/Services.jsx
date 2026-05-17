import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import SectionHeading from '../components/ui/SectionHeading';
import FAQAccordion from '../components/ui/FAQAccordion';
import Button from '../components/ui/Button';
import GoldDivider from '../components/ui/GoldDivider';
import { services } from '../data/services';
import { Check } from 'lucide-react';
import heroWedding from '../assets/images/hero-wedding.png';
import heroMaternity from '../assets/images/hero-maternity.png';
import heroNewborn from '../assets/images/hero-newborn.png';
import heroKids from '../assets/images/hero-kids.png';
import heroFashion from '../assets/images/hero-fashion.png';

const imageMap = {
  wedding: heroWedding,
  maternity: heroMaternity,
  newborn: heroNewborn,
  milestone: heroKids,
  fashion: heroFashion,
};

const Services = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [hash]);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={heroWedding} alt="Services" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">What We Offer</p>
            <h1 className="font-playfair text-display-lg text-ivory">Our Services</h1>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding-y ${index % 2 === 0 ? 'bg-noir' : 'bg-noir-900'} scroll-mt-24`}
        >
          <div className="max-container section-padding">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={index % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <div className="aspect-[4/5] rounded-sm overflow-hidden hover-zoom">
                  <img src={imageMap[service.id]} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={index % 2 !== 0 ? 'lg:order-1' : ''}
              >
                <p className="font-cormorant text-gold text-sm uppercase tracking-[0.3em] mb-3">{service.tagline}</p>
                <h2 className="font-playfair text-display text-ivory mb-6">{service.title}</h2>
                <p className="text-ivory/60 font-inter text-sm leading-relaxed mb-8">{service.description}</p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check size={14} className="text-gold flex-shrink-0" />
                      <span className="text-ivory/50 text-sm font-inter">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button to="/build-quote" variant="primary" icon>Build Your Quote</Button>
                  <Button to="/portfolio" variant="outline" icon>View Gallery</Button>
                </div>

                {/* FAQ */}
                {service.faqs && service.faqs.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-playfair text-lg text-ivory mb-4">Frequently Asked Questions</h3>
                    <FAQAccordion items={service.faqs} />
                  </div>
                )}
              </motion.div>
            </div>

            {index < services.length - 1 && <GoldDivider className="mt-20" width="w-48" />}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Services;
