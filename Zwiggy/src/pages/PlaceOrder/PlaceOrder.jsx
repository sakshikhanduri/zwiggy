import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getCartTotal, url, cartItems, food_list, token, setCartItems
  } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '', city: '', state: '', zipcode: '', country: '', phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  

  const placeorder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id]
        });
      }
    });

    // 🔹 DO NOT send userId
    const orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotal() + 10
    };

    const response = await axios.post(
      url + '/api/order/place',
      orderData,
      { headers: { token } }   
    );

    const { orderId, amount } = response.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount, // paise
      currency: "INR",
      name: "Zwiggy",
      description: "Order Payment",
      order_id: orderId,
      handler: async function (response) {

        const paymentData = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          items: orderItems,
          amount,
          address: data
        };

        const api = await axios.post(
          url + '/api/order/verify',
          paymentData,
          { headers: { token } } 
        );

        if (api.data.success) {
          //alert("Payment successful");
          toast.success("Payment successful")
          setCartItems({});
          navigate('/order/userorders');
        } else {
          //alert("Payment failed");
          toast.error("Payment failed!")
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getCartTotal() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <>

      <form onSubmit={placeorder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} required type="text" placeholder='First name' />
            <input onChange={onChangeHandler} required type="text" placeholder='Last name' name='lastName' value={data.lastName} />
          </div>
          <input onChange={onChangeHandler} required type="email" placeholder='Email' name='email' value={data.email} />
          <input onChange={onChangeHandler} name='street' value={data.street} required type="text" placeholder='Street' />
          <div className="multi-fields">
            <input onChange={onChangeHandler} name='city' value={data.city} required type="text" placeholder='City' />
            <input onChange={onChangeHandler} required type="text" placeholder='State' name='state' value={data.state} />
          </div>
          <div className="multi-fields">
            <input onChange={onChangeHandler} required type="text" placeholder='Zip code' name='zipcode' value={data.zipcode} />
            <input onChange={onChangeHandler} required type="text" placeholder='Country' name='country' value={data.country} />
          </div>
          <input onChange={onChangeHandler} required type="text" placeholder='Contact no' name='phone' value={data.phone} />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div><div className="cart-total-details">
              <p>Sub Total</p>
              <p>Rs {getCartTotal() === 0 ? 0 : getCartTotal()}</p>
            </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Charges</p>
                <p>Rs {getCartTotal() === 0 ? 0 : 10}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs {getCartTotal() === 0 ? 0 : getCartTotal() + 10}</b>
              </div>

            </div>
            <button type='submit' >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>

  )
}

export default PlaceOrder