import React from 'react';
import { FEATURES } from '../constants';
import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';

const WhyChooseUs: React.FC = () => {
  const { content } = useSiteContent();
  return (
    <section id="diferenciais" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-black to-transparent opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Por que a Miralimp?</span>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-navy-900 mb-8 font-serif">
              Qualidade que você <br/>pode confiar
            </h3>
            <p className="text-gray-600 mb-10 text-lg font-light leading-relaxed">
              Não entregamos apenas limpeza, entregamos saúde e renovação. Cada detalhe do nosso processo foi pensado para garantir a máxima eficiência sem danificar seus bens.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col gap-4 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-brand-navy-900 border border-brand-gold/20 flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 group-hover:border-brand-gold group-hover:shadow-brand-gold/10 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <feature.icon className="w-7 h-7 text-brand-gold group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-navy-900 mb-2 group-hover:text-brand-gold transition-colors">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image composition */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="absolute inset-0 border-2 border-brand-gold transform translate-x-4 translate-y-4 z-0"></div>
              <img 
                src={content.whyChooseUsImage} 
                alt="Profissional Miralimp" 
                className="relative z-10 w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-brand-navy-900 p-6 shadow-xl z-20 max-w-xs border-t-4 border-brand-gold">
                <p className="text-white font-serif italic text-lg">"{content.whyChooseUsQuote}"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;