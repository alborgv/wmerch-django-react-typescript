import { motion } from "framer-motion";
import ProductCard from "../Card/ProductCard";
import destacadoPrincipalImg from "../../assets/destacadoPrincipal.png";
import fotoPerfil420 from "../../assets/foto_perfil_420_750x.jpg";
import fotoPerfilMorada from "../../assets/foto_perfil_morada_750x.jpg";
import fotoPerfilRoja from "../../assets/foto_perfil_roja_750x.jpg";
import { Link } from "react-router-dom";

const Destacado = () => {
    return (
        <div className="bg-gradient-to-b from-neutral-900 to-black text-white min-h-screen p-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col md:flex-row items-center relative w-full">
                    
                    <motion.div 
                        className="md:w-1/2 w-full text-center md:text-left px-4 md:px-8 z-20"
                        initial={{ opacity: 0, x:-40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 1}}
                    >
                        <p className="text-sm text-neutral-300 font-light border border-neutral-500 rounded-full inline-block py-1 px-4 mb-2">
                            LO MÁS DESTACADO
                        </p>
                        <h1 className="text-3xl md:text-4xl font-semibold tracking-wider mb-3">
                            SPECIAL 4:20 2.0
                        </h1>
                        <div className="text-lg md:text-2xl text-neutral-400 font-semibold">
                            $200.000
                        </div>
                    </motion.div>

                    <div className="md:w-1/2 w-full flex justify-center mt-6 md:mt-0">
                        <motion.img
                            src={destacadoPrincipalImg}
                            alt="Gorra Destacada"
                            className="max-w-xs md:max-w-md h-auto mx-auto drop-shadow-[2px_12px_6px_#232323] relative z-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1 }}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start w-full">
                    <div className="max-w-sm">
                        <h2 className="text-lg font-light">Descripción</h2>
                        <p className="text-neutral-400 text-sm mt-4 leading-relaxed font-light">
                            Esta gorra conmemora el 4/20, un símbolo de libertad, unión y conciencia.
                            Su diseño refleja la cultura cannábica como expresión de paz, relajación y 
                            conexión con la naturaleza.
                        </p>
                        <p className="text-neutral-400 text-sm mt-4 leading-relaxed font-light">
                            Representa una forma de resistencia pacífica y 
                            autenticidad, invitando a celebrar el derecho a ser uno mismo sin prejuicios 
                            ni restricciones sociales.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <Link to="/collections/6" className="bg-white text-black px-6 py-2 font-semibold rounded-md shadow">
                                Comprar ahora
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:flex justify-end hidden">
                        <div className="grid grid-cols-3 gap-12">

                            <ProductCard
                                id="1"
                                name="SPECIAL 4:20 2.0 BLACK"
                                price="200.000"
                                image={fotoPerfil420}
                            />
                            <ProductCard
                                id="1"
                                name="Classic Cap Purple and Blue Edition"
                                price="170.000"
                                image={fotoPerfilMorada}
                            />
                            <ProductCard
                                id="1"
                                name="Classic Cap Red Edition"
                                price="170.000"
                                image={fotoPerfilRoja}
                            />

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Destacado;
