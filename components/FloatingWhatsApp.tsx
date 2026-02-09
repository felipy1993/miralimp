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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-secondary-500 text-white rounded-full shadow-2xl hover:bg-secondary-600 transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute -top-2 -right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;