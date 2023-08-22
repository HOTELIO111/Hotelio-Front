import React from 'react'
import style from '../Privacy/Privacy.module.css'
import MobileFooter from '../../Components/MobileComponent/MobileFooter'

const PrivacyMob = () => {
    return (
        <>
            <div
                className={` text-center p-5 mt-0 rounded ${style.TermsContainer}`}
            >
                <h1>Hotelio Privacy & Policy</h1>
            </div>
            <div className='container'>
                <h4 className='py-3'><b>HotelioRooms Privacy Notice</b></h4>
                <p className='py-2'>
                    HotelioRooms is committed to protecting your information. This privacy notice provides details about the information we collect about you, how we use it and how we protect it. It also explains your rights and how to contact us if you have questions about how we use your information.
                </p>

            </div>
            <div className='container pb-5'>
                <h5 className='py-3'><b>Information about Hotelio</b></h5>
                <p className='py-2'>
                    In this privacy notice, references to “Hotelio”, “HotelioRooms”, "we" or "us" or “our” are to Oravel Stays Singapore Pte. Limited (a company incorporated under the laws of Singapore) and its parent company and its subsidiaries (the “Hotelio Group”).

                    Depending on where and how you interact with us (e.g. by using our app or by walking into one of our Hotelio-branded accommodations or booking an Hotelio-branded accommodation via a third party travel agency) different companies within Hotelio will process your information. You can find out more about the Hotelio companies that handle your information, including which company makes decisions about how your information is handled, by contacting us.
                </p>

            </div>
            <div className="d-md-block d-lg-none d-xl-none">
                <MobileFooter />
            </div>
        </>
    )
}

export default PrivacyMob