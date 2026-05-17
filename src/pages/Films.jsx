import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import SectionHeading from '../components/ui/SectionHeading';
import VideoModal from '../components/ui/VideoModal';
import { films } from '../data/films';
import heroWedding from '../assets/images/hero-wedding.png';
import heroMaternity from '../assets/images/hero-maternity.png';
import heroNewborn from '../assets/images/hero-newborn.png';

const thumbnails = [heroWedding, heroMaternity, heroNewborn, heroWedding, heroMaternity, heroNewborn];

const Films = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (film) => { setActiveVideo(film); setModalOpen(true); };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={heroWedding} alt="Films" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">Cinematic Stories</p>
            <h1 className="font-playfair text-display-lg text-ivory">Our Films</h1>
          </motion.div>
        </div>
      </section>

      {/* Films Grid */}
      <section className="section-padding-y bg-noir">
        <div className="max-container section-padding">
          <SectionHeading
            subtitle="Watch"
            title="Cinematic Wedding Films"
            description="Experience the emotion, the grandeur, and the love through our cinematic films."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {films.map((film, i) => (
              <motion.div
                key={film.id}
                variants={fadeUp}
                className="group cursor-pointer"
                onClick={() => openVideo(film)}
              >
                <div className="relative overflow-hidden rounded-sm gold-border-hover">
                  <div className="aspect-video">
                    <img
                      src={thumbnails[i % thumbnails.length]}
                      alt={film.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-noir/40 group-hover:bg-noir/60 transition-colors duration-400 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/60 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all duration-400">
                      <Play size={24} className="text-gold fill-gold ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 glass text-gold text-[10px] font-inter uppercase tracking-wider rounded-sm">
                      {film.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-ivory/60 text-xs font-inter">{film.duration}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-playfair text-lg text-ivory group-hover:text-gold transition-colors">{film.title}</h3>
                  <p className="text-ivory/40 text-xs font-inter mt-1 line-clamp-2">{film.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setActiveVideo(null); }}
        videoUrl={activeVideo?.videoUrl}
        title={activeVideo?.title}
      />
    </main>
  );
};

export default Films;
