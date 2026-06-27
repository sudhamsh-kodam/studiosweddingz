import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Clock, Star, Check, ArrowRight, Baby, Sparkles } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import FAQAccordion from '../components/ui/FAQAccordion';
import Button from '../components/ui/Button';
import { fadeUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight, pageTransition } from '../utils/animations';
import { bbServices, bbPackages, bbTestimonials, bbFaqs, bbGalleryImages } from '../data/bornsAndBumps';
import bbHero from '../assets/images/bb-hero.png';

const BornsAndBumps = () => {
  const [activeService, setActiveService] = useState('maternity');
  const [lightboxImg, setLightboxImg] = useState(null);
  const navigate = useNavigate();

  const [showClearQuotePopup, setShowClearQuotePopup] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);

  const bbServiceIds = ['maternity', 'babyShower', 'newborn', 'cradleCeremony', 'milestone', 'birthday'];

  const proceedWithSelection = (serviceId, packageId) => {
    const updatedState = {
      step: 3,
      selectedServices: [serviceId],
      selectedPackages: { [serviceId]: packageId },
      selectedAddons: [],
      addonQuantities: {},
      eventServices: {},
      eventDays: {},
      eventDates: {},
    };
    try {
      sessionStorage.setItem('quoteBuilderState', JSON.stringify(updatedState));
    } catch (e) {
      console.error("Error writing to sessionStorage", e);
    }
    navigate('/build-quote');
  };

  const handleSelectPackage = (serviceId, packageId) => {
    const mapping = {
      maternity: 'maternity',
      babyshower: 'babyShower',
      newborn: 'newborn',
      cradle: 'cradleCeremony',
      milestone: 'milestone',
      birthday: 'birthday'
    };
    const mappedServiceId = mapping[serviceId] || serviceId;

    let existingState = null;
    try {
      const saved = sessionStorage.getItem('quoteBuilderState');
      if (saved) existingState = JSON.parse(saved);
    } catch (e) {
      console.error("Error reading from sessionStorage", e);
    }

    if (existingState && existingState.selectedServices && existingState.selectedServices.length > 0) {
      const hasConflict = existingState.selectedServices.some(
        (s) => !bbServiceIds.includes(s) || s !== mappedServiceId
      );
      if (hasConflict) {
        setPendingSelection({ serviceId: mappedServiceId, packageId });
        setShowClearQuotePopup(true);
        return;
      }
    }

    proceedWithSelection(mappedServiceId, packageId);
  };

  const handleConfirmClearQuote = () => {
    if (pendingSelection) {
      proceedWithSelection(pendingSelection.serviceId, pendingSelection.packageId);
    }
    setShowClearQuotePopup(false);
    setPendingSelection(null);
  };

  const handleCancelClearQuote = () => {
    setShowClearQuotePopup(false);
    setPendingSelection(null);
  };

  return (
    <motion.main {...pageTransition}>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bbHero} alt="Borns and Bumps" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-cormorant text-gold text-sm md:text-base uppercase tracking-[0.4em] mb-6">
              by StudioSweddingz
            </p>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-ivory mb-4 leading-[0.95]">
              Borns <span className="text-gradient-gold">&</span> Bumps
            </h1>
            <p className="font-cormorant text-xl md:text-2xl text-ivory/60 italic mb-8 max-w-2xl mx-auto">
              Celebrating life's most tender beginnings — from the glow of motherhood to baby's first giggle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/build-quote" variant="primary" size="lg" icon>
                Book a Session
              </Button>
              <Button variant="outline" size="lg" icon onClick={() => document.getElementById('bb-services')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>
        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-ivory/40 text-xs tracking-[0.3em] uppercase font-inter">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-gold/40"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════ WHY BORNS & BUMPS ═══════════════════════ */}
      <section className="section-padding py-24 md:py-32 bg-noir">
        <div className="max-container">
          <SectionHeading
            subtitle="Why Choose Us"
            title="The Borns & Bumps Promise"
            description="Every session is crafted with warmth, patience, and artistry — because these moments only happen once."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4"
          >
            {[
              { icon: Heart, title: 'Gentle & Patient', desc: 'Baby-led sessions with no rushing. Comfort and safety always come first.' },
              { icon: Shield, title: 'Safety First', desc: 'Temperature-controlled, sanitized studio with trained newborn handlers.' },
              { icon: Sparkles, title: 'Editorial Quality', desc: 'Magazine-grade retouching and cinematic aesthetics in every image.' },
              { icon: Clock, title: 'Perfect Timing', desc: 'We guide you on the ideal timing for every session — bump to baby.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group p-8 border border-ivory/8 rounded-sm bg-ivory/[0.02] hover:border-gold/20 hover:bg-gold/[0.03] transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors duration-500">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-playfair text-lg text-ivory mb-3">{title}</h3>
                <p className="font-inter text-sm text-ivory/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ SERVICES ═══════════════════════ */}
      <section id="bb-services" className="section-padding py-24 md:py-32 bg-noir-900">
        <div className="max-container">
          <SectionHeading
            subtitle="Our Specialties"
            title="What We Capture"
            description="From the radiant glow of motherhood to your baby's most precious firsts."
          />
          <div className="space-y-24 md:space-y-32">
            {bbServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  className="relative overflow-hidden rounded-sm aspect-[4/5] lg:[direction:ltr]"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-noir/70 backdrop-blur-sm px-4 py-2 rounded-sm">
                    <span className="text-2xl mr-2">{service.icon}</span>
                    <span className="font-cormorant text-gold text-sm uppercase tracking-widest">{service.tagline}</span>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div variants={index % 2 === 0 ? slideInRight : slideInLeft} className="lg:[direction:ltr]">
                  <h3 className="font-playfair text-3xl md:text-4xl text-ivory mb-4">{service.title}</h3>
                  <p className="font-inter text-ivory/50 leading-relaxed mb-8">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={18} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="font-inter text-sm text-ivory/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="primary"
                      size="md"
                      icon
                      onClick={() => {
                        setActiveService(service.id);
                        document.getElementById('bb-packages')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View Packages
                    </Button>
                    <Button to="/build-quote" variant="outline" size="md" icon>
                      Get a Quote
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PACKAGES & PRICING ═══════════════════════ */}
      <section id="bb-packages" className="section-padding py-24 md:py-32 bg-noir">
        <div className="max-container">
          <SectionHeading
            subtitle="Packages & Pricing"
            title="Choose Your Package"
            description="Transparent pricing with no hidden costs. Every package can be customized further."
          />

          {/* Service Tabs */}
          <div className="flex justify-center gap-2 mb-12 flex-wrap max-w-4xl mx-auto">
            {bbServices.map((s) => {
              const shortName = s.title.replace(' Photography', '').replace(' Ceremony', '');
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s.id)}
                  className={`px-4 md:px-5 py-2.5 font-inter text-xs md:text-sm tracking-wide rounded-sm transition-all duration-400 ${
                    activeService === s.id
                      ? 'bg-gradient-gold text-noir font-semibold'
                      : 'border border-ivory/15 text-ivory/60 hover:text-ivory hover:border-ivory/30'
                  }`}
                >
                  <span className="mr-1.5">{s.icon}</span>
                  {shortName}
                </button>
              );
            })}
          </div>

          {/* Pricing Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
            >
              {bbPackages[activeService]?.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative p-8 rounded-sm border transition-all duration-500 flex flex-col ${
                    pkg.popular
                      ? 'border-gold/40 bg-gold/[0.05] shadow-lg shadow-gold/5 scale-[1.02]'
                      : 'border-ivory/10 bg-ivory/[0.02] hover:border-ivory/20'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold text-noir text-xs font-inter font-bold tracking-wider uppercase rounded-sm">
                      Most Popular
                    </div>
                  )}
                  <h4 className="font-playfair text-xl text-ivory mb-2">{pkg.name}</h4>
                  <div className="mb-6">
                    <span className="font-playfair text-4xl text-gold">₹{pkg.price.toLocaleString('en-IN')}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="font-inter text-sm text-ivory/60">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full justify-center"
                    icon
                    onClick={() => handleSelectPackage(activeService, pkg.id)}
                  >
                    Select {pkg.name}
                  </Button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-ivory/40 text-sm font-inter mt-10"
          >
            Need something custom? Use our{' '}
            <Link to="/build-quote" className="text-gold hover:underline">
              Build Your Quote
            </Link>{' '}
            tool to create a personalized package.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════ GALLERY ═══════════════════════ */}
      <section className="section-padding py-24 md:py-32 bg-noir-900">
        <div className="max-container">
          <SectionHeading
            subtitle="Our Work"
            title="Gallery"
            description="A glimpse into the tender, beautiful moments we've had the privilege to capture."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {bbGalleryImages.map((img, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-all duration-500 flex items-end justify-start p-4">
                  <span className="font-cormorant text-ivory text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ LIGHTBOX ═══════════════════════ */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[100] bg-noir/95 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              className="absolute top-6 right-6 text-ivory/60 hover:text-ivory text-2xl font-inter transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="section-padding py-24 md:py-32 bg-noir">
        <div className="max-container">
          <SectionHeading
            subtitle="Happy Families"
            title="What Parents Say"
            description="Real stories from families who trusted us with their most precious moments."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {bbTestimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 border border-ivory/8 rounded-sm bg-ivory/[0.02] hover:border-gold/15 transition-all duration-500"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-cormorant text-lg text-ivory/70 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="font-playfair text-gold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-inter text-sm text-ivory font-medium">{t.name}</p>
                    <p className="font-inter text-xs text-gold/60">{t.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="section-padding py-24 md:py-32 bg-noir-900">
        <div className="max-container max-w-3xl">
          <SectionHeading
            subtitle="Common Questions"
            title="FAQs"
            description="Everything you need to know about our maternity, newborn, and kids sessions."
          />
          <FAQAccordion items={bbFaqs} />
        </div>
      </section>

      {/* ═══════════════════════ BOOKING CTA ═══════════════════════ */}
      <section className="relative section-padding py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bbHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-cormorant text-gold text-sm uppercase tracking-[0.3em] mb-4">Ready to Book?</p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 max-w-3xl mx-auto leading-tight">
              Let's Capture Your <span className="text-gradient-gold">Beautiful Story</span>
            </h2>
            <p className="font-inter text-ivory/50 max-w-xl mx-auto mb-10">
              Whether you're expecting, just welcomed your little one, or celebrating a milestone — we'd love to be part of your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/build-quote" variant="primary" size="lg" icon>
                Build Your Quote
              </Button>
              <Button to="/contact" variant="outline" size="lg" icon>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ═══════════════════════ CLEAR QUOTE POPUP ═══════════════════════ */}
      <AnimatePresence>
        {showClearQuotePopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={handleCancelClearQuote} />
            <motion.div
              className="relative bg-noir-light border border-gold/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-playfair text-2xl text-ivory mb-3">
                Existing Quote Found
              </h3>
              <p className="font-inter text-ivory/60 text-sm leading-relaxed mb-8">
                You already have a quote in progress with different services. Would you like to clear it and start fresh with your new selection?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleCancelClearQuote}
                  className="px-6 py-3 rounded-lg border border-ivory/20 text-ivory/70 font-inter text-sm hover:bg-ivory/5 hover:border-ivory/30 transition-all duration-300 cursor-pointer"
                >
                  No, Keep It
                </button>
                <button
                  onClick={handleConfirmClearQuote}
                  className="px-6 py-3 rounded-lg bg-gold text-noir font-inter text-sm font-semibold hover:bg-gold-light transition-all duration-300 cursor-pointer"
                >
                  Yes, Start Fresh
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default BornsAndBumps;
