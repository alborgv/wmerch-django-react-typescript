import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import horizontalBanner from "../../assets/banner_beige_horizontal_3024x.jpg";

const Message: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 1500); 
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white flex items-center justify-center overflow-hidden px-6">
      {/* Fondo animado con blur */}
      <motion.img
        src={horizontalBanner}
        alt="Banner de fondo"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm z-0"
      />

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative z-10 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 400 }}
          whileHover={{
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.6 },
          }}
          className="mb-4"
        >
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto drop-shadow-md" />
        </motion.div>

        <h1 className="text-2xl font-bold tracking-wide mb-2">
          ¡Pago exitoso!
        </h1>
        <p className="text-neutral-300 text-sm mb-8">
          Gracias por tu compra. Puedes regresar al inicio.
        </p>

        {/* Botón o Loader según estado */}
        {isLoading ? (
          <motion.div
            className="w-6 h-6 border-2 border-t-transparent border-green-400 rounded-full mx-auto animate-spin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoHome}
            className="inline-block border border-green-500 hover:bg-green-400 text-slate-200 text-sm font-semibold py-2 px-5 rounded-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
          >
            Volver al inicio
          </motion.button>
        )}

        {/* Detalles decorativos */}
        <div className="absolute -top-5 -right-5 w-20 h-20 bg-green-500 opacity-10 rotate-45 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500 opacity-10 rotate-12 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
};

export default Message;
