import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../../utils/animations';
import SectionHeading from '../../ui/SectionHeading';
import heroWedding from '../../../assets/images/hero-wedding.png';
import heroCandid from '../../../assets/images/hero-candid.png';
import heroTraditional from '../../../assets/images/hero-fashion.png';
import heroCinematic from '../../../assets/images/hero-cinematic.png';
import heroAerial from '../../../assets/images/hero-aerial.png';
import heroTradVideo from '../../../assets/images/hero-traditional-video.png';
import heroFashion from '../../../assets/images/hero-fashion.png';

const servicesList = [
  { id: 'wedding', title: 'Wedding Photography', desc: 'Cinematic wedding stories told with artistry and emotion.', image: heroWedding },
  { id: 'candid', title: 'Candid Photography', desc: 'Real emotions, unscripted moments — your story as it unfolds.', image: heroCandid },
  { id: 'traditional', title: 'Traditional Photography', desc: 'Classic, posed portraits that families cherish for generations.', image: heroTraditional },
  { id: 'cinematic', title: 'Cinematic Videography', desc: 'Your love story as a breathtaking motion picture.', image: heroCinematic },
  { id: 'aerial', title: 'Aerial Photography & Videography', desc: 'Sweeping drone perspectives that reveal the grandeur of your day.', image: heroAerial },
  { id: 'trad-video', title: 'Traditional Videography', desc: 'Complete documentation of every ritual, every moment.', image: heroTradVideo },
  { id: 'fashion', title: 'Fashion Portraits', desc: 'Editorial excellence meets personal artistry.', image: heroFashion },
];

const ServicesOverview = () => {
  return (
    <section className="section-padding-y bg-noir-900 relative">
      <div className="max-container section-padding">
        <SectionHeading
          subtitle="What We Do"
          title="Our Services"
          description="From candid moments to cinematic films, every service is crafted as a luxury experience."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {servicesList.map((service, i) => (
            <motion.div key={service.id} variants={fadeUp}>
              <Link
                to={`/services#${service.id}`}
                className="group block relative overflow-hidden rounded-sm gold-border-hover"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-[1s] ease-luxury group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-playfair text-lg text-ivory mb-1 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-ivory/40 text-xs font-inter line-clamp-2 mb-3">
                    {service.desc}
                  </p>
                  <span className="text-gold text-xs font-inter inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
