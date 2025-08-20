import React from "react";

import { motion } from "framer-motion";
import imgLeft from "../../assets/wcom1.webp";
import imgRight from "../../assets/wcom2.webp";

const Community: React.FC = () => {
  return (
    <div className="bg-black text-white w-full mx-auto min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 overflow-x-hidden">
      <div className="relative flex justify-center items-center w-full md:w-1/2 h-[400px] md:h-[500px]">
        <motion.img
          src={imgRight}
          alt="Community Right"
          className="w-64 md:w-80 border border-neutral-400 border-r-1 shadow-xl relative z-10 left-20 md:left-5"
          initial={{ x: -30, opacity: 0.2 }}
          whileInView={{ x: 120, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        
        <motion.img
          src={imgLeft}
          alt="Community Left"
          className="w-64 md:w-80 border border-neutral-400 border-r-1 shadow-xl relative z-10
                    left-[0%] -translate-x-1/2 top-[20%] -translate-y-1/2*
                    md:left-[35%] md:top-[15%] md:-translate-x-1/2 md:-translate-y-1/2"
          initial={{ x: -10, opacity: 0.2 }}
          whileInView={{ x: -200, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <div className="w-full md:w-5/12 flex justify-center items-center text-center md:text-right mt-8 md:mt-0">
        <motion.h2 
          initial={{ y: 80, opacity: 0.2 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl font-bold italic">
          W MERCH COMMUNITY
        </motion.h2>
      </div>
    </div>
  );
};

export default Community;
