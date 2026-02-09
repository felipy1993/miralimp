import React from 'react';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-3 block"
          >
            Nossas Especialidades
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white font-serif"
          >
            Soluções Premium em Limpeza
          </motion.h3>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-1 bg-gold-gradient mx-auto mt-6"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-brand-navy-900 border border-brand-navy-700 p-8 hover:border-brand-gold/40 transition-all duration-300 group rounded-sm shadow-lg hover:shadow-brand-gold/5"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-navy-800 to-black rounded-lg border border-brand-navy-700 flex items-center justify-center mb-8 group-hover:border-brand-gold/50 transition-colors duration-300 shadow-inner">
                <service.icon className="w-8 h-8 text-brand-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300">
                {service.description}
              </p>
              
              {/* Thin gold line at bottom on hover */}
              <div className="w-0 h-0.5 bg-brand-gold mt-6 transition-all duration-300 group-hover:w-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;