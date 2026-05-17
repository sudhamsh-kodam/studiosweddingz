import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteBuilder } from '../hooks/useQuoteBuilder';
import { quoteServices, packageTiers, addons } from '../data/quoteOptions';
import { Check, ChevronRight, ChevronLeft, Sparkles, ArrowRight, Calendar, MapPin, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import GoldDivider from '../components/ui/GoldDivider';

const stepNames = ['Select Services', 'Choose Package', 'Add Extras', 'Event Details', 'Review & Submit'];

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
  const q = useQuoteBuilder();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (q.canProceed) {
      const summary = q.getQuoteSummary();
      const msg = `Hi StudioSweddingz! Here's my custom quote:\n\n${summary.items.map(i=>`• ${i.name}: ${formatPrice(i.price)}`).join('\n')}\n\nTotal: ${formatPrice(summary.total)}\n\nName: ${summary.customerInfo.name}\nEmail: ${summary.customerInfo.email}\nPhone: ${summary.customerInfo.phone}\nDate: ${summary.eventDetails.date}\nLocation: ${summary.eventDetails.location}`;
      window.open(`https://wa.me/919121498939?text=${encodeURIComponent(msg)}`, '_blank');
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
      <div className="max-container section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">Custom Quote</p>
          <h1 className="font-playfair text-display text-ivory mb-2">Build Your Quote</h1>
          <p className="text-ivory/50 text-sm font-inter max-w-xl mx-auto">Create a personalized photography package tailored to your needs.</p>
        </motion.div>

        <StepIndicator step={q.step} />

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
                      <h2 className="font-playfair text-heading text-ivory mb-6">What are you looking for?</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quoteServices.map((s) => {
                          const selected = q.selectedServices.includes(s.id);
                          return (
                            <button key={s.id} onClick={() => q.toggleService(s.id)} className={`p-6 rounded-sm text-left transition-all duration-400 ${selected ? 'border-2 border-gold bg-gold/5' : 'border border-ivory/10 hover:border-ivory/20'}`}>
                              <span className="text-3xl mb-3 block">{s.icon}</span>
                              <h3 className="font-playfair text-lg text-ivory mb-1">{s.name}</h3>
                              <p className="text-ivory/40 text-xs font-inter mb-2">{s.description}</p>
                              <p className="text-gold text-sm font-inter">Starting at {formatPrice(s.startingPrice)}</p>
                              {selected && <Check size={20} className="text-gold mt-2" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Packages */}
                  {q.step === 2 && (
                    <div className="space-y-10">
                      {q.selectedServices.map((sId) => {
                        const tiers = packageTiers[sId] || [];
                        return (
                          <div key={sId}>
                            <h3 className="font-playfair text-lg text-ivory mb-4 capitalize">{sId} Package</h3>
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
                      })}
                    </div>
                  )}

                  {/* Step 3: Add-ons */}
                  {q.step === 3 && (
                    <div>
                      <h2 className="font-playfair text-heading text-ivory mb-6">Enhance Your Experience</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {q.applicableAddons.map((a) => {
                          const sel = q.selectedAddons.includes(a.id);
                          return (
                            <button key={a.id} onClick={() => q.toggleAddon(a.id)} className={`p-5 rounded-sm text-left flex items-start gap-4 transition-all duration-400 ${sel ? 'border-2 border-gold bg-gold/5' : 'border border-ivory/10 hover:border-ivory/20'}`}>
                              <span className="text-2xl">{a.icon}</span>
                              <div className="flex-1">
                                <h4 className="font-inter text-sm text-ivory font-medium">{a.name}</h4>
                                <p className="text-ivory/40 text-xs mt-0.5">{a.description}</p>
                                <p className="text-gold text-sm font-inter font-semibold mt-2">+{formatPrice(a.price)}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 ${sel ? 'border-gold bg-gold' : 'border-ivory/20'}`}>
                                {sel && <Check size={12} className="text-noir" />}
                              </div>
                            </button>
                          );
                        })}
                        {q.applicableAddons.length === 0 && <p className="text-ivory/40 font-inter text-sm col-span-2">No applicable add-ons for selected services. Proceed to next step.</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Event Details */}
                  {q.step === 4 && (
                    <div>
                      <h2 className="font-playfair text-heading text-ivory mb-6">Event Details</h2>
                      <div className="space-y-6 max-w-lg">
                        <div>
                          <label className="luxury-label"><Calendar size={12} className="inline mr-1"/> Event Date *</label>
                          <input type="date" value={q.eventDetails.date} onChange={(e) => q.updateEventDetails('date', e.target.value)} className="luxury-input bg-noir"/>
                        </div>
                        <div>
                          <label className="luxury-label"><MapPin size={12} className="inline mr-1"/> Location *</label>
                          <input type="text" value={q.eventDetails.location} onChange={(e) => q.updateEventDetails('location', e.target.value)} className="luxury-input" placeholder="City / Venue"/>
                        </div>
                        <div>
                          <label className="luxury-label">Number of Days</label>
                          <input type="number" min="1" max="10" value={q.eventDetails.numberOfDays} onChange={(e) => q.updateEventDetails('numberOfDays', parseInt(e.target.value)||1)} className="luxury-input bg-noir"/>
                        </div>
                        <div>
                          <label className="luxury-label"><MessageSquare size={12} className="inline mr-1"/> Special Requests</label>
                          <textarea value={q.eventDetails.specialRequests} onChange={(e) => q.updateEventDetails('specialRequests', e.target.value)} className="luxury-input min-h-[100px] resize-none" placeholder="Anything specific you'd like us to know..."/>
                        </div>
                        <div>
                          <label className="luxury-label">How did you hear about us?</label>
                          <select value={q.eventDetails.referralSource} onChange={(e) => q.updateEventDetails('referralSource', e.target.value)} className="luxury-input bg-noir">
                            <option value="">Select</option>
                            {['Instagram','YouTube','Google','Word of Mouth','Wedding Planner','Other'].map(o=><option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
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
                          <div key={i} className="flex justify-between items-center p-4 border border-ivory/10 rounded-sm">
                            <div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-sm uppercase font-inter tracking-wider ${item.type==='package'?'bg-gold/10 text-gold':'bg-ivory/5 text-ivory/50'}`}>{item.type}</span>
                              <p className="text-ivory font-inter text-sm mt-1 capitalize">{item.name}</p>
                            </div>
                            <p className="text-gold font-inter font-semibold">{formatPrice(item.price)}</p>
                          </div>
                        ))}
                      </div>
                      <GoldDivider className="mb-6" width="w-full"/>
                      {/* Customer Info */}
                      <h3 className="font-playfair text-lg text-ivory mb-4">Your Details</h3>
                      <div className="space-y-4 max-w-lg mb-8">
                        {[['name','Full Name','text','Your name'],['email','Email','email','your@email.com'],['phone','Phone','tel','+91 98765 43210']].map(([f,l,t,p])=>(
                          <div key={f}>
                            <label className="luxury-label">{l} *</label>
                            <input type={t} value={q.customerInfo[f]} onChange={(e)=>q.updateCustomerInfo(f,e.target.value)} className="luxury-input" placeholder={p}/>
                          </div>
                        ))}
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
                {q.step < 5 ? (
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
                  <div className="space-y-3 mb-6">
                    {q.getQuoteSummary().items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs font-inter">
                        <span className="text-ivory/50 capitalize">{item.name}</span>
                        <span className="text-ivory/70">{formatPrice(item.price)}</span>
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
