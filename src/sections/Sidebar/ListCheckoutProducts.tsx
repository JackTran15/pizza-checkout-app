import { CheckoutProduct } from "../../common"
import { CheckoutProductCard } from "../../components"
import { useCheckout } from "../../contexts/checkout.context"

export function ListCheckoutProducts() {
    const { checkout } = useCheckout()

    return <>
        {checkout.checkoutProducts.map((e: CheckoutProduct, i: number) => {
            return <CheckoutProductCard checkoutProduct={e} key={i} />
        })}
    </>
}