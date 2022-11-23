import { useState } from 'react';
import './App.css';
import { Checkout } from './modules/checkout';
import { CheckoutContext } from './contexts/checkout.context';
import { ListProducts, Sidebar } from './sections';
import { LIST_SEED_PRODUCTS, LIST_SEED_SPECIAL_RULES } from './common';
import { useEffect } from 'react';
import { myLocalStorage } from './modules/localStorage';

function App() {
  const initalCheckout = new Checkout({
    specialRules: LIST_SEED_SPECIAL_RULES,
    checkoutProducts: myLocalStorage.getCheckoutProducts(),
    company: myLocalStorage.getCompany(),
  })

  const [checkout, setCheckout] = useState<Checkout>(initalCheckout)

  useEffect(() => {
    return () => {
      myLocalStorage.saveCheckoutProducts(checkout.checkoutProducts)
    }
  }, [checkout])

  return (
    <CheckoutContext.Provider value={{ checkout, setCheckout }}>
      <div className="containerApp">
        <ListProducts products={LIST_SEED_PRODUCTS} />
        <Sidebar />
      </div>
    </CheckoutContext.Provider>
  );
}

export default App;

