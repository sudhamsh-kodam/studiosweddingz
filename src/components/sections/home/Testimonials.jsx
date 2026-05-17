import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import SectionHeading from '../../ui/SectionHeading';
import { testimonials } from '../../../data/testimonials';

const Testimonials = () => {
  return (
    <section className="section-padding-y bg-noir relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

      <div className="max-container section-padding relative z-10">
        <SectionHeading
          subtitle="Testimonials"
          title="Words From Our Clients"
          description="Every review is a love letter to the moments we've captured together."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, bulletActiveClass: 'swiper-pagination-bullet-active !bg-gold !opacity-100', bulletClass: 'swiper-pagination-bullet !bg-ivory/20 !opacity-100 !w-2 !h-2 !mx-1' }}
            loop
            className="testimonial-swiper"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="text-center px-4 pb-12">
                  <Quote size={40} className="text-gold/20 mx-auto mb-6" />
                  <blockquote className="font-cormorant text-xl md:text-2xl lg:text-3xl text-ivory/90 italic leading-relaxed mb-8 max-w-3xl mx-auto">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <h4 className="font-playfair text-lg text-ivory mb-1">{t.name}</h4>
                  <p className="text-gold text-xs font-cormorant uppercase tracking-[0.2em]">
                    {t.event} • {t.location}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
