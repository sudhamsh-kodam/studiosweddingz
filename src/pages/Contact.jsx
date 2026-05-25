import { useState } from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../utils/animations';
import Button from '../components/ui/Button';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { InstagramIcon as Instagram, YoutubeIcon as Youtube } from '../components/ui/BrandIcons';
import heroWedding from '../assets/images/hero-wedding.png';

const Contact = () => {
  const [form, setForm] = useState({ name:'',email:'',phone:'',eventType:'',date:'',message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleSubmit = (ev) => { ev.preventDefault(); if (validate()) setSubmitted(true); };
  const handleChange = (f,v) => { setForm(p=>({...p,[f]:v})); if(errors[f]) setErrors(p=>({...p,[f]:''})); };

  return (
    <main>
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={heroWedding} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}>
            <p className="font-cormorant text-gold text-sm uppercase tracking-[0.4em] mb-4">Let's Connect</p>
            <h1 className="font-playfair text-display-lg text-ivory">Say Hello</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding-y bg-noir">
        <div className="max-container section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{once:true}}>
            {submitted ? (
              <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="text-center py-20">
                <CheckCircle size={64} className="text-gold mx-auto mb-6" />
                <h2 className="font-playfair text-display text-ivory mb-4">Thank You!</h2>
                <p className="text-ivory/60 font-inter">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="font-playfair text-heading text-ivory mb-2">Send Us a Message</h2>
                <p className="text-ivory/50 text-sm font-inter mb-8">Tell us about your dream shoot.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[['name','Your Name *','text','John Doe'],['email','Email *','email','john@example.com']].map(([f,l,t,p])=>(
                      <div key={f}>
                        <label className="luxury-label">{l}</label>
                        <input type={t} value={form[f]} onChange={e=>handleChange(f,e.target.value)} className={`luxury-input ${errors[f]?'border-red-500':''}`} placeholder={p}/>
                        {errors[f]&&<p className="text-red-400 text-xs mt-1">{errors[f]}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="luxury-label">Phone *</label>
                      <input type="tel" value={form.phone} onChange={e=>handleChange('phone',e.target.value)} className={`luxury-input ${errors.phone?'border-red-500':''}`} placeholder="+91 98765 43210"/>
                      {errors.phone&&<p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="luxury-label">Event Type</label>
                      <select value={form.eventType} onChange={e=>handleChange('eventType',e.target.value)} className="luxury-input bg-noir">
                        <option value="">Select type</option>
                        {['Wedding','Maternity','Newborn','Baby Milestone','Fashion','Other'].map(o=><option key={o} value={o.toLowerCase()}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="luxury-label">Event Date</label>
                    <input type="date" value={form.date} onChange={e=>handleChange('date',e.target.value)} className="luxury-input bg-noir"/>
                  </div>
                  <div>
                    <label className="luxury-label">Message *</label>
                    <textarea value={form.message} onChange={e=>handleChange('message',e.target.value)} className={`luxury-input min-h-[120px] resize-none ${errors.message?'border-red-500':''}`} placeholder="Tell us about your vision..."/>
                    {errors.message&&<p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" variant="primary" size="lg" icon className="w-full sm:w-auto"><Send size={16}/> Send Inquiry</Button>
                </form>
              </>
            )}
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{once:true}}>
            <h2 className="font-playfair text-heading text-ivory mb-2">Get In Touch</h2>
            <p className="text-ivory/50 text-sm font-inter mb-10">Reach out through any channel below.</p>
            <div className="space-y-8">
              {[{icon:Phone,label:'Phone',text:'+91 91000 97900 / 70138 77610',href:'tel:+919100097900'},{icon:Mail,label:'Email',text:'hello@studiosweddingz.com',href:'mailto:hello@studiosweddingz.com'},{icon:MapPin,label:'Studio',text:'studiosweddingz, chilkanagar'}].map(({icon:Icon,label,text,href},i)=>(
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center"><Icon size={18} className="text-gold"/></div>
                  <div>
                    <p className="text-gold text-xs font-cormorant uppercase tracking-[0.15em] mb-1">{label}</p>
                    {href?<a href={href} className="text-ivory/70 font-inter text-sm hover:text-ivory transition-colors">{text}</a>:<p className="text-ivory/70 font-inter text-sm">{text}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <p className="text-gold text-xs font-cormorant uppercase tracking-[0.15em] mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[{icon:Instagram,href:'https://instagram.com/studiosweddingz'},{icon:Youtube,href:'https://youtube.com/@studiosweddingz'}].map(({icon:Icon,href},i)=>(
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-ivory/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all duration-400"><Icon size={16}/></a>
                ))}
              </div>
            </div>
            <div className="mt-10 aspect-video rounded-sm overflow-hidden border border-ivory/10">
              <iframe src="https://maps.google.com/maps?q=studiosweddingz%20chilkanagar&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{border:0,filter:'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)'}} allowFullScreen loading="lazy" title="Studio Location"/>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default Contact;
