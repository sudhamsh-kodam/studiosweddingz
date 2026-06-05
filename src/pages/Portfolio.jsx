import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, MapPin, Calendar, Camera } from 'lucide-react';
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

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/* ─── Couple Card ─── */
const CoupleCard = ({ couple, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onClick={onClick}
    className="group cursor-pointer"
  >
    <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
      {/* Thumbnail Image */}
      <img
        src={couple.thumbnail}
        alt={couple.names}
        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
        loading="lazy"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 rounded-sm transition-all duration-500" />
      {/* Floating heart */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-noir/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Heart size={14} className="text-gold" />
      </motion.div>
      {/* Couple Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="font-cormorant text-gold text-[10px] uppercase tracking-[0.3em] mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          Wedding Story
        </p>
        <h3 className="font-playfair text-ivory text-xl md:text-2xl leading-tight mb-2">
          {couple.names}
        </h3>
        <div className="flex items-center gap-3 text-ivory/50 text-xs font-inter">
          {couple.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {couple.location}
            </span>
          )}
          {couple.date && (
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {formatDate(couple.date)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Camera size={11} /> {couple.events.reduce((sum, e) => sum + e.photos.length, 0)} photos
          </span>
        </div>
        {/* View Gallery prompt */}
        <div className="mt-3 overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
          <span className="inline-flex items-center gap-2 text-gold text-xs font-inter tracking-wide">
            View Gallery <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Couple Detail Gallery ─── */
const CoupleGallery = ({ couple, onBack }) => {
  const [activeEvent, setActiveEvent] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(20);

  const allPhotos = useMemo(() => {
    if (activeEvent === 'all') {
      return couple.events.flatMap(e => e.photos.map(p => ({
        thumb: typeof p === 'string' ? p : p.thumb,
        full: typeof p === 'string' ? p : p.full,
        event: e.name
      })));
    }
    const ev = couple.events.find(e => e.name === activeEvent);
    return ev ? ev.photos.map(p => ({
      thumb: typeof p === 'string' ? p : p.thumb,
      full: typeof p === 'string' ? p : p.full,
      event: ev.name
    })) : [];
  }, [couple, activeEvent]);

  const visible = allPhotos.slice(0, visibleCount);
  const lightboxImages = allPhotos.map(p => ({ src: p.full, alt: `${couple.names} - ${p.event}` }));

  const openLightbox = (idx) => { setLightboxIndex(idx); setLightboxOpen(true); };

  // Assign aspect ratios for visual variety in masonry
  const getAspect = (i) => {
    const pattern = ['tall', 'square', 'wide', 'square', 'tall', 'square', 'wide', 'tall', 'square', 'wide'];
    return pattern[i % pattern.length];
  };

  return (
    <div>
      {/* Gallery Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-ivory/50 hover:text-gold font-inter text-sm mb-6 transition-colors group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Couples
        </button>
        <div className="text-center">
          <p className="font-cormorant text-gold text-xs uppercase tracking-[0.4em] mb-3">Wedding Story</p>
          <h2 className="font-playfair text-ivory text-4xl md:text-5xl mb-3">{couple.names}</h2>
          <div className="flex items-center justify-center gap-4 text-ivory/40 text-sm font-inter mb-4">
            {couple.location && (
              <span className="flex items-center gap-1"><MapPin size={13} /> {couple.location}</span>
            )}
            {couple.date && (
              <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(couple.date)}</span>
            )}
            <span className="flex items-center gap-1"><Camera size={13} /> {allPhotos.length} photos</span>
          </div>
          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gold/30" />
            <Heart size={12} className="text-gold/50" />
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </div>
      </motion.div>

      {/* Event Tabs */}
      {couple.events.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
        >
          <button
            onClick={() => { setActiveEvent('all'); setVisibleCount(20); }}
            className={`px-5 py-2 text-sm font-inter tracking-wide rounded-sm transition-all duration-400 ${
              activeEvent === 'all'
                ? 'bg-gold text-noir font-medium'
                : 'text-ivory/50 hover:text-ivory border border-ivory/10 hover:border-ivory/20'
            }`}
          >
            All ({couple.events.reduce((s, e) => s + e.photos.length, 0)})
          </button>
          {couple.events.map((ev) => (
            <button
              key={ev.name}
              onClick={() => { setActiveEvent(ev.name); setVisibleCount(20); }}
              className={`px-5 py-2 text-sm font-inter tracking-wide rounded-sm transition-all duration-400 ${
                activeEvent === ev.name
                  ? 'bg-gold text-noir font-medium'
                  : 'text-ivory/50 hover:text-ivory border border-ivory/10 hover:border-ivory/20'
              }`}
            >
              {ev.name} ({ev.photos.length})
            </button>
          ))}
        </motion.div>
      )}

      {/* Photo Grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {visible.map((photo, i) => (
            <motion.div
              key={photo.thumb}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-sm gold-border-hover">
                <div className={`${getAspect(i) === 'tall' ? 'aspect-[3/4]' : getAspect(i) === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}>
                  <img
                    src={photo.thumb}
                    alt={`${couple.names} - ${photo.event}`}
                    className="w-full h-full object-cover transition-transform duration-[1s] ease-luxury group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-gold text-[10px] font-cormorant uppercase tracking-[0.15em]">{photo.event}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      {visibleCount < allPhotos.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 16)}
            className="px-8 py-3 border border-gold/30 text-gold text-sm font-inter tracking-wide rounded-sm hover:bg-gold/10 transition-all duration-400"
          >
            Load More ({allPhotos.length - visibleCount} remaining)
          </button>
        </motion.div>
      )}

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
      />
    </div>
  );
};

/* ─── Main Portfolio Page ─── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
  const [couples, setCouples] = useState([]);
  const [selectedCouple, setSelectedCouple] = useState(null);
  const [loadingCouples, setLoadingCouples] = useState(false);

  // Fetch couple data
  useEffect(() => {
    setLoadingCouples(true);
    fetch('/portfolio/data.json')
      .then(res => res.json())
      .then(data => {
        setCouples(data.couples || []);
        setLoadingCouples(false);
      })
      .catch(() => setLoadingCouples(false));
  }, []);

  // Non-wedding gallery
  const filtered = useMemo(() => {
    if (activeCategory === 'all') return portfolioItems.filter(item => item.category !== 'weddings');
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const allImages = filtered.map((item) => ({ src: getImage(item), alt: item.title }));
  const openLightbox = (idx) => { setLightboxIndex(idx); setLightboxOpen(true); };

  const isWeddings = activeCategory === 'weddings';
  const showNonWeddingGrid = !isWeddings && activeCategory !== 'all';
  const showAllView = activeCategory === 'all';

  const handleCategoryChange = useCallback((catId) => {
    setActiveCategory(catId);
    setVisibleCount(12);
    setSelectedCouple(null);
  }, []);

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
                onClick={() => handleCategoryChange(cat.id)}
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

          <AnimatePresence mode="wait">
            {/* ─── WEDDINGS: Couple Cards or Gallery ─── */}
            {isWeddings && !selectedCouple && (
              <motion.div
                key="couples-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {loadingCouples ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : couples.length === 0 ? (
                  <p className="text-ivory/30 text-center font-inter text-sm py-20">No wedding stories yet. Check back soon!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {couples.map((couple, i) => (
                      <CoupleCard
                        key={couple.id}
                        couple={couple}
                        index={i}
                        onClick={() => {
                          setSelectedCouple(couple);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {isWeddings && selectedCouple && (
              <motion.div
                key="couple-gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CoupleGallery
                  couple={selectedCouple}
                  onBack={() => setSelectedCouple(null)}
                />
              </motion.div>
            )}

            {/* ─── ALL: Show couple cards + other categories ─── */}
            {showAllView && (
              <motion.div
                key="all-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Wedding couples section */}
                {couples.length > 0 && (
                  <div className="mb-16">
                    <div className="text-center mb-10">
                      <p className="font-cormorant text-gold text-xs uppercase tracking-[0.3em] mb-2">Wedding Stories</p>
                      <h2 className="font-playfair text-ivory text-2xl md:text-3xl">Our Couples</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {couples.map((couple, i) => (
                        <CoupleCard
                          key={couple.id}
                          couple={couple}
                          index={i}
                          onClick={() => {
                            setActiveCategory('weddings');
                            setSelectedCouple(couple);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other categories masonry */}
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
              </motion.div>
            )}

            {/* ─── NON-WEDDING CATEGORIES ─── */}
            {showNonWeddingGrid && (
              <motion.div
                key="non-wedding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>
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
