import { motion } from 'framer-motion';
import { InstagramIcon as Instagram } from '../../ui/BrandIcons';
import { fadeUp, staggerContainer } from '../../../utils/animations';
import SectionHeading from '../../ui/SectionHeading';
import heroWedding from '../../../assets/images/hero-wedding.png';
import heroMaternity from '../../../assets/images/hero-maternity.png';
import heroNewborn from '../../../assets/images/hero-newborn.png';
import heroFashion from '../../../assets/images/hero-fashion.png';
import heroKids from '../../../assets/images/hero-kids.png';

const posts = [
  { src: heroWedding, likes: '2.4K' },
  { src: heroMaternity, likes: '1.8K' },
  { src: heroNewborn, likes: '3.1K' },
  { src: heroFashion, likes: '2.7K' },
  { src: heroKids, likes: '1.5K' },
  { src: heroWedding, likes: '4.2K' },
];

const InstagramFeed = () => {
  return (
    <section className="section-padding-y bg-noir relative">
      <div className="max-container section-padding">
        <SectionHeading
          subtitle="Follow Us"
          title="@studiosweddingz"
          description="Stay inspired — follow our journey on Instagram."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {posts.map((post, i) => (
            <motion.a
              key={i}
              variants={fadeUp}
              href="https://instagram.com/studiosweddingz"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <img
                src={post.src}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-2">
                <Instagram size={24} className="text-ivory" />
                <span className="text-ivory text-xs font-inter">♥ {post.likes}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
