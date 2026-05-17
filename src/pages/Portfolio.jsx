import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import SectionHeading from '../components/ui/SectionHeading';
import Lightbox from '../components/ui/Lightbox';
import { portfolioItems, categories } from '../data/portfolio';
import heroWedding from '../assets/images/hero-wedding.png';
import heroMaternity from '../assets/images/hero-maternity.png';
import heroNewborn from '../assets/images/hero-newborn.png';
import heroFashion from '../assets/images/hero-fashion.png';
import heroKids from '../assets/images/hero-kids.png';

const imageMap = {
  weddings: [heroWedding, heroWedding, heroWedding, heroWedding],
  maternity: [heroMaternity, heroMaternity, heroMaternity],
  newborn: [heroNewborn, heroNewborn, heroNewborn],
  fashion: [heroFashion, heroFashion, heroFashion],
  kids: [heroKids, heroKids, heroKids],
};

const getImage = (item) => {
  const imgs = imageMap[item.category] || [heroWedding];
  return imgs[item.id % imgs.length];
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    return activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const allImages = filtered.map((item) => ({ src: getImage(item), alt: item.title }));

  const openLightbox = (idx) => { setLightboxIndex(idx); setLightboxOpen(true); };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={heroFashion} alt="Portfolio" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">Our Work</p>
            <h1 className="font-playfair text-display-lg text-ivory">Portfolio</h1>
          </motion.div>
        </div>
      </section>

      {/* Filters + Gallery */}
      <section className="section-padding-y bg-noir">
        <div className="max-container section-padding">
          {/* Category Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setVisibleCount(12); }}
                className={`px-5 py-2 text-sm font-inter tracking-wide rounded-sm transition-all duration-400 ${
                  activeCategory === cat.id
                    ? 'bg-gold text-noir font-medium'
                    : 'text-ivory/50 hover:text-ivory border border-ivory/10 hover:border-ivory/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative overflow-hidden rounded-sm gold-border-hover">
                    <div className={`${item.aspect === 'tall' ? 'aspect-[3/4]' : item.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}>
                      <img
                        src={getImage(item)}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[1s] ease-luxury group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-gold text-xs font-cormorant uppercase tracking-[0.15em]">{item.category}</p>
                        <h3 className="font-playfair text-ivory text-base">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-8 py-3 border border-gold/30 text-gold text-sm font-inter tracking-wide rounded-sm hover:bg-gold/10 transition-all duration-400"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Lightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % allImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
      />
    </main>
  );
};

export default Portfolio;
