import React from "react";

import { useMerchContext } from "context/MerchContext";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {

    const [formData, setFormData] = useState<SubscriptionProps>({ email: "" })

    const { sendSubscription } = useMerchContext();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await sendSubscription(formData);
        
        if (res.success) {
            toast.custom((t) => (
                <div 
                    className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                    } max-w-sm w-full bg-white rounded-2xl shadow-lg pointer-events-auto flex ring-1 ring-black/5 p-4`}
                >
                    <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0"/>
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">
                            Hemos recibido tu subscripción 🚀
                        </p>
                        <p className="text-sm text-gray-500">¡Gracias por subscribirte, está atento!</p>
                    </div>
                </div>
            ))
            setFormData({email: ""})
        } else {
            
            toast.custom((t) => (
                <div 
                    className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                    } max-w-sm w-full bg-white rounded-2xl shadow-lg pointer-events-auto flex ring-1 ring-black/5 p-4`}
                >
                    <XCircle className="text-red-500 w-6 h-6 flex-shrink-0"/>
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">
                            Error
                        </p>
                        <p className="text-sm text-gray-500">Hubo un problema, inténtalo nuevamente.</p>
                    </div>
                </div>
            ))
        }
    }

    return (
        <footer className="bg-black text-white py-12 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 mt-16">

                <motion.div
                    initial={{ y: 40, opacity: 0.2 }}
                    whileInView={{ y: -40, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-14">
                    <h2 className="text-3xl font-anton font-semibold mb-8">Únete a la familia</h2>
                    <div className="flex flex-col items-center space-y-2">
                        <form className="flex items-center border-b border-white w-full max-w-sm justify-between px-2 pb-1" onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Suscríbete a nuestra lista de correo"
                                    className="bg-transparent outline-none w-full text-sm font-libre placeholder-neutral-400"
                                />
                                <button className="text-white text-lg">✉️</button>

                            </form>
                    </div>
                </motion.div>

                <motion.div

                    initial={{ y: -20, opacity: 1 }}
                    whileInView={{ y: -50, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-center space-y-4">
                    <a href="https://www.instagram.com/wmerch__/" target="_blank" rel="noopener noreferrer">
                        <div className="w-12 h-12 rounded-full border-2 mb-6 flex items-center justify-center">
                            <FaInstagram size={24} />
                        </div>
                    </a>
                </motion.div>

                <motion.div

                    initial={{ y: -20, opacity: 1 }}
                    whileInView={{ y: -80, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="/contact">Contáctenos</a>
                    <Link to="/terms-of-sale">Términos de venta</Link>
                    <Link to="/terms-of-use">Términos de uso</Link>
                    <Link to="/international-shipping-terms-and-conditions">Términos y condiciones de envíos internacionales</Link>
                </motion.div>

                <div className="text-xs text-neutral-400 mt-4">
                    © 2025 W Merch Store - Desarrollado por Z
                </div>

            </div>
        </footer>
    );
};

export default Footer;
