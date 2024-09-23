import React from 'react'
import style from './AboutUs.module.css'
import AboutUsImage from '../../images/AboutUs.webp'
import { NavLink } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div>
            <div className={`p-5 ${style.AboutUsContainerFirst}`}>
                <div className="row">
                    <div className='col-xl-8' style={{ display: 'grid', placeItems: 'center', color: '#FFD700' }}>
                        <div>
                            <h2 className='mb-5'>ABOUT US</h2>
                            <div className='text-left text-white'>
                                {/* Hotelio, India's leading online booking
                                platform, revolutionizes the way travelers
                                find and book accommodations. With our
                                user-friendly app and website, we bring
                                easy and comfortable stays to your
                                fingertips. Explore our vast network of
                                premium hotels, budget-friendly options,
                            and authentic homestays. */}


                                India's leading online booking platform, revolutionizes the way travelers find and book accommodations. With our user-friendly app and website, we bring easy and comfortable stays to your fingertips. Explore our vast network of premium hotels, budget-friendly options, and authentic homestays. As India's first AI-enabled platform, we prioritize your comfort and provide hassle-free check-ins. Join us on a journey where travel meets convenience, and let Hotelio be your trusted partner for unforgettable stays India's leading online booking wherever your adventures take you. Hotelio is owned by Houda Carjour Tourism Pvt Ltd, India's Number 1 Fastest Leading Hotel Chain.

                                <span><NavLink style={{ color: '#FFD700' }} to='/about-us'> Read more...</NavLink></span>
                            </div>
                        </div>
                    </div>
                            <div className='col-xl-4'>
                                <img width={400} src={AboutUsImage} className='rounded' alt='...' />
                            </div>
                </div>
            </div>
            {/* <div className={`p-5 ${style.AboutUsContainerSecond}`}>
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
            </div> */}
        </div>
    )
}

export default AboutUs