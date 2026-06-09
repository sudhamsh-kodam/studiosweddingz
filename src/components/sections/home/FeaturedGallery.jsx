import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../utils/animations';
import SectionHeading from '../../ui/SectionHeading';
import Button from '../../ui/Button';

const galleryImages = [
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-LR7vdnM/0/NJvkGng5CFnDHtp5HvP7Z4cLgP6BrkmQgBnvzXpgz/X3/01-X3.jpg',
    title: 'Sun-Drenched Serenity',
    category: 'Maternity'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-B5xtJwK/0/MrX54ghRKJ5j9dGCgLH9WvRBF9RxXRBmZgxKfRh62/X3/18-X3.jpg',
    title: 'Floral Grandeur',
    category: 'Wedding'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-wScnRDL/0/MQsGS2h8GWprqR5WQrMtD5GrWJwMCh9qFsFTP6d4b/X3/KIS01587a-1-X3.jpg',
    title: 'Whispers of Love',
    category: 'Wedding'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-DK2qCfw/0/KzMBKS97PffCVpTSsvRF5gRjdDcBJ7xngrGbZjBs8/X3/SUD00363-1-X3.jpg',
    title: 'Crimson Grace',
    category: 'Maternity'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-nwGP3Gn/0/L2R4ZV254jsPWRsMFb5sPhp5wL5sW4BfxZtPCQbxM/X3/DSC00535a-X3.jpg',
    title: 'Timeless Traditions',
    category: 'Wedding'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-gMdm4MS/0/KG5csBFbMr9TpcShJVg9bjpT8vPzX4CfKrVwsmnvD/X3/DSC00604A-X3.jpg',
    title: 'Curtained Kiss',
    category: 'Wedding'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-7sSMpk6/0/M3hSS7DQ3PG5mHPrmsJx8cv8TMfTPbf3xTssGHBgk/X3/DSC00653a-X3.jpg',
    title: 'Shy Glances',
    category: 'Wedding'
  },
  {
    src: 'https://photos.smugmug.com/Studiosweddingz-website/Feature-gallery/i-w4hpwqQ/0/NdXVFLLg8LMcvBxpF94dtNs6j8fMMtc23cmd6tgLz/X3/DSC00660A-X3.jpg',
    title: 'Eternal Togetherness',
    category: 'Wedding'
  }
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-square' : 'aspect-[3/4]'} w-full h-full`}>
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
          className="text-center mt-6"
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

