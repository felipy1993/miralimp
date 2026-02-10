import React from 'react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';
import { useSiteData } from '../context/SiteContentContext';

const BeforeAfter: React.FC = () => {
  const { content } = useSiteData();
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {content.projects && content.projects.map((project, index) => (
              <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-6"
              >
                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-brand-navy-800">
                    <BeforeAfterSlider 
                        beforeImg={project.before}
                        afterImg={project.after}
                    />
                  </div>
                  <div className="p-6 bg-brand-navy-800/50 backdrop-blur-sm border-l-4 border-brand-gold">
                      <h4 className="font-bold text-xl text-white font-serif">{project.title}</h4>
                      <p className="text-sm text-gray-400 mt-2">{project.description}</p>
                  </div>
              </motion.div>
            ))}

            {(!content.projects || content.projects.length === 0) && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Aguardando a inserção de novos resultados...
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;