import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Assets } from '../../assets/frontend_assets/assets';
const Cart = () => {
    const { cartItems, removeFromCart, food_list, getCartTotal, url, token } = useContext(StoreContext);
    const navigate = useNavigate();
    return (
        <div className='cart' >
            {getCartTotal() ? <>
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />

                    {food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={item._id}>
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={url + '/images/' + item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>Rs {item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>Rs {item.price * cartItems[item._id]}</p>
                                        <p onClick={() => removeFromCart(item._id)} className='cross'>-</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }

                    })}
                </div>
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div><div className="cart-total-details">
                            <p>Sub Total</p>
                            <p>Rs {getCartTotal()}</p>
                        </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Charges</p>
                                <p>Rs {10}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>Rs {getCartTotal() + 10}</b>
                            </div>

                        </div>
                        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cart-promocode">
                        <div><p>If you have any promocode,you can enter it here</p></div>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </> : <>
                    <div className="empty-cart">
                        <img
                            src={Assets.empty_cart}
                            alt="Empty Cart"
                            className="empty-cart-image"
                        />

                        <p className="empty-cart-text">
                            Your cart is currently empty.
                        </p>

                        {/* Empty tag */}
                        <span></span>

                        <Link to="/" className="empty-cart-button">
                            Go to Home
                        </Link>
                    </div>
            </>
            }


        </div>


    )
}

export default Cart