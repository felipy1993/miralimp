import React from 'react';
import { PROCESS_STEPS } from '../constants';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  return (
    <section id="processo" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
           <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Fluxo de Trabalho</span>
          <h3 className="text-3xl md:text-5xl font-bold text-brand-navy-900 font-serif">Simples, Rápido e Eficiente</h3>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-100">
             <div className="h-full bg-brand-gold/30 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-gray-50 group-hover:border-brand-gold transition-colors duration-500 mb-6 shadow-xl relative">
                   <div className="absolute inset-2 rounded-full border border-dashed border-gray-300 group-hover:border-brand-gold/50 transition-colors"></div>
                   <span className="text-3xl font-serif font-bold text-brand-navy-900 group-hover:text-brand-gold transition-colors">{step.id}</span>
                </div>
                
                <h4 className="text-xl font-bold text-brand-navy-900 mb-3">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed px-4">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;