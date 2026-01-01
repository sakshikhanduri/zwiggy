import React, { useContext, useState } from 'react'
import './SignIn.css'
import { Assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';
const SignIn = ({ setSignInPopup }) => {

    const { url, token, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Sign Up')
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onLogin = async (e) => {
        e.preventDefault();
        let newurl = url;
        if (currentState === 'Login') {
            newurl = newurl + '/api/user/login'
        } else {
            newurl = newurl + '/api/user/register'
        }
        const response = await axios.post(newurl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setSignInPopup(false);
            toast.success("Logged In")
        }
        else {
            //alert(response.data.message);
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='signIn-popup'>
            <form onSubmit={onLogin} className="signIn-popup-container">
                <div className="signIn-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setSignInPopup(false)} src={Assets.cross_icon} alt="" />
                </div>
                <div className="signIn-popup-inputs">
                    {currentState === 'Login' ? <></> :
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
                    <input type="email" placeholder="Your Email" required name='email' onChange={onChangeHandler} value={data.email} />
                    <input name='password' onChange={onChangeHandler} type="password" value={data.password} placeholder="Password" required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? "Create Account" : "Login"}</button>
                <div className="signIn-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing, I agree to the terms of use & Privacy policy</p>
                </div>
                {currentState === 'Login' ? <p>Create an account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>}


            </form>
        </div>
    )
}

export default SignIn