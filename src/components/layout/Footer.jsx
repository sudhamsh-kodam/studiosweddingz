import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon as Instagram, YoutubeIcon as Youtube } from '../ui/BrandIcons';
import { fadeUp, staggerContainer } from '../../utils/animations';

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Borns & Bumps', path: '/borns-and-bumps' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Films', path: '/films' },
  { name: 'Build Your Quote', path: '/build-quote' },
  { name: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { name: 'Wedding Photography', path: '/services#wedding' },
  { name: 'Candid Photography', path: '/services#candid' },
  { name: 'Traditional Photography', path: '/services#traditional' },
  { name: 'Cinematic Videography', path: '/services#cinematic' },
  { name: 'Aerial Photography & Videography', path: '/services#aerial' },
  { name: 'Traditional Videography', path: '/services#trad-video' },
  { name: 'Fashion Portraits', path: '/services#fashion' },
];

const Footer = () => {
  return (
    <footer className="relative bg-noir border-t border-gold/10">
      {/* Gold line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-container section-padding py-16 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-playfair text-2xl text-ivory">
                Studio<span className="text-gradient-gold">S</span>weddingz
              </span>
            </Link>
            <p className="text-ivory/50 text-sm leading-relaxed mb-6 font-inter">
              Luxury cinematic photography for life's most precious moments.
              We don't just take photos — we craft timeless stories.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://instagram.com/studiosweddingz' },
                { icon: Youtube, href: 'https://youtube.com/@studiosweddingz' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ivory/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all duration-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp}>
            <h4 className="font-cormorant text-gold text-sm uppercase tracking-[0.2em] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/50 text-sm font-inter hover:text-gold transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h4 className="font-cormorant text-gold text-sm uppercase tracking-[0.2em] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/50 text-sm font-inter hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="font-cormorant text-gold text-sm uppercase tracking-[0.2em] mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-1 flex-shrink-0" />
                <a href="tel:+919100097900" className="text-ivory/50 text-sm font-inter hover:text-gold transition-colors">
                  +91 91000 97900 / 70138 77610
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-1 flex-shrink-0" />
                <a href="mailto:hello@studiosweddingz.com" className="text-ivory/50 text-sm font-inter hover:text-gold transition-colors">
                  hello@studiosweddingz.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-ivory/50 text-sm font-inter">
                  studiosweddingz,<br />
                  chilkanagar
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ivory/30 text-xs font-inter tracking-wide">
            © {new Date().getFullYear()} StudioSweddingz. All rights reserved.
          </p>
          <p className="text-ivory/20 text-xs font-inter">
            Crafted with ♥ for timeless moments
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
