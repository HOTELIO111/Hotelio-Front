import React from 'react'
import style from './AboutUs.module.css'
import AboutUsImage from '../../images/AboutUs.png'
import AboutUsBanner from '../../images/AboutUsBanner.png'

const AboutUs = () => {
    return (
        <div>
            <div className={`p-5 ${style.AboutUsContainerFirst}`}>
                <div className="row">
                    <div className='col-xl-4'>
                        <img width={400} src={AboutUsImage} />
                    </div>
                    <div className='col-xl-8' style={{ display: 'grid', placeItems: 'center' }}>
                        <div>
                            <h2>About Us</h2>
                            <div className='text-left'>
                                Hotelio Is Online  Booking Platform for Easy And Comfortable  stay For Travelers throug Hotelio app and Hotelio Web.It was founded  In 13th may 2023 , Hotelio is owning by Company 'Houda Carjour Tourism pvt Ltd' Registered at Roc Kanpur Uttar pradesh.  Hotelio is India's trusted and fastest growing hotel chain network. It's India's first AI Enabled app and website.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-5 ${style.AboutUsContainerSecond}`}>
                <div className="row">
                    <div className='col-xl-8' style={{ display: 'grid', placeItems: 'center' }}>
                        <div>
                            <h2>Our Vision</h2>
                            <div className='text-left'>
                                Our Vision Is Travel Around World Should be on your Fingertips and Finding is accommodation & stay never before like dis And easy for Travelers. When You are going to New Place 'Hotelio' is Right partner For Your hassle Free Checkin. Our First Priority is Comfort stay. So next time when you are going to anywhere Hotelio Will be With you.
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4'>
                        <img className='img-fluid' src={AboutUsBanner} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs