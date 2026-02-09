import { useState, type FC } from 'react';
import { FAQ_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-brand-navy-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">Dúvidas Frequentes</span>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6">Perguntas Comuns</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre nosso processo de higienização e cuidados com seus estofados.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="border border-white/10 rounded-lg bg-brand-navy-800/50 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-brand-gold shrink-0" />
                  <span className="text-lg font-medium text-white group-hover:text-brand-gold transition-colors">
                    {item.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-brand-gold transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 ml-9">
                      <p className="text-gray-400 leading-relaxed border-l-2 border-brand-gold/30 pl-4">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Ainda tem dúvidas? Fale conosco agora mesmo.</p>
          <a 
            href="#contato"
            className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
          >
            Acessar canais de atendimento 
            <ChevronDown className="-rotate-90 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
