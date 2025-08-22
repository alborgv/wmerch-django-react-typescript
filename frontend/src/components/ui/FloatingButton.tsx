import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingButton: React.FC<FloatingButtonProps> = ({ phoneNumber, message }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div>
      <motion.a
        
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center z-[9999]"
        aria-label="Chat con nosotros en WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </motion.a>
    </div>
  );
};

export default FloatingButton;