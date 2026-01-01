import React, { useContext } from 'react'
import './FoodItem.css'
import { Assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, description, price, image, setSignInPopup }) => {
    const navigate = useNavigate();
    const { cartItems, setCartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);

    const handleAdd = () => {
        if (!token) {
            setSignInPopup(true);
            return;
        }
        addToCart(id);
    };

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className="food-item-img" src={url + '/images/' + image} alt="" />
                {!cartItems[id]
                    ?
                    <img className='add' onClick={handleAdd} src={Assets.add_icon_white} alt='' />
                    :
                    <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={Assets.remove_icon_red} alt="" className="food-item-counter-img" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} className="food-item-counter-img" src={Assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={Assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-price">Rs {price}/-</p>
            </div>
        </div>
    )
}

export default FoodItem