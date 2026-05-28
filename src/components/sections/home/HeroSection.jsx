import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../../ui/Button';
import heroWedding from '../../../assets/images/hero-wedding.png';
import heroMaternity from '../../../assets/images/hero-maternity.png';
import heroNewborn from '../../../assets/images/hero-newborn.png';
import heroBigFatIndian from '../../../assets/images/hero-big-fat-indian.png';
import heroSouthIndian from '../../../assets/images/hero-south-indian.png';
import heroSangeet from '../../../assets/images/hero-sangeet.png';
import heroHaldi from '../../../assets/images/hero-haldi.png';
import heroReception from '../../../assets/images/hero-reception.png';
import heroEngagement from '../../../assets/images/hero-engagement.png';

const slides = [
  {
    image: heroEngagement,
    subtitle: 'The Engagement Ceremony',
    title: 'The Promise That Began It All',
    description: 'Two souls, one ring, a thousand emotions — the beautiful beginning of your forever, captured with grace and tenderness.',
  },
  {
    image: heroWedding,
    subtitle: 'Luxury Wedding Photography',
    title: 'Where Every Moment Becomes Eternal',
    description: 'From the first glance to the last dance — we craft cinematic wedding stories that live forever in heart and frame.',
  },
  {
    image: heroBigFatIndian,
    subtitle: 'The Grand Indian Celebration',
    title: 'Magnificence Beyond Measure',
    description: 'Where opulence meets tradition — capturing the grandeur of a Big Fat Indian Wedding in all its regal splendour.',
  },
  {
    image: heroSouthIndian,
    subtitle: 'Traditional South Indian Weddings',
    title: 'Sacred Rituals, Timeless Elegance',
    description: 'Honouring centuries of culture and devotion — every ritual documented with reverence, artistry, and an eye for the eternal.',
  },
  {
    image: heroSangeet,
    subtitle: 'The Sangeet Ceremony',
    title: 'Where Music Fills Every Heart',
    description: 'An evening of unbridled joy, laughter, and dance — the night when two families become one, beautifully remembered.',
  },
  {
    image: heroHaldi,
    subtitle: 'The Haldi Ceremony',
    title: 'Bathed in Golden Blessings',
    description: 'The most intimate of all rituals — surrounded by love, laughter, and marigolds, as family hands bestow their blessings.',
  },
  {
    image: heroReception,
    subtitle: 'The Wedding Reception',
    title: 'An Evening Draped in Luxury',
    description: 'The grandest entrance, the warmest embraces, the finest moments — your reception night immortalised in cinematic elegance.',
  }, {
    image: heroMaternity,
    subtitle: 'Maternity & Newborn',
    title: 'Celebrating Life\'s Most Beautiful Chapters',
    description: 'The miracle of new life, tenderly preserved — portraits that carry the warmth of your love for generations to come.',
  },
  {
    image: heroNewborn,
    subtitle: 'Cinematic Storytelling',
    title: 'Your Story Deserves To Be Told Beautifully',
    description: 'Every frame a poem, every image a memory — because the stories worth living are the ones worth remembering.',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/30 to-noir/80" />
      <div className="absolute inset-0 bg-noir/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center section-padding">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-cormorant text-gold text-sm md:text-base uppercase tracking-[0.4em] mb-6"
            >
              {slide.subtitle}
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-display-xl text-ivory mb-8 text-balance"
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-cormorant text-ivory/70 text-lg md:text-xl italic max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {slide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button to="/portfolio" variant="primary" size="lg" icon>
                View Portfolio
              </Button>
              <Button to="/build-quote" variant="outline" size="lg" icon>
                Build Your Quote
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[2px] transition-all duration-600 ${i === currentSlide ? 'w-12 bg-gold' : 'w-6 bg-ivory/30'
                }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-ivory/40 text-[10px] font-inter uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={16} className="text-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
