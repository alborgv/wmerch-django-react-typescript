import React, { useState } from 'react';

import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const PaymentForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/success',
                receipt_email: email,
            },
        });

        if (error && (error.type === 'card_error' || error.type === 'validation_error')) {
            setMessage(error.message || 'Error en el pago.');
        } else if (error) {
            setMessage('Ha ocurrido un error inesperado.');
        } else {
            setMessage(null);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                />

                <PaymentElement id="payment-element" />

                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner" /> : 'Pay now'}
                    </span>
                </button>

                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default PaymentForm;
