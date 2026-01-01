import React, { useState } from 'react'
import './Home.css';
import Header from '../../Components/Header/Header';
import MenuChart from '../../Components/MenuChart/MenuChart';
import FoodItems from '../../Components/FoodItems/FoodItems';

const Home = ({ setSignInPopup }) => {
    const [category, setCategory] = useState("All");
    return (
        <div>
            <Header />
            <MenuChart category={category} setCategory={setCategory} />
            <FoodItems category={category} setSignInPopup={setSignInPopup} />

        </div>
    )
}

export default Home