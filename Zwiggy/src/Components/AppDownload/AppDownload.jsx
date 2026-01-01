import React from 'react'
import './AppDownload.css'
import { Assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
             <p>For better experience download<br /> Zwiggy App</p>
            <div className="app-download-platforms">
                <img src={Assets.play_store} alt="" />
                <img src={Assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload