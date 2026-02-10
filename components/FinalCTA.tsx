import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteContentContext';

const FinalCTA: React.FC = () => {
  const { content } = useSiteData();
  const whatsappLink = `https://wa.me/${content.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <section className="py-32 bg-brand-black text-center relative overflow-hidden border-t border-brand-navy-900">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-navy-900 via-brand-black to-brand-black opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif">
          Seu estofado merece o <br/> <span className="text-transparent bg-clip-text bg-gold-gradient">padrão {content.companyName.split(' ')[0]}</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 font-light">
          Agende agora e receba um orçamento personalizado em menos de 5 minutos.
        </p>
        
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-brand-gold text-brand-navy-900 font-bold py-5 px-12 rounded-sm text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
          CHAMAR NO WHATSAPP
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="mt-6 text-sm text-gray-500 uppercase tracking-widest">Atendimento Rápido • Segunda a Sábado</p>
      </div>
    </section>
  );
};

export default FinalCTA;