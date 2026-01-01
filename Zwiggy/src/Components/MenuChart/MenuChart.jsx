import React from 'react'
import './MenuChart.css';
import { menu_list } from '../../assets/frontend_assets/assets'
const MenuChart = ({ category, setCategory }) => {
    return (
        <div className='menu' id='menu'>
            <h1>Explore Our Menu</h1>
            <p className='menu-text'>
                Whether you're craving something hearty, light, sweet, or savory, our menu has a perfect dish waiting to make your meal extraordinary
            </p>
            <div className='menu-list'>
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className="menu-list-item" key={index}>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
                
            </div>
            <hr style={{ margin: '0px 10px' }} />
        </div>
    )
}

export default MenuChart