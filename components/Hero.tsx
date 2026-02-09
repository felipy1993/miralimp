import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_LINK } from '../constants';
import { Check, ArrowRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-brand-navy-900 overflow-hidden pt-20">
      {/* Background Image with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Sala luxuosa limpa" 
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        {/* Dark Gradient Overlay - Azul Marinho para Preto */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900 via-brand-navy-900/95 to-brand-navy-900/60"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-brand-navy-800/80 border border-brand-gold/30 backdrop-blur-md mb-8">
               <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
               <span className="text-brand-gold text-xs font-bold tracking-widest uppercase">Referência em Mirassol e Região</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-sans">
              Excelência em <br />
              <span className="text-transparent bg-clip-text bg-gold-gradient font-serif italic pr-2">Higienização</span>
              de Estofados
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
              Transforme seu ambiente com a limpeza profunda da <strong className="text-white">Miralimp</strong>. 
              Métodos exclusivos que eliminam ácaros e devolvem a beleza original do seu móvel com segurança total.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-5 bg-gold-gradient text-brand-navy-900 font-bold text-lg rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3"
            >
              Solicitar Orçamento VIP
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#servicos"
              className="px-8 py-5 bg-white/5 text-white font-medium rounded-sm backdrop-blur-sm border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all flex items-center justify-center tracking-wide"
            >
              Conhecer Serviços
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-navy-800 border border-brand-gold/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-brand-gold" />
              </div>
              <span>Atendimento em Domicílio</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-navy-800 border border-brand-gold/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-brand-gold" />
              </div>
              <span>Secagem Rápida</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-navy-800 border border-brand-gold/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-brand-gold" />
              </div>
              <span>Produtos Premium</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1 flex justify-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-brand-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;