import { type FC } from 'react';
import { Instagram, MapPin, Phone, Clock, Mail, Settings } from 'lucide-react';
import { useSiteData } from '../context/SiteContentContext';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: FC<FooterProps> = ({ onAdminClick }) => {
  const { content } = useSiteData();
  const phoneLink = `https://wa.me/${content.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(content.whatsappMessage || '')}`;

  return (
    <footer className="bg-brand-black text-gray-400 pt-20 pb-10 border-t border-brand-navy-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <img src={content.logoImage} alt="Logo" className="w-10 h-10 object-contain rounded-full border border-brand-gold/30 bg-brand-navy-900" />
                <div className="text-2xl font-bold tracking-tight font-serif text-white">
                    {content.companyName.split(' ')[0]}<span className="text-brand-gold">{content.companyName.split(' ').slice(1).join(' ')}</span>
                </div>
             </div>
             <p className="text-sm leading-relaxed mb-6 text-gray-500">
               Referência em higienização de estofados em {content.region}. Comprometidos com a excelência e a satisfação total de nossos clientes.
             </p>
             <div className="flex gap-4">
               <a 
                href={content.instagramLink} 
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
                    <a href={phoneLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors font-medium">
                      {content.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Email</span>
                    <span>{content.email}</span>
                  </div>
                </li>
              </ul>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Localização</span>
                    <span>{content.region}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-white mb-1">Horário</span>
                    <span>{content.businessHours}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} {content.companyName}. Todos os direitos reservados.</p>
            {/* Visible Admin Access Button */}
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-1.5 text-gray-700 hover:text-brand-gold transition-colors border border-gray-800/30 px-2 py-1 rounded" 
            >
              <Settings size={12} />
              <span>Acesso Admin</span>
            </button>
          </div>
          <p>Desenvolvido com excelência.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;