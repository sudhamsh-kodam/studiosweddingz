import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../utils/animations';
import SectionHeading from '../components/ui/SectionHeading';
import GoldDivider from '../components/ui/GoldDivider';
import Button from '../components/ui/Button';
import { Award, Camera, Heart, Users } from 'lucide-react';
import heroMaternity from '../assets/images/hero-maternity.png';
import heroWedding from '../assets/images/hero-wedding.png';

const team = [
  { name: 'Sudhamsh', role: 'Founder', bio: 'A storyteller at heart with a vision for cinematic excellence.' },
  { name: 'Venkat', role: 'Senior Videographer', bio: 'Cinematic filmmaker with a passion for emotional wedding films.' },
  { name: 'Kishan', role: 'Candid Photographer', bio: 'Capturing unscripted, beautiful moments as they naturally unfold.' },
  { name: 'Ramesh Kodam', role: 'Senior Photographer & Mentor', bio: 'A master of light and composition, mentoring the next generation of artists.' },
  { name: 'Venu', role: 'Videographer', bio: 'Expert in capturing dynamic movements and beautiful visual stories.' },
];

const achievements = [
  { icon: Award, number: '25+', label: 'Industry Awards' },
  { icon: Camera, number: '10+', label: 'Years of Excellence' },
  { icon: Heart, number: '500+', label: 'Happy Families' },
  { icon: Users, number: '15+', label: 'Team Members' },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroWedding} alt="About Us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">Our Story</p>
            <h1 className="font-playfair text-display-lg text-ivory">About StudioSweddingz</h1>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding-y bg-noir">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img src={heroMaternity} alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/20 rounded-sm" />
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="font-cormorant text-gold text-sm uppercase tracking-[0.3em] mb-4">The Founder</p>
              <h2 className="font-playfair text-display text-ivory mb-6">A Passion Born From Love</h2>
              <div className="space-y-4 text-ivory/60 font-inter text-sm leading-relaxed">
                <p>StudioSweddingz was born from a simple belief: every love story deserves to be told with the same cinematic grandeur as the greatest films ever made.</p>
                <p>What began as a passionate pursuit of capturing genuine emotions has evolved into one of the most sought-after luxury photography studios. We don't believe in posing. We believe in creating moments so natural, so beautiful, that you simply live in them.</p>
                <p>Our approach is deeply rooted in storytelling — we don't just photograph events, we craft visual narratives that transport you back to every laugh, every tear, every stolen glance.</p>
              </div>
              <GoldDivider className="my-8" width="w-16" />
              <Button to="/contact" variant="outline" icon>Get In Touch</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding-y bg-noir-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.03),transparent_70%)]" />
        <div className="max-container section-padding text-center relative z-10">
          <SectionHeading subtitle="Our Philosophy" title="We Don't Take Photos. We Craft Legacies." />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="max-w-3xl mx-auto">
            <p className="font-cormorant text-xl md:text-2xl text-ivory/70 italic leading-relaxed">
              "Photography is not about the camera. It's about the connection between the photographer and the soul in front of the lens. When that connection is real, magic happens — and that magic lives forever in the image."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding-y bg-noir">
        <div className="max-container section-padding">
          <SectionHeading subtitle="The Team" title="The Artists Behind The Lens" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="group text-center">
                <div className="aspect-[3/4] rounded-sm overflow-hidden mb-4 bg-noir-800 gold-border-hover">
                  <div className="w-full h-full bg-gradient-to-br from-noir-700 to-noir-900 flex items-center justify-center">
                    <span className="text-5xl font-playfair text-gold/20">{member.name[0]}</span>
                  </div>
                </div>
                <h3 className="font-playfair text-lg text-ivory group-hover:text-gold transition-colors">{member.name}</h3>
                <p className="text-gold text-xs font-cormorant uppercase tracking-[0.15em] mt-1">{member.role}</p>
                <p className="text-ivory/40 text-xs font-inter mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-noir-900">
        <div className="max-container section-padding">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map(({ icon: Icon, number, label }, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <Icon size={32} className="text-gold mx-auto mb-4" />
                <div className="font-playfair text-display text-gradient-gold mb-2">{number}</div>
                <p className="font-cormorant text-ivory/50 text-sm uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
