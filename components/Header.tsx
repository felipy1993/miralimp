import { useState, useEffect, type FC } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';
import { COMPANY_SUBTITLE, WHATSAPP_LINK } from '../constants';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { content } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Serviços', href: '#servicos' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Depoimentos', href: '#depoimentos' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-brand-navy-900/95 backdrop-blur-md border-brand-gold/20 py-3 shadow-lg' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-4 group cursor-pointer">
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <img 
              src="/logo.png" 
              alt="Miralimp Logo" 
              className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-2xl rounded-full bg-brand-navy-800 border border-brand-gold/30"
            />
            <div className="absolute inset-0 bg-brand-gold/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl md:text-3xl font-bold tracking-tight font-serif">
              <span className="text-white group-hover:text-gray-200 transition-colors">Mira</span>
              <span className="text-transparent bg-clip-text bg-gold-gradient">limp</span>
            </div>
            <span className="text-[10px] md:text-xs text-brand-gold/80 uppercase tracking-[0.2em]">
              {COMPANY_SUBTITLE}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-brand-gold transition-colors uppercase tracking-widest relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gold-gradient text-brand-navy-900 rounded-sm font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300 uppercase tracking-wide text-sm"
          >
            Orçamento
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-brand-gold border border-brand-gold/30 rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-navy-900 border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-gray-200 font-medium py-3 border-b border-gray-800 hover:text-brand-gold hover:pl-2 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient text-brand-navy-900 py-4 rounded text-center font-bold uppercase tracking-wide mt-4"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;