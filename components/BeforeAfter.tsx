import React from 'react';
import { motion } from 'framer-motion';

const BeforeAfter: React.FC = () => {
  return (
    <section id="resultados" className="py-24 bg-brand-navy-900 relative">
      <div className="absolute inset-0 bg-brand-navy-800/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Portfólio</span>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-serif">Resultados Surpreendentes</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Case 1 */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
            >
                <div className="bg-white p-2 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="relative h-80 overflow-hidden bg-gray-200">
                        {/* Imagem Antes (Base) */}
                        <img 
                            src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Antes e Depois Sofá" 
                            className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700"
                        />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 uppercase tracking-wider border border-white/20">
                            Antes
                        </div>
                        <div className="absolute top-4 right-4 bg-brand-gold text-brand-navy-900 text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-lg">
                            Depois
                        </div>
                        
                        {/* Split effect simulated with a slider line or simple hover reveal could go here, 
                            but a clean side-by-side or hover-to-color is elegant too. 
                            Let's do a diagonal split overlay for style. */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6 bg-white border-t-4 border-brand-gold">
                        <h4 className="font-bold text-xl text-brand-navy-900 font-serif">Restauração de Sofá Retrátil</h4>
                        <p className="text-sm text-gray-500 mt-2">Remoção total de manchas de uso e recuperação da cor original.</p>
                    </div>
                </div>
            </motion.div>

            {/* Case 2 */}
            <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="group relative"
            >
                <div className="bg-white p-2 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="relative h-80 overflow-hidden bg-gray-200">
                         <img 
                            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Antes e Depois Cadeira" 
                            className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 uppercase tracking-wider border border-white/20">
                            Antes
                        </div>
                        <div className="absolute top-4 right-4 bg-brand-gold text-brand-navy-900 text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-lg">
                            Depois
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6 bg-white border-t-4 border-brand-gold">
                        <h4 className="font-bold text-xl text-brand-navy-900 font-serif">Cadeiras de Jantar de Luxo</h4>
                        <p className="text-sm text-gray-500 mt-2">Higienização profunda para remoção de ácaros e odores.</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;