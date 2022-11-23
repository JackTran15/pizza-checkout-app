import { Product } from '../../common'
import { useCheckout } from '../../contexts/checkout.context';
import { Checkout } from '../../modules/checkout';
import './cardProduct.css'

interface IProductCard {
    product: Product
}

export const ProductCard = ({ product }: IProductCard) => {
    const { checkout, setCheckout } = useCheckout();

    function addToCheckout() {
        checkout.add(product)
        setCheckout(Checkout.clone(checkout))
    }

    return (
        <div className="cardProduct">
            <img className="cardProduct__image" src="/pizza.png" alt={product.name} />
            <div className="cardProduct__data">
                <div className="cardProduct__info">
                    <h2 className='cardProduct__title'>{product.name}</h2>
                    <p className='cardProduct__desc'>{product.description}</p>
                </div>
                <h3 className="cardProduct__price">${product.price}</h3>
                <button
                    className="cardProduct__add"
                    onClick={addToCheckout}
                >+
                </button>
            </div>
        </div>
    )
}