import React from "react";

import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"

const images = import.meta.glob("../../assets/history/*.{png,jpg,jpeg,avif,webp}", {
        eager: true,
        as: "url",
    })

const CarouselHistory = () => {
    

      const imageUrls = Object.values(images)
    return (

        <div className="py-14 bg-black">
            
            <motion.h1 
            
            initial={{ y: 20, opacity: 0.2 }}
            whileInView={{ y: -20, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-white text-center font-libre font-light text-2xl mb-10">HISTORIAL PIEZAS DE COLECCIÓN</motion.h1>
            <Marquee gradient={false} speed={60}>
            {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`History ${index}`}
          className="w-60 h-auto rounded-lg object-cover border border-opacity-25 border-neutral-400 ml-6"
        />
      ))}
            </Marquee>
        </div>
    )
}

export default CarouselHistory