import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteBuilder } from '../hooks/useQuoteBuilder';
import { quoteServices, packageTiers, addons, weddingEvents, eventServicesList } from '../data/quoteOptions';
import { Check, ChevronRight, ChevronLeft, Sparkles, ArrowRight, Calendar, MapPin, MessageSquare, X, User, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import GoldDivider from '../components/ui/GoldDivider';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const stepNames = ['Select Services', 'Choose Event', 'Add Extras', 'Event Details', 'Review & Submit'];

const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

const StepIndicator = ({ step }) => (
  <div className="flex items-center justify-center gap-2 mb-12">
    {stepNames.map((name, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-inter font-medium transition-all duration-400 ${
          i + 1 < step ? 'bg-gold text-noir' : i + 1 === step ? 'border-2 border-gold text-gold' : 'border border-ivory/20 text-ivory/30'
        }`}>
          {i + 1 < step ? <Check size={14} /> : i + 1}
        </div>
        <span className={`hidden md:inline text-xs font-inter ${i + 1 === step ? 'text-gold' : 'text-ivory/30'}`}>{name}</span>
        {i < stepNames.length - 1 && <div className={`w-6 md:w-12 h-[1px] ${i + 1 < step ? 'bg-gold' : 'bg-ivory/10'}`} />}
      </div>
    ))}
  </div>
);

const BuildQuote = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const q = useQuoteBuilder();
  const [submitted, setSubmitted] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(!q.leadCaptured);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', date: '' });
  const [leadErrors, setLeadErrors] = useState({});
  const [currentEventIndex, setCurrentEventIndex] = useState(() => {
    try { return parseInt(sessionStorage.getItem('quoteEventIndex') || '0', 10); } catch { return 0; }
  });
  const [showServicesForCurrent, setShowServicesForCurrent] = useState(false);

  const pageTopRef = useRef(null);

  // Scroll to top of page on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [q.step]);

  // Scroll to top when event index changes within step 2
  useEffect(() => {
    if (q.step === 2) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentEventIndex]);

  // Auto-hide header after 2 seconds once user reaches step 2+
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    if (q.step >= 2) {
      const timer = setTimeout(() => setShowHeader(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowHeader(true);
    }
  }, [q.step]);

  // Persist stepper position
  useEffect(() => {
    try { sessionStorage.setItem('quoteEventIndex', String(currentEventIndex)); } catch {}
  }, [currentEventIndex]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  const validateLead = () => {
    const e = {};
    if (!leadForm.name.trim()) e.name = true;
    if (!leadForm.phone || !isValidPhoneNumber(leadForm.phone)) e.phone = true;
    if (!leadForm.date) e.date = true;
    setLeadErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!validateLead()) return;
    q.updateCustomerInfo('name', leadForm.name);
    q.updateCustomerInfo('phone', leadForm.phone);
    q.updateEventDetails('date', leadForm.date);
    q.captureLead(leadForm);
    setShowLeadModal(false);
  };

  const handleSubmit = () => {
    if (q.canProceed) {
      const summary = q.getQuoteSummary();
      const locStr = summary.eventDetails.isMultipleLocations && summary.eventDetails.locationSecondary
        ? `${summary.eventDetails.location} & ${summary.eventDetails.locationSecondary}`
        : summary.eventDetails.location;
      let msg = `Hi StudioSweddingz! Here's my custom quote:\n\n${summary.items.map(i=>`• ${i.name}: ${formatPrice(i.price)}`).join('\n')}\n\nTotal: ${formatPrice(summary.total)}\n\nName: ${summary.customerInfo.name}\nEmail: ${summary.customerInfo.email}\nPhone: ${summary.customerInfo.phone}\nDate: ${summary.eventDetails.date}\nLocation: ${locStr}`;
      if (summary.eventDetails.referralSource) {
        msg += `\nReferral: ${summary.eventDetails.referralSource}`;
        if (summary.eventDetails.referralSource === 'Reference' && summary.eventDetails.referrerName) {
          msg += ` (${summary.eventDetails.referrerName})`;
        }
      }
      window.open(`https://wa.me/919100097900?text=${encodeURIComponent(msg)}`, '_blank');
      setSubmitted(true);
    }
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <main className="pt-24 pb-20 bg-noir min-h-screen">
      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-noir/85 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="relative bg-noir-900 border border-gold/20 p-8 md:p-12 max-w-md w-full overflow-hidden rounded-sm">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-gold/40" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/40" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-gold/40" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-gold/40" />

              <div className="text-center mb-8">
                <Sparkles className="text-gold mx-auto mb-4" size={28} />
                <h2 className="font-playfair text-2xl md:text-3xl text-ivory mb-2">Let's Get Started</h2>
                <p className="text-ivory/50 font-inter text-sm leading-relaxed">Quick details so we can personalize your quote experience.</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30" size={15} />
                  <input type="text" value={leadForm.name} onChange={(e) => { setLeadForm(p => ({ ...p, name: e.target.value })); if(leadErrors.name) setLeadErrors(p => ({...p, name: false})); }} placeholder="Your Name *" className={`w-full bg-noir border ${leadErrors.name ? 'border-red-500/60' : 'border-ivory/15'} rounded-sm py-3 pl-11 pr-4 text-ivory placeholder:text-ivory/25 font-inter text-sm focus:outline-none focus:border-gold/50 transition-colors`} />
                </div>

                <div className="relative">
                  <div className={`w-full bg-noir border ${leadErrors.phone ? 'border-red-500/60' : 'border-ivory/15'} rounded-sm py-2 pl-4 pr-4 text-ivory font-inter text-sm focus-within:border-gold/50 transition-colors`}>
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      value={leadForm.phone}
                      onChange={(value) => { setLeadForm(p => ({ ...p, phone: value })); if(leadErrors.phone) setLeadErrors(p => ({...p, phone: false})); }}
                      placeholder="WhatsApp Number *"
                      className="custom-phone-input"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30 pointer-events-none" size={15} />
                  <input 
                    type={leadForm.date ? "date" : "text"} 
                    placeholder="Event Date *" 
                    value={leadForm.date} 
                    min={tomorrowDate}
                    onFocus={(e) => { 
                      e.target.type = "date"; 
                      try { e.target.showPicker(); } catch (err) {} 
                    }} 
                    onBlur={(e) => { 
                      if (!leadForm.date) e.target.type = "text"; 
                    }} 
                    onChange={(e) => { 
                      setLeadForm(p => ({ ...p, date: e.target.value })); 
                      if (leadErrors.date) setLeadErrors(p => ({ ...p, date: false })); 
                    }} 
                    onClick={(e) => { 
                      try { e.target.showPicker(); } catch (err) {} 
                    }}
                    className={`w-full bg-noir border ${leadErrors.date ? 'border-red-500/60' : 'border-ivory/15'} rounded-sm py-3 pl-11 pr-4 text-ivory placeholder:text-ivory/25 font-inter text-sm focus:outline-none focus:border-gold/50 transition-colors cursor-pointer`} 
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-gold text-noir py-3 rounded-sm font-inter text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all">
                  <Sparkles size={14} /> Start Building My Quote
                </button>
              </form>
              <p className="text-[10px] text-ivory/25 font-inter mt-5 text-center">Your details are safe. We'll only contact you about your quote.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-container section-padding">
      <div ref={pageTopRef} />

        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">Custom Quote</p>
                <h1 className="font-playfair text-display text-ivory mb-2">Build Your Quote</h1>
                <p className="text-ivory/50 text-sm font-inter max-w-xl mx-auto">Create a personalized photography package tailored to your needs.</p>
              </motion.div>

              <StepIndicator step={q.step} />
            </motion.div>
          )}
        </AnimatePresence>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 max-w-lg mx-auto">
            <Sparkles size={64} className="text-gold mx-auto mb-6" />
            <h2 className="font-playfair text-display text-ivory mb-4">Quote Submitted!</h2>
            <p className="text-ivory/60 font-inter mb-8">We've received your custom quote request. Our team will reach out within 24 hours with a detailed proposal.</p>
            <Button to="/" variant="primary" icon>Back to Home</Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div key={q.step} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  {/* Step 1: Services */}
                  {q.step === 1 && (
                    <div>
                      {/* Transparent Price List */}
                      <div className="mb-12">
                        <div className="text-center mb-8">
                          <h2 className="font-playfair text-2xl text-ivory mb-3">Service Pricing Guide</h2>
                          <p className="text-ivory/70 text-sm font-inter max-w-2xl mx-auto leading-relaxed">
                            Honest pricing, always. We believe in <span className="text-gold font-medium">100% transparency</span>—no hidden fees, no seasonal surges. The price you see is the price for everyone. Hover over a service to learn more.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { name: 'Traditional Photography', price: 10000, icon: '📷', desc: 'Classic, timeless event portraits ensuring every ritual and guest is beautifully documented.' },
                            { name: 'Traditional Videography', price: 10000, icon: '🎥', desc: 'Full-length, classic documentation of your entire event from start to finish.' },
                            { name: 'Candid Photography', price: 15000, icon: '📸', desc: 'Unposed, natural storytelling that captures raw emotions and fleeting moments.' },
                            { name: 'Cinematic Videography', price: 20000, icon: '🎬', desc: 'High-end, story-driven cinematic highlight films with professional audio and grading.' },
                            { name: 'Drone Coverage', price: 10000, icon: '🚁', desc: 'Breathtaking aerial shots of your venue, giving a grand perspective to your celebrations.' },
                            { name: 'Live Streaming', price: 10000, icon: '📡', desc: 'High-quality multi-camera internet broadcast so distant loved ones can join live.' },
                            { name: 'LED Screen', price: 15000, icon: '📺', desc: 'Large dynamic display walls for live event feeds, photo montages, and visuals.' },
                          ].map((item, idx) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              className="group relative p-5 border border-ivory/10 rounded-sm bg-noir-900 overflow-hidden cursor-default transition-colors hover:border-gold/30 hover:bg-noir-800"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                  <span className="text-2xl filter drop-shadow-lg">{item.icon}</span>
                                  <span className="text-gold font-inter font-semibold text-xs bg-gold/10 px-2.5 py-1 rounded-full">{formatPrice(item.price)}</span>
                                </div>
                                <h3 className="text-ivory font-playfair text-base transition-colors group-hover:text-gold">{item.name}</h3>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                  <div className="overflow-hidden">
                                    <p className="text-ivory/60 text-xs font-inter pt-3 mt-3 border-t border-ivory/10 leading-relaxed">{item.desc}</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-ivory/40 text-[11px] font-inter text-center mt-6 uppercase tracking-widest">
                          * Prices listed are for up to 6 hours of coverage within Hyderabad. Travel & logistics may apply for other locations.
                        </p>
                      </div>

                      <h2 className="font-playfair text-heading text-ivory mb-6">What are you looking for?</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quoteServices.map((s) => {
                          const selected = q.selectedServices.includes(s.id);
                          return (
                            <div key={s.id} onClick={() => q.toggleService(s.id)} className={`p-6 rounded-sm text-left cursor-pointer transition-all duration-400 flex flex-col ${selected ? 'border-2 border-gold bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border border-ivory/10 hover:border-ivory/20'}`}>
                              <div className="flex justify-between items-start mb-3">
                                <span className="text-3xl block filter drop-shadow-sm">{s.icon}</span>
                                <div className={`w-6 h-6 rotate-45 border-[1.5px] flex items-center justify-center transition-all duration-500 shadow-lg ${selected ? 'border-gold bg-gold/20' : 'border-ivory/20'}`}>
                                  <div className={`w-2.5 h-2.5 bg-gold transition-transform duration-500 ${selected ? 'scale-100' : 'scale-0'}`} />
                                </div>
                              </div>
                              <h3 className="font-playfair text-lg text-ivory mb-1">{s.name}</h3>
                              <p className="text-ivory/40 text-xs font-inter mb-4 flex-grow">{s.description}</p>
                              
                              <div className="flex justify-between items-end mt-auto h-10">
                                <p className="text-gold text-sm font-inter font-medium mb-1">Starting at {formatPrice(s.startingPrice)}</p>
                                
                                <AnimatePresence>
                                  {selected && (
                                    <motion.button 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      transition={{ duration: 0.2 }}
                                      onClick={(e) => { e.stopPropagation(); q.nextStep(); }} 
                                      className="bg-gradient-gold text-noir px-5 py-2 rounded-sm text-xs font-inter tracking-wide font-medium flex items-center gap-1 hover:shadow-lg hover:shadow-gold/20 transition-all z-10"
                                    >
                                      Next Step <ChevronRight size={14}/>
                                    </motion.button>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Packages or Events */}
                  {q.step === 2 && (
                    <div className="space-y-10">
                      {q.selectedServices.includes('wedding') ? (
                        <div>
                           {currentEventIndex < weddingEvents.length ? (
                             (() => {
                               const event = weddingEvents[currentEventIndex];
                               
                               const filteredServices = eventServicesList.filter(srv => {
                                 if (event.id === 'prewedding') {
                                   return srv.id === 'prewedding_photo' || srv.id === 'prewedding_photo_video';
                                 }
                                 if (srv.id === 'prewedding_photo' || srv.id === 'prewedding_photo_video') return false;

                                 if ((event.id === 'pellikoduku' || event.id === 'pellikuthuru') && srv.id === 'drone') return false;
                                 if (event.id === 'vratham' && (srv.id === 'candid_photo' || srv.id === 'cinematic_video' || srv.id === 'drone')) return false;
                                 if (event.id === 'mehendi' && (srv.id === 'cinematic_video' || srv.id === 'drone')) return false;
                                 if (event.id === 'cocktail' && (srv.id === 'drone' || srv.id === 'traditional_video')) return false;
                                 return true;
                               });

                               const hasServicesSelected = q.eventServices[event.id]?.length > 0;
                               const isCommonEvent = ['engagement', 'groom_haldi', 'bride_haldi', 'pellikoduku', 'pellikuthuru', 'wedding', 'reception'].includes(event.id);
                               const isEventSelected = q.selectedEvents.includes(event.id);
                               const showServices = showServicesForCurrent || isCommonEvent || isEventSelected;

                               return (
                                 <AnimatePresence mode="wait">
                                   <motion.div
                                     key={`${event.id}-${showServices}`}
                                     initial={{ opacity: 0, x: 40 }}
                                     animate={{ opacity: 1, x: 0 }}
                                     exit={{ opacity: 0, x: -40 }}
                                     transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                   >
                                     {/* Running Total Pill */}
                                     <div className="flex justify-center mb-10">
                                       <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/20 rounded-full px-6 py-2.5">
                                         <span className="text-ivory/60 font-inter text-xs uppercase tracking-widest">Estimate</span>
                                         <span className="text-gold font-playfair text-xl font-semibold">{formatPrice(q.totalPrice)}</span>
                                       </div>
                                     </div>

                                     {!showServices ? (
                                       /* Phase 1: Yes/No Question */
                                       <div className="text-center">
                                         <h2 className="font-playfair text-3xl md:text-4xl text-ivory mb-12">
                                           Do We Have {event.name}?
                                         </h2>
                                         <div className="flex justify-center gap-10 mb-10">
                                           {/* Yes Button */}
                                           <button
                                             onClick={() => {
                                               if (!q.selectedEvents.includes(event.id)) {
                                                 q.toggleEvent(event.id);
                                               }
                                               setShowServicesForCurrent(true);
                                             }}
                                             className="group flex flex-col items-center gap-3"
                                           >
                                             <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/20 group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] group-hover:scale-105">
                                               <Check size={36} className="text-gold" />
                                             </div>
                                             <span className="text-gold font-inter text-sm font-medium">Yes</span>
                                           </button>
                                           {/* No Button */}
                                           <button
                                             onClick={() => {
                                               if (q.selectedEvents.includes(event.id)) {
                                                 q.toggleEvent(event.id);
                                               }
                                               setCurrentEventIndex(prev => prev + 1);
                                               setShowServicesForCurrent(false);
                                             }}
                                             className="group flex flex-col items-center gap-3"
                                           >
                                             <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-ivory/5 border-2 border-ivory/15 flex items-center justify-center transition-all duration-300 group-hover:bg-ivory/10 group-hover:border-ivory/30 group-hover:scale-105">
                                               <X size={36} className="text-ivory/50" />
                                             </div>
                                             <span className="text-ivory/50 font-inter text-sm font-medium">No</span>
                                           </button>
                                         </div>
                                         {/* Previous step */}
                                         {currentEventIndex > 0 && (
                                           <button
                                             onClick={() => {
                                               setCurrentEventIndex(prev => prev - 1);
                                               setShowServicesForCurrent(false);
                                             }}
                                             className="flex items-center gap-1 text-gold/50 hover:text-gold font-inter text-xs transition-colors mx-auto"
                                           >
                                             <ChevronLeft size={14} /> Previous step
                                           </button>
                                         )}
                                       </div>
                                     ) : (
                                       /* Phase 2: Service Selection */
                                       <div>
                                         <div className="text-center mb-10">
                                           <h2 className="font-playfair text-3xl md:text-4xl text-ivory mb-3">{event.name}</h2>
                                           <p className="text-ivory/50 font-inter text-sm max-w-md mx-auto">{event.description}</p>
                                         </div>

                                     {/* Service Selection — Horizontal Row */}
                                     <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
                                       {filteredServices.map((srv, srvIdx) => {
                                         const srvSelected = q.eventServices[event.id]?.includes(srv.id);
                                         return (
                                           <motion.div
                                             key={srv.id}
                                             initial={{ opacity: 0, y: 15 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             transition={{ delay: srvIdx * 0.08, duration: 0.35 }}
                                             onClick={() => {
                                               if (!q.selectedEvents.includes(event.id)) {
                                                 q.toggleEvent(event.id);
                                               }
                                               q.toggleEventService(event.id, srv.id);
                                             }}
                                             className="flex flex-col items-center cursor-pointer group w-24 md:w-28"
                                           >
                                             {/* Icon */}
                                             <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-400 mb-3 ${srvSelected ? 'bg-gold/10 border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]' : 'bg-ivory/5 border border-ivory/10 group-hover:border-ivory/25'}`}>
                                               <span className="text-2xl md:text-3xl">{srv.icon}</span>
                                               {/* Checkmark */}
                                               {srvSelected && (
                                                 <motion.div
                                                   initial={{ scale: 0 }}
                                                   animate={{ scale: 1 }}
                                                   className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center"
                                                 >
                                                   <Check size={12} className="text-noir" />
                                                 </motion.div>
                                               )}
                                             </div>
                                             {/* Name */}
                                             <p className={`font-inter text-[11px] text-center leading-tight mb-2 ${srvSelected ? 'text-gold font-medium' : 'text-ivory/50'}`}>{srv.name}</p>
                                             {/* Price Pill — only show when selected */}
                                             <AnimatePresence>
                                               {srvSelected && (
                                                 <motion.div
                                                   initial={{ opacity: 0, scale: 0.8 }}
                                                   animate={{ opacity: 1, scale: 1 }}
                                                   exit={{ opacity: 0, scale: 0.8 }}
                                                   className="bg-gold text-noir px-3 py-1 rounded-full text-[10px] font-inter font-semibold"
                                                 >
                                                   {formatPrice(srv.price)}
                                                 </motion.div>
                                               )}
                                             </AnimatePresence>
                                           </motion.div>
                                         );
                                       })}
                                     </div>

                                     {/* Navigation */}
                                     <div className="flex flex-col items-center gap-4">
                                       <button
                                         onClick={() => {
                                           setCurrentEventIndex(prev => prev + 1);
                                           setShowServicesForCurrent(false);
                                         }}
                                         className="flex items-center gap-2 bg-gradient-gold text-noir px-8 py-3 rounded-sm font-inter text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-gold/20 transition-all"
                                       >
                                         <Check size={14} /> Next Step
                                       </button>
                                       {currentEventIndex > 0 && (
                                         <button
                                           onClick={() => {
                                             setCurrentEventIndex(prev => prev - 1);
                                             setShowServicesForCurrent(false);
                                           }}
                                           className="flex items-center gap-1 text-gold/60 hover:text-gold font-inter text-xs transition-colors"
                                         >
                                           <ChevronLeft size={14} /> Previous step
                                         </button>
                                       )}
                                       {!isCommonEvent && (
                                         <button
                                           onClick={() => {
                                             q.toggleEvent(event.id);
                                             setCurrentEventIndex(prev => prev + 1);
                                             setShowServicesForCurrent(false);
                                           }}
                                           className="text-red-400/50 hover:text-red-400 font-inter text-xs mt-1 transition-colors"
                                         >
                                           We don't have this event
                                         </button>
                                       )}
                                     </div>

                                     {/* Progress dots */}
                                     <div className="flex justify-center gap-1.5 mt-8">
                                       {weddingEvents.map((_, idx) => (
                                         <div
                                           key={idx}
                                           className={`h-1 rounded-full transition-all duration-400 ${idx === currentEventIndex ? 'w-6 bg-gold' : idx < currentEventIndex ? 'w-1.5 bg-gold/40' : 'w-1.5 bg-ivory/15'}`}
                                         />
                                       ))}
                                     </div>
                                       </div>
                                     )}
                                   </motion.div>
                                 </AnimatePresence>
                               );
                             })()
                           ) : (
                             <motion.div
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               className="text-center py-12"
                             >
                               {/* Running Total Pill */}
                               <div className="flex justify-center mb-8">
                                 <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/20 rounded-full px-6 py-2.5">
                                   <span className="text-ivory/60 font-inter text-xs uppercase tracking-widest">Estimate</span>
                                   <span className="text-gold font-playfair text-xl font-semibold">{formatPrice(q.totalPrice)}</span>
                                 </div>
                               </div>

                               <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                 <Check className="text-gold" size={32} />
                               </div>
                               <h3 className="font-playfair text-2xl text-ivory mb-3">All Events Configured</h3>
                               <p className="text-ivory/50 font-inter text-sm mb-8 max-w-sm mx-auto">
                                 {q.selectedEvents.length > 0 
                                   ? `You've selected ${q.selectedEvents.length} event${q.selectedEvents.length === 1 ? '' : 's'} for coverage.`
                                   : 'No events selected. You can go back to add events.'}
                               </p>
                               <div className="flex flex-col items-center gap-3">
                                 <button
                                   onClick={q.nextStep}
                                   className="flex items-center gap-2 bg-gradient-gold text-noir px-8 py-3 rounded-sm font-inter text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-gold/20 transition-all"
                                 >
                                   <Check size={14} /> Continue
                                 </button>
                                 <button
                                   onClick={() => {
                                     setCurrentEventIndex(0);
                                     setShowServicesForCurrent(false);
                                   }}
                                   className="flex items-center gap-1 text-gold/60 hover:text-gold font-inter text-xs transition-colors"
                                 >
                                   <ChevronLeft size={14} /> Review events
                                 </button>
                               </div>
                             </motion.div>
                           )}
                         </div>
                      ) : (
                        q.selectedServices.map((sId) => {
                          const tiers = packageTiers[sId] || [];
                          return (
                            <div key={sId}>
                              <h3 className="font-playfair text-lg text-ivory mb-4 capitalize">{sId.replace(/([A-Z])/g, ' $1').trim()} Package</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {tiers.map((tier) => {
                                  const sel = q.selectedPackages[sId] === tier.id;
                                  return (
                                    <button key={tier.id} onClick={() => q.selectPackage(sId, tier.id)} className={`p-5 rounded-sm text-left transition-all duration-400 relative ${sel ? 'border-2 border-gold bg-gold/5' : 'border border-ivory/10 hover:border-ivory/20'}`}>
                                      {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gold text-noir text-[10px] font-inter font-bold uppercase tracking-wider rounded-sm">Popular</span>}
                                      <h4 className="font-playfair text-base text-ivory mb-1">{tier.name}</h4>
                                      <p className="text-gold text-lg font-inter font-semibold mb-3">{formatPrice(tier.price)}</p>
                                      <ul className="space-y-1.5">
                                        {tier.features.map((f, i) => (
                                          <li key={i} className="flex items-start gap-2 text-ivory/40 text-xs font-inter">
                                            <Check size={12} className="text-gold mt-0.5 flex-shrink-0" />{f}
                                          </li>
                                        ))}
                                      </ul>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Step 3: Add-ons */}
                  {q.step === 3 && (
                    <div>
                      <h2 className="font-playfair text-heading text-ivory mb-6">Enhance Your Experience</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {q.applicableAddons.map((a) => {
                          const sel = q.selectedAddons.includes(a.id);
                          const isAlbum = a.id === 'pressbook' || a.id === 'magnumalbum';
                          const qty = q.addonQuantities?.[a.id] || 0;
                          return (
                            <div 
                              key={a.id} 
                              onClick={() => {
                                if (!sel) {
                                  q.toggleAddon(a.id);
                                }
                              }}
                              className={`p-5 rounded-sm text-left flex items-start gap-4 transition-all duration-400 relative cursor-pointer ${sel ? 'border-2 border-gold bg-gold/5' : 'border border-ivory/10 hover:border-ivory/20'}`}
                            >
                              <span className="text-2xl mt-0.5">{a.icon}</span>
                              <div className="flex-1">
                                <h4 className="font-inter text-sm text-ivory font-medium">{a.name}</h4>
                                <p className="text-ivory/40 text-xs mt-0.5">{a.description}</p>
                                <p className="text-gold text-sm font-inter font-semibold mt-2">
                                  {isAlbum && qty > 0 ? `${qty} x ${formatPrice(a.price)} = ${formatPrice(a.price * qty)}` : `+${formatPrice(a.price)}`}
                                </p>
                                
                                {isAlbum && sel && (
                                  <div className="flex items-center gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                      onClick={() => q.updateAddonQuantity(a.id, qty - 1)}
                                      className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors text-lg"
                                    >
                                      -
                                    </button>
                                    <span className="text-ivory font-inter font-medium text-sm w-4 text-center">{qty}</span>
                                    <button 
                                      onClick={() => q.updateAddonQuantity(a.id, qty + 1)}
                                      className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors text-lg"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div 
                                onClick={(e) => {
                                  if (sel) {
                                    e.stopPropagation();
                                    q.toggleAddon(a.id);
                                  }
                                }}
                                className={`w-5 h-5 rotate-45 border-[1.5px] flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-400 ${sel ? 'border-gold bg-gold/20' : 'border-ivory/20'}`}
                              >
                                <div className={`w-2 h-2 bg-gold transition-transform duration-400 ${sel ? 'scale-100' : 'scale-0'}`} />
                              </div>
                            </div>
                          );
                        })}
                        {q.applicableAddons.length === 0 && <p className="text-ivory/40 font-inter text-sm col-span-2">No applicable add-ons for selected services. Proceed to next step.</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Event Details */}
                  {q.step === 4 && (
                    <div>
                      <h2 className="font-playfair text-heading text-ivory mb-6">Additional Event Details</h2>
                      <div className="space-y-6 max-w-lg">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="luxury-label mb-0"><MapPin size={12} className="inline mr-1"/> Location *</label>
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-gold/80 hover:text-gold font-inter select-none">
                              <input 
                                type="checkbox" 
                                checked={q.eventDetails.isMultipleLocations || false} 
                                onChange={(e) => {
                                  q.updateEventDetails('isMultipleLocations', e.target.checked);
                                  if (!e.target.checked) {
                                    q.updateEventDetails('locationSecondary', '');
                                  }
                                }}
                                className="accent-gold rounded-sm"
                              />
                              Multiple locations?
                            </label>
                          </div>
                          
                          {!q.eventDetails.isMultipleLocations ? (
                            <input 
                              type="text" 
                              value={q.eventDetails.location} 
                              onChange={(e) => q.updateEventDetails('location', e.target.value)} 
                              className="luxury-input" 
                              placeholder="City / Venue"
                            />
                          ) : (
                            <div className="space-y-3">
                              <input 
                                type="text" 
                                value={q.eventDetails.location} 
                                onChange={(e) => q.updateEventDetails('location', e.target.value)} 
                                className="luxury-input" 
                                placeholder="Groom's Side Location (e.g., Warangal)"
                              />
                              <input 
                                type="text" 
                                value={q.eventDetails.locationSecondary || ''} 
                                onChange={(e) => q.updateEventDetails('locationSecondary', e.target.value)} 
                                className="luxury-input" 
                                placeholder="Bride's Side Location (e.g., Hyderabad)"
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="luxury-label"><MessageSquare size={12} className="inline mr-1"/> Special Requests</label>
                          <textarea value={q.eventDetails.specialRequests} onChange={(e) => q.updateEventDetails('specialRequests', e.target.value)} className="luxury-input min-h-[100px] resize-none" placeholder="Anything specific you'd like us to know..."/>
                        </div>
                        <div>
                          <label className="luxury-label">How did you hear about us?</label>
                          <select value={q.eventDetails.referralSource} onChange={(e) => { q.updateEventDetails('referralSource', e.target.value); if(e.target.value !== 'Reference') q.updateEventDetails('referrerName', ''); }} className="luxury-input bg-noir">
                            <option value="">Select</option>
                            {['Instagram','Facebook','YouTube','Google','Word of Mouth','Wedding Planner','Reference','Other'].map(o=><option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                        {q.eventDetails.referralSource === 'Reference' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <label className="luxury-label">Referrer Name</label>
                            <input 
                              type="text" 
                              value={q.eventDetails.referrerName || ''} 
                              onChange={(e) => q.updateEventDetails('referrerName', e.target.value)} 
                              className="luxury-input" 
                              placeholder="Who referred you?"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review */}
                  {q.step === 5 && (
                    <div>
                      <h2 className="font-playfair text-heading text-ivory mb-6">Review Your Quote</h2>
                      {/* Items */}
                      <div className="space-y-3 mb-8">
                        {q.getQuoteSummary().items.map((item, i) => (
                          <div key={i} className="p-4 border border-ivory/10 rounded-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-sm uppercase font-inter tracking-wider ${item.type==='event' ? 'bg-gold/20 text-gold' : item.type==='package' ? 'bg-gold/10 text-gold' : 'bg-ivory/5 text-ivory/50'}`}>{item.type}</span>
                                <p className="text-ivory font-inter text-sm mt-1 capitalize font-medium">{item.name}</p>
                              </div>
                              <p className="text-gold font-inter font-semibold">{formatPrice(item.price)}</p>
                            </div>
                            {item.type === 'event' && item.services && (
                               <ul className="mt-3 pt-3 border-t border-ivory/10 space-y-1.5">
                                  {item.services.map((srv, idx) => (
                                     <li key={idx} className="flex justify-between text-xs text-ivory/50 font-inter">
                                       <span className="flex items-center gap-1.5"><Check size={10} className="text-gold"/> {srv.name}</span>
                                     </li>
                                  ))}
                               </ul>
                            )}
                          </div>
                        ))}
                      </div>
                      <GoldDivider className="mb-6" width="w-full"/>
                      {/* Customer Info */}
                      <h3 className="font-playfair text-lg text-ivory mb-4">Your Details</h3>
                      <div className="space-y-2 max-w-lg mb-8 text-sm font-inter">
                        <p className="text-ivory/70"><span className="text-ivory/40 inline-block w-24">Name:</span> {q.customerInfo.name}</p>
                        <p className="text-ivory/70"><span className="text-ivory/40 inline-block w-24">Email:</span> {q.customerInfo.email}</p>
                        <p className="text-ivory/70"><span className="text-ivory/40 inline-block w-24">Phone:</span> {q.customerInfo.phone}</p>
                        <p className="text-ivory/70"><span className="text-ivory/40 inline-block w-24">Event Date:</span> {q.eventDetails.date}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-ivory/10">
                {q.step > 1 ? (
                  <button onClick={q.prevStep} className="flex items-center gap-2 text-ivory/50 hover:text-ivory font-inter text-sm transition-colors"><ChevronLeft size={16}/>Back</button>
                ) : <div/>}
                
                {q.step === 1 ? (
                  <div /> // Hide global Next button on step 1, rely on the inline tile button
                ) : q.step < 5 ? (
                  <button onClick={q.nextStep} disabled={!q.canProceed} className={`flex items-center gap-2 px-6 py-3 rounded-sm font-inter text-sm tracking-wide transition-all duration-400 ${q.canProceed?'bg-gradient-gold text-noir hover:shadow-lg hover:shadow-gold/20':'bg-ivory/5 text-ivory/20 cursor-not-allowed'}`}>Next <ChevronRight size={16}/></button>
                ) : (
                  <button onClick={handleSubmit} disabled={!q.canProceed} className={`flex items-center gap-2 px-8 py-3 rounded-sm font-inter text-sm tracking-wide transition-all duration-400 ${q.canProceed?'bg-gradient-gold text-noir hover:shadow-lg hover:shadow-gold/20 animate-pulse-gold':'bg-ivory/5 text-ivory/20 cursor-not-allowed'}`}><Sparkles size={16}/> Submit Quote via WhatsApp</button>
                )}
              </div>
            </div>

            {/* Sidebar - Price Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 p-6 border border-ivory/10 rounded-sm bg-noir-900">
                <h3 className="font-cormorant text-gold text-sm uppercase tracking-[0.2em] mb-4">Quote Summary</h3>
                <GoldDivider className="mb-4" width="w-full"/>
                {q.getQuoteSummary().items.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {q.getQuoteSummary().items.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-inter">
                          <span className={`capitalize font-medium ${item.type === 'event' ? 'text-gold' : 'text-ivory/70'}`}>{item.name}</span>
                          <span className={item.type === 'event' ? 'text-gold font-medium' : 'text-ivory/70'}>{formatPrice(item.price)}</span>
                        </div>
                        {item.type === 'event' && item.services && (
                          <div className="pl-1.5 border-l border-ivory/10 space-y-1">
                            {item.services.map((srv, idx) => (
                              <div key={idx} className="flex justify-between text-[10px] text-ivory/40 font-inter">
                                <span>- {srv.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-ivory/30 text-xs font-inter mb-6">Select services to see pricing.</p>
                )}
                <GoldDivider className="mb-4" width="w-full"/>
                <div className="flex justify-between items-center">
                  <span className="text-ivory/60 text-sm font-inter">Total</span>
                  <span className="text-gold font-playfair text-2xl">{formatPrice(q.totalPrice)}</span>
                </div>
                {q.totalPrice > 0 && <p className="text-ivory/20 text-[10px] font-inter mt-2 text-right">*Prices are indicative. Final quote may vary.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BuildQuote;
