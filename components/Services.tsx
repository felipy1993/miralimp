import { type FC } from 'react';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';

const Services: FC = () => {
  return (
    <section id="servicos" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-900/10 rounded-full blur-[120px]"></div>

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
              className="bg-brand-navy-900 border border-brand-navy-700/50 p-8 hover:border-brand-gold/40 transition-all duration-500 group rounded-xl shadow-lg hover:shadow-brand-gold/10 relative overflow-hidden"
            >
              {/* Animated background glow on hover */}
              <div className="absolute -inset-24 bg-brand-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 mb-8 relative">
                  {/* Decorative layers for the icon */}
                  <div className="absolute inset-0 bg-gold-gradient rounded-xl opacity-20 blur-sm group-hover:blur-md transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-brand-navy-800 rounded-xl border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-all duration-500 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <service.icon className="w-8 h-8 text-brand-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10" />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors duration-300">{service.title}</h4>
                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className="w-0 h-1 bg-gold-gradient mt-8 transition-all duration-500 group-hover:w-full rounded-full opacity-50"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;