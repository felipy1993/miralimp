import React from 'react';
import { FEATURES } from '../constants';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
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
                  className="flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-navy-900 flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                    <feature.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-navy-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
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
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                alt="Profissional Miralimp" 
                className="relative z-10 w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-brand-navy-900 p-6 shadow-xl z-20 max-w-xs border-t-4 border-brand-gold">
                <p className="text-white font-serif italic text-lg">"Higienizar é um ato de carinho com sua família."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;