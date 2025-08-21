import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { prod_id } = useParams<RouteParams>();
    const urlBackend = import.meta.env.VITE_URL_BACKEND;
    
    useEffect(() => {
        if (!prod_id) return;

        fetch(`${urlBackend}/api/create-checkout-session/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prod_id }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    console.error("Respuesta inesperada:", text);
                    return;
                }

                const data = await res.json();
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    console.error("No se encontró la URL de checkout.");
                }
            })
            .catch((error) => console.error('Error al redirigir a Stripe Checkout:', error));
    }, [prod_id]);

    return <div>Redirigiendo a Stripe...</div>;
};

export default Checkout;
