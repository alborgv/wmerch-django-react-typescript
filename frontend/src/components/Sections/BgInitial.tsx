import React from "react";

import { useEffect, useState } from "react";
import horizontalBanner from "../../assets/portada_420_horizontal_3024x.jpg";
import verticalBanner from "../../assets/portada_420_vertical_1296x.webp";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

export default function BgInitial() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const zoomIn = setTimeout(() => {
      setScale(1.1);
    }, 100);

    return () => clearTimeout(zoomIn);
  }, []);

  return (
    <div className="relative w-full">
      
      <div className="hidden md:block w-full h-[120vh] overflow-hidden relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${horizontalBanner})`,
            transform: `scale(${scale})`,
            transition: "transform 8s ease-out",
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

        <div className="absolute inset-0 flex justify-between items-end p-8">
          <h1 className="text-white text-4xl font-bold font-libre">SPECIAL 4:20 2.0</h1>
      
        <Link to="/collections" className="flex items-center gap-2 bg-black/80 border border-green-600 text-green-500 hover:bg-green-700 hover:text-slate-200 px-5 py-2 rounded-full font-extrabold text-sm uppercase tracking-wide shadow-[0_4px_10px_rgba(0,255,60,0.3)] hover:shadow-[0_0_15px_rgba(0,255,60,0.5)] transition-all duration-300">
          <Flame className="w-4 h-4" />
          W Merch Disponible
        </Link>
        </div>
      </div>

      <div className="block md:hidden w-full h-[80vh] overflow-hidden relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${verticalBanner})`,
            transform: `scale(${scale})`,
            transition: "transform 8s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          
        </div>
        
        <div className="absolute inset-0 flex justify-between items-end p-4">
          <h1 className="text-white text-3xl font-bold">SPECIAL 4:20 2.0</h1>
            <button className="flex items-center gap-2 bg-black/80 border border-green-600 text-green-500 hover:bg-green-700 hover:text-slate-200 px-5 py-2 rounded-full font-extrabold text-sm uppercase tracking-wide shadow-[0_4px_10px_rgba(0,255,60,0.3)] hover:shadow-[0_0_15px_rgba(0,255,60,0.5)] transition-all duration-300">
              <Flame className="w-4 h-4" />
              W Merch Disponible
            </button>
          
        </div>
      </div>
    </div>
  );
}
