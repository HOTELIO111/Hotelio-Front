import React from 'react'
import style from '../Terms/Terms.module.css'
import MobileFooter from '../../Components/MobileComponent/MobileFooter'

const TermsMob = () => {
    return (
        <>
            <div
                className={` text-center p-5 mt-0 rounded ${style.TermsContainer}`}
            >
                <h1>Hotelio Terms & Services</h1>
            </div>
            <div className='container pb-5'>
                <h4 className='py-3'><b>Terms Of Use</b></h4>
                <p className='py-2'>
                    By registering on, signing into, or using the Hotelio Platform, you (“you” or “User”) agree to the terms herein (this “Agreement”):
                    'HOTELO' means owning by Houda Carjour Tourism Pvt Ltd., a company situated  with an address at 22,Ward no8 Mundera Bazaar Chauri Chaura Gorakhpur.
                </p>
            </div>
            <div className="d-md-block d-lg-none d-xl-none">
                <MobileFooter />
            </div>
        </>
    )
}

export default TermsMob