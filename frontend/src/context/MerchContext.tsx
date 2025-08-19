import { createContext, useContext } from "react";

const Merch = createContext<MerchType | undefined>(undefined);

export const useMerchContext = (): MerchType => {
    const context = useContext(Merch);
    if (!context) {
        throw new Error("useMerch debe usarse dentro de un MerchProvider");
    }

    return context;
}

export const MerchProvider: React.FC<ChildrenProps> = ({ children }) => {
    const urlBackend = import.meta.env.VITE_URL_BACKEND;

    const getMerch = async (id: string) => {
        const response = await fetch(`${urlBackend}/api/merch/${id}`);
        const data = await response.json();
        
        return data;
    };

    const getAllMerch = async () => {
        const response = await fetch(`${urlBackend}/api/merch/`);
        const data = await response.json();

        return data;
    };

    const sendContact = async (formData: ContactFormProps) => {
        try {

            const response = await fetch(`${urlBackend}/api/send_contact/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al enviar datos")
            }

            return { success: true, formData};
        } catch (error) {
            console.error("error:", error);
            return { success: false, error };
        }
    }

    const sendSubscription = async (formData: SubscriptionProps) => {
        try {

            const response = await fetch(`${urlBackend}/api/send_subscription/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al enviar datos")
            }

            return { success: true, formData};
        } catch (error) {
            console.error("error:", error);
            return { success: false, error };
        }
    }

    return (
        <Merch.Provider
            value={{
                getMerch,
                getAllMerch,
                sendContact,
                sendSubscription
            }}
        >
            {children}
        </Merch.Provider>
    );
};
