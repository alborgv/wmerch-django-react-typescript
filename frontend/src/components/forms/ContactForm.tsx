import React from "react";

import { useMerchContext } from "context/MerchContext";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm: React.FC  = () => {

    const [formData, setFormData] = useState<ContactFormProps>({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const { sendContact } = useMerchContext();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await sendContact(formData);

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
                            Hemos recibido tu solicitud 🚀
                        </p>
                        <p className="text-sm text-gray-500">Gracias por contactarnos, responderemos pronto.</p>
                    </div>
                </div>
            ))
            setFormData({name: "", email: "", phone: "", message: ""})
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
        <div className="bg-black text-white px-12 md:px-72 font-libre">
            <h1 className="text-center text-3xl md:text-4xl font-bold italic mt-6 mb-12">
                CONTÁCTANOS
            </h1>
            <form className="space-y-8 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black border-b border-white outline-none py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black border-b border-white outline-none py-2"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2">Número de teléfono</label>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-black border-b border-white outline-none py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Mensaje</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-black border-b border-white outline-none py-2 resize-none"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-white text-black text-xs px-6 py-3 rounded-full tracking-widest hover:bg-gray-200 transition">
                        ENVIAR
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;