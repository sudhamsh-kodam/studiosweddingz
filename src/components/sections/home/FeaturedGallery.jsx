import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../utils/animations';
import SectionHeading from '../../ui/SectionHeading';
import Button from '../../ui/Button';
import heroWedding from '../../../assets/images/hero-wedding.png';
import heroMaternity from '../../../assets/images/hero-maternity.png';
import heroNewborn from '../../../assets/images/hero-newborn.png';
import heroFashion from '../../../assets/images/hero-fashion.png';
import heroKids from '../../../assets/images/hero-kids.png';

const galleryImages = [
  { src: heroWedding, title: 'A Royal Affair', category: 'Wedding' },
  { src: heroMaternity, title: 'Ethereal Glow', category: 'Maternity' },
  { src: heroNewborn, title: 'Tiny Miracles', category: 'Newborn' },
  { src: heroFashion, title: 'Editorial Grace', category: 'Fashion' },
  { src: heroKids, title: 'Joyful Moments', category: 'Kids' },
];

const FeaturedGallery = () => {
  return (
    <section className="section-padding-y bg-noir relative overflow-hidden">
      <div className="max-container section-padding">
        <SectionHeading
          subtitle="Our Work"
          title="Featured Gallery"
          description="A curated collection of our finest moments — each frame crafted with intention and love."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-luxury group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-luxury">
                  <p className="text-gold text-xs font-cormorant uppercase tracking-[0.2em] mb-1">
                    {img.category}
                  </p>
                  <h3 className="text-ivory font-playfair text-xl">{img.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button to="/portfolio" variant="outline" icon>
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGallery;
