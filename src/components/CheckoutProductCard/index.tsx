import React from 'react'
import './CheckoutProductCard.css'

export const CheckoutProductCard = () => {
    return (
        <div className='checkoutProductCard'>
            <img className='checkoutProductCard__thumbnail' src='https://i.ibb.co/RT0bjJq/food1.png' alt='thumbnail' />
            <div className='checkoutProductCard__data'>
                <div className='checkoutProductCard__info'>
                    <h2 className='checkoutProductCard__title'>Pizza Hải Sản Đào</h2>
                    <p className='checkoutProductCard__desc'>Kích thước - Nhỏ 6. Đế - Dày </p>
                    <button className='checkoutProductCard__delete'><i className="fa-solid fa-trash"></i></button>
                </div>
                <div className='checkoutProductCard__bottom'>
                    <div className='checkoutProductCard__quantity'>
                        <button className='checkoutProductCard__quantity-button'>+</button>
                        <p className='checkoutProductCard__quantity-number'>1</p>
                        <button className='checkoutProductCard__quantity-button'>-</button>
                    </div>
                    <p className='checkoutProductCard__price'>
                        169.000đ
                    </p>
                </div>
            </div>
        </div>
    )
}
