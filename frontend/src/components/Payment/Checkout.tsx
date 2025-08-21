import { useMerchContext } from '@/context/MerchContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { prod_id } = useParams<RouteParams>();

    const { checkoutSession } = useMerchContext();
    
    useEffect(() => {
        if (!prod_id) return;

        const fetchMerch = async () => {
            checkoutSession(prod_id)
        }
        fetchMerch();
    }, [prod_id]);

    return <div>Redirigiendo a Stripe...</div>;
};

export default Checkout;
