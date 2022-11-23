import React from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { CheckoutProduct } from '../../common'
import { useCheckout } from '../../contexts/checkout.context';
import { Checkout } from '../../modules/checkout';
import './CheckoutProductCard.css'

interface ICheckoutProductCard {
    checkoutProduct: CheckoutProduct;
}

export const CheckoutProductCard = ({ checkoutProduct }: ICheckoutProductCard) => {
    const { checkout, setCheckout } = useCheckout()

    function remove() {
        checkout.remove({ id: checkoutProduct.id })
        setCheckout(Checkout.clone(checkout))
    }

    function increase() {
        checkout.increase({ id: checkoutProduct.id, num: 1 })
        setCheckout(Checkout.clone(checkout))
    }

    function decrease() {
        checkout.decrease({ id: checkoutProduct.id, num: 1 })
        setCheckout(Checkout.clone(checkout))
    }

    return (
        <div className='checkoutProductCard'>
            <img className='checkoutProductCard__thumbnail' src='/pizza.png' alt='thumbnail' />
            <div className='checkoutProductCard__data'>
                <div className='checkoutProductCard__info'>
                    <h2 className='checkoutProductCard__title'>{checkoutProduct.name}</h2>
                    <p className='checkoutProductCard__desc'>{checkoutProduct.description}</p>
                    <button className='checkoutProductCard__delete' onClick={remove}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div className='checkoutProductCard__bottom'>
                    <div className='checkoutProductCard__quantity'>
                        <button className='checkoutProductCard__quantity-button'
                            onClick={increase}>
                            +
                        </button>

                        <p className='checkoutProductCard__quantity-number'>{checkoutProduct.quantities}</p>

                        <button className='checkoutProductCard__quantity-button'
                            onClick={decrease}
                            disabled={checkoutProduct.quantities <= 1}>
                            -
                        </button>
                    </div>
                    <p className='checkoutProductCard__price'>
                        {checkoutProduct.price}
                    </p>
                </div>
            </div>
        </div>
    )
}
