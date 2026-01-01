import React from 'react'
import './FoodItems.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodItems = ({ category, setSignInPopup }) => {
    const { food_list } = useContext(StoreContext);
    return (
        <div className='food-items' id='food-items'>
            <h1>Top dishes near you</h1>
            <div className="food-items-list">
                {food_list.map((item, index) => {
                    //console.log(category, item.category);
                    if (category === item.category || category === "All") {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} setSignInPopup={setSignInPopup} />
                    }

                })}
            </div>
        </div>
    )
}

export default FoodItems