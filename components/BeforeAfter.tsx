import React from 'react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

const BeforeAfter: React.FC = () => {
  return (
    <section id="resultados" className="py-24 bg-brand-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-navy-800/20"></div>
      
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Portfólio Real</span>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4">Resultados Surpreendentes</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Arraste o slider para ver a diferença que uma higienização profissional faz no seu estofado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Case 1 */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6"
            >
                <BeforeAfterSlider 
                    beforeImg="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    afterImg="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />
                <div className="p-6 bg-brand-navy-800/50 backdrop-blur-sm border-l-4 border-brand-gold">
                    <h4 className="font-bold text-xl text-white font-serif">Restauração de Sofá Retrátil</h4>
                    <p className="text-sm text-gray-400 mt-2">Remoção total de manchas de uso e recuperação da cor original.</p>
                </div>
            </motion.div>

            {/* Case 2 */}
            <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-col gap-6"
            >
                <BeforeAfterSlider 
                    beforeImg="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    afterImg="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />
                <div className="p-6 bg-brand-navy-800/50 backdrop-blur-sm border-l-4 border-brand-gold">
                    <h4 className="font-bold text-xl text-white font-serif">Higienização de Conjunto de Jantar</h4>
                    <p className="text-sm text-gray-400 mt-2">Eliminação de ácaros e revitalização profunda do tecido.</p>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;