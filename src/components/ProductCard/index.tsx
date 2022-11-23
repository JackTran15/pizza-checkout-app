import React from 'react'
import './cardProduct.css'

export const ProductCard = () => {
    return (
        <div className="cardProduct">
            <img className="cardProduct__image" src="https://i.ibb.co/RT0bjJq/food1.png" />
            <div className="cardProduct__data">
                <div className="cardProduct__info">
                    <h2 className='cardProduct__title'>Nombre Comida</h2>
                    <p className='cardProduct__desc'>Descripcion de la comida, con ingredientes</p>
                </div>
                <h3 className="cardProduct__price">$7.50</h3>
                <button className="cardProduct__add">+</button>
            </div>
        </div>
    )
}