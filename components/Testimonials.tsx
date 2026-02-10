import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContentContext';

const Testimonials: React.FC = () => {
  const { content } = useSiteData();
  const testimonials = content.testimonials || [];

  return (
    <section id="depoimentos" className="py-24 bg-brand-black text-white relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-navy-800/30 blur-[100px] rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Confiança</span>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-serif">O que dizem nossos clientes</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-navy-900/50 backdrop-blur-md p-8 border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300 relative group"
            >
              <div className="absolute -top-4 left-8 bg-brand-black p-2 border border-brand-gold/20 rounded-full">
                <Quote className="text-brand-gold w-6 h-6" />
              </div>
              
              <div className="flex gap-1 mb-6 mt-2">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                ))}
              </div>
              
              <p className="text-gray-300 italic mb-8 leading-relaxed text-sm font-light">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center text-brand-navy-900 font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm uppercase tracking-wide">{testimonial.name}</span>
                  <span className="text-brand-gold text-xs">{testimonial.service}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum depoimento cadastrado ainda.
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;