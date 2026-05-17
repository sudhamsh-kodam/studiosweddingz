import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../../utils/animations';
import SectionHeading from '../../ui/SectionHeading';
import heroWedding from '../../../assets/images/hero-wedding.png';
import heroMaternity from '../../../assets/images/hero-maternity.png';
import heroNewborn from '../../../assets/images/hero-newborn.png';
import heroKids from '../../../assets/images/hero-kids.png';
import heroFashion from '../../../assets/images/hero-fashion.png';

const servicesList = [
  { id: 'wedding', title: 'Wedding Photography', desc: 'Cinematic wedding stories told with artistry and emotion.', image: heroWedding },
  { id: 'maternity', title: 'Maternity Shoots', desc: 'Celebrating the radiant glow of new life.', image: heroMaternity },
  { id: 'newborn', title: 'Newborn Photography', desc: 'Gentle, artistic portraits of your tiny miracle.', image: heroNewborn },
  { id: 'milestone', title: 'Baby Milestones', desc: 'Every first is a masterpiece worth capturing.', image: heroKids },
  { id: 'fashion', title: 'Fashion Portraits', desc: 'Editorial excellence meets personal artistry.', image: heroFashion },
];

const ServicesOverview = () => {
  return (
    <section className="section-padding-y bg-noir-900 relative">
      <div className="max-container section-padding">
        <SectionHeading
          subtitle="What We Do"
          title="Our Services"
          description="From weddings to newborns, every service is crafted as a luxury experience."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
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
