import { useContext } from "react";
import { createContext } from "react";
import { Checkout } from "../modules/checkout";

export type CheckoutContextType = {
    checkout: Checkout;
    setCheckout: (checkout: Checkout) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    checkout: new Checkout(),
    setCheckout: (_: Checkout) => { console.warn('Checkout context must be inner Checkout.Provider wrapping!') }
})

export const useCheckout = () => useContext(CheckoutContext)