import React from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard'
import { CheckoutProductCard } from './components/CheckoutProductCard'

function App() {
  return (
    <div className="containerApp">
      <div className='wrap__listProduct'>
        <div className='listProduct'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <input type="checkbox" id='openSidebar' hidden />
      <div className='wrap__sidebar'>
        <label htmlFor='openSidebar' className='sidebarBottomMobie'>
          <div className='sidebarBottomMobie-icon'>
            <i className="fas fa-shopping-cart"></i>
            0
          </div>
          <p className='sidebarBottomMobie-title'>Checkout</p>
          <p className='sidebarBottomMobie-price'>
            1.000 đ
          </p>
        </label>
        <div className='sidebar'>
          <div className="sidebar__header">
            <label htmlFor='openSidebar' className='sidebar__header-close'>
              <i className="fas fa-times"></i>
            </label>
            <p className='sidebar__header-title'>
              Role
            </p>
            <select className='sidebar__header-select'>
              <option value="-1">Default</option>
              <option value="1">Facebook</option>
              <option value="2">Amazon</option>
              <option value="3">Google</option>
            </select>
          </div>
          <div className='sidebar__body'>
            <CheckoutProductCard />
            <CheckoutProductCard />
            <CheckoutProductCard />
          </div>
          <div className='sidebar__footer'>
            <div className='sidebar__footer-promotion'>
              <p className='sidebar__footer-promotion-label'>Hot deal</p>
              <p className='sidebar__footer-promotion-content'>
                Amazon buy 2 get 3
              </p>
            </div>

            <div className='sidebar__footer-pirce'>
              <p className='sidebar__footer-pirce-text'>
                Tổng Tiền
              </p>
              <p className='sidebar__footer-pirce-number'>
                496.000đ
              </p>
            </div>
            <button className='sidebar__footer-buy'>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

