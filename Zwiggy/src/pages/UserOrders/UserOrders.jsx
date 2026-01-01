import React, { useContext, useEffect, useState } from 'react'
import './UserOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { Assets } from '../../assets/frontend_assets/assets';
const UserOrders = () => {
    const { token, url } = useContext(StoreContext);
    const [data, setData] = useState([])

    const fetchUserOrders = async (req, res) => {
        const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
        setData(response.data.data);
        //console.log(response.data.data);

    }

    useEffect(() => {
        if (token) {
            fetchUserOrders();
        }
    }, [token]);
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={Assets.parcel_icon} alt="" />
                            <p>{order.items.map((item) => {
                                if (index === order.items.length - 1) {
                                    return item.name + ' x ' + item.quantity
                                } else {
                                    return item.name + ' x ' + item.quantity + ' , '
                                }
                            })}</p>
                            <p>Rs {order.amount / 100}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b> {order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserOrders