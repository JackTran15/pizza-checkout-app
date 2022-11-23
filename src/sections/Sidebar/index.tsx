import { CheckoutProduct } from "../../common";
import { CheckoutProductCard, CustomerCompanySwitcher } from "../../components"
import { useCheckout } from "../../contexts/checkout.context";
import { ListCheckoutProducts } from "./ListCheckoutProducts";

export function Sidebar() {
    const { checkout, setCheckout } = useCheckout()

    const totalCheckout = checkout.total().toFixed(2)
    return (
        <>
            <input type="checkbox" id='openSidebar' hidden />
            <div className='wrap__sidebar'>
                <label htmlFor='openSidebar' className='sidebarBottomMobie'>
                    <div className='sidebarBottomMobie-icon'>
                        <i className="fas fa-shopping-cart"></i>
                        {checkout.checkoutProducts.length}
                    </div>
                    <p className='sidebarBottomMobie-title'>Checkout</p>
                    <p className='sidebarBottomMobie-price'>
                        {totalCheckout}
                    </p>
                </label>
                <div className='sidebar'>
                    <div className="sidebar__header">
                        <label htmlFor='openSidebar' className='sidebar__header-close'>
                            <i className="fas fa-times"></i>
                        </label>
                        <CustomerCompanySwitcher />
                    </div>
                    <div className='sidebar__body'>
                        <ListCheckoutProducts />
                    </div>
                    <div className='sidebar__footer'>
                        <div className='sidebar__footer-pirce'>
                            <p className='sidebar__footer-pirce-text'>
                                Total
                            </p>
                            <p className='sidebar__footer-pirce-number'>
                                ${totalCheckout}
                            </p>
                        </div>
                        <button className='sidebar__footer-buy'>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}