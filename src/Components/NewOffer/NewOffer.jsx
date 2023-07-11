import React from 'react'
import { Fragment } from 'react'
import OfferLeftImage from '../../images/OfferLeftImage.png';
import OfferRightImage from '../../images/OfferRightImage.png';
import style from './NewOffer.module.css'
import { Card } from '@mui/material';

const NewOffer = () => {


    return (
        <Fragment>
            <div className='d-flex align-items-center justify-content-center text-center flex-column pt-4 fs-4 fw-bold' style={{ background: "linear-gradient(to right bottom , rgba(255,255,255,0.8),rgba(255,255,255,0.8)) , url('https://c4.wallpaperflare.com/wallpaper/964/41/278/interior-bed-hotel-wallpaper-preview.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

                Promotions, deals and special offers for you
                <div className='bg-transparent w-100 h-100 position-relative d-flex align-items-center justify-content-evenly px-3' style={{ minHeight: "80vh" }}>

                    <div className="ShapeArea w-100 position-absolute left-0 top-0" style={{ minHeight: "80vh", clipPath: "polygon(30% 72%, 100% 38%, 100% 61%, 100% 100%, 80% 100%, 20% 100%, 0 100%, 0 62%)", background: "radial-gradient(circle, rgba(25, 255, 156, 0.5551470588235294) 0%, rgba(255, 255, 255, 0.6924019607843137) 100%)" }}></div>
                    <img className={`${style.mobdisplaynone}`} style={{ aspectRatio: "6/4", width: "auto", height: "80vh" }} src={OfferRightImage} alt=".." />
                    <div className="card shadow-lg p-5">
                        <img style={{ height: "60vh" }} src={OfferLeftImage} alt="" />
                        {/* <ul >
                            <li >
                                <h5>Wide range of accommodations
                                    including hotels, budget options,
                                    and homestays</h5>
                            </li>
                            <li >
                                <h5 >
                                    User-friendly app and website
                                    for easy booking.
                                </h5>
                            </li>
                            <li >
                                <h5 >
                                    Quality assurance and
                                    standardized service.
                                </h5>
                            </li>
                            <li >
                                <h5 >
                                    Transparent pricing with
                                    comprehensive details.
                                </h5>
                            </li>
                            <li >
                                <h5>
                                    Responsive customer support.
                                </h5>
                            </li>
                            <li >
                                <h5>
                                    Additional services such as
                                    premium listings and
                                    personalized recommendations.
                                </h5>
                            </li>
                        </ul> */}
                    </div>

                </div>
            </div>


        </Fragment>
    )
}

export default NewOffer