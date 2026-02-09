import { type FC } from 'react';
import { COMPANY_NAME, REGION, INSTAGRAM_LINK, PHONE_DISPLAY, PHONE_LINK } from '../constants';
import { Instagram, MapPin, Phone, Clock, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-brand-black text-gray-400 pt-20 pb-10 border-t border-brand-navy-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="Miralimp Logo" className="w-10 h-10 object-contain rounded-full border border-brand-gold/30 bg-brand-navy-900" />
                <div className="text-2xl font-bold tracking-tight font-serif text-white">
                    Mira<span className="text-brand-gold">limp</span>
                </div>
             </div>
             <p className="text-sm leading-relaxed mb-6 text-gray-500">
               Referência em higienização de estofados em Mirassol e Região. Comprometidos com a excelência e a satisfação total de nossos clientes.
             </p>
             <div className="flex gap-4">
               <a 
                href={INSTAGRAM_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                title="Siga-nos no Instagram"
               >
                <Instagram size={18} />
               </a>
             </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#servicos" className="hover:text-brand-gold transition-colors">Serviços</a></li>
              <li><a href="#diferenciais" className="hover:text-brand-gold transition-colors">Diferenciais</a></li>
              <li><a href="#resultados" className="hover:text-brand-gold transition-colors">Portfolio</a></li>
              <li><a href="#depoimentos" className="hover:text-brand-gold transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Informações de Contato</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Telefone / WhatsApp</span>
                    <a href={PHONE_LINK} className="hover:text-brand-gold transition-colors font-medium">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Email</span>
                    <span>contato@miralimp.com.br</span>
                  </div>
                </li>
              </ul>
              <ul className="space-y-4 text-sm">
                 <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Localização</span>
                    <span>{REGION}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Horário</span>
                    <span>Seg-Sáb: 08:00 - 18:00</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.</p>
            {/* Subtle hidden Admin link */}
            <button 
              onClick={onAdminClick}
              className="opacity-0 hover:opacity-10 transition-opacity ml-2 p-1 text-white flex items-center justify-center" 
              title="Acesso Restrito"
            >
              <Lock size={10} />
            </button>
          </div>
          <p>Desenvolvido com excelência.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;