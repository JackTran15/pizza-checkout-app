import { Product } from '../../common'
import { useCheckout } from '../../contexts/checkout.context';
import { Checkout } from '../../libs/checkout';
import './style.css'

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
        <div className="productCard">
            <img className="productCard__image" src="/pizza.png" alt={product.name} />
            <div className="productCard__data">
                <div className="productCard__info">
                    <h2 className='productCard__title'>{product.name}</h2>
                    <p className='productCard__desc'>{product.description}</p>
                </div>
                <h3 className="productCard__price">${product.price}</h3>
                <button
                    id="addToCheckout"
                    className="productCard__add"
                    onClick={addToCheckout}
                >+
                </button>
            </div>
        </div>
    )
}