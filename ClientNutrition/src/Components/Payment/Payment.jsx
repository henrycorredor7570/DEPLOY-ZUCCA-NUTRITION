// import React from "react";
import { loadStripe } from '@stripe/stripe-js';
const keyPublicStripe = "pk_test_51NiNMSL13IBKWmcBnqVCCI0Cc5913gnkwN8OVf2SWTDKiykqi1Ehb0i2bdTrMVTM5ZUpQLhCGgTWR81bvdxhU42w001HRMbgd9"
const stripePromise = loadStripe(keyPublicStripe);

const StripePayment = (props) => {
    const handleClick = async () => {
        const stripe = await stripePromise;

        // Realizar una petición al backend para crear una sesión de pago
        const response = await fetch("/create-checkout-session", {
            method: "POST",
        });

        const session = await response.json();

        // Redirigir al flujo de pago de Stripe
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if(result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <button onClick={props.handleClick}>
            Pagar con Stripe
        </button>
    );
};

export default StripePayment;
