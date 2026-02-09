import React from 'react';
import { WHATSAPP_LINK } from '../constants';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingWhatsApp: React.FC = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all overflow-visible"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute -top-1 -right-1 flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;