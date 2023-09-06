import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import style from './Hotel.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const HotelCover = ({ data }) => {

    const slidePrev = () => {
        carousel.slidePrev();
    };

    const slideNext = () => {
        carousel.slideNext();
    };

    let carousel = null;

    return (
        <div className='py-2'>
            {/* Previous button */}
            <Button variant="text" className={` ${style.previousButton}`} onClick={slidePrev}><ArrowBackIosIcon /></Button>

            {/* AliceCarousel component */}
            <AliceCarousel
                mouseTracking
                // autoPlay
                infinite
                items={data?.hotelImages.map((item, index) => {
                    return (
                        <div style={{ marginTop: '80px' }} className="item mx-1" data-value={index}>
                            <img style={{ height: '250px' }} className='img-fluid rounded' src={item} alt="hotelimg" />
                        </div>
                    )
                })}
                paddingLeft={50}
                paddingRight={50}
                responsive={responsive}
                disableButtonsControls // Disable the left and right navigation icons
                ref={(el) => (carousel = el)} // Save reference to the carousel
            />

            {/* Next button */}
            <Button variant="text" className={` ${style.NextButton}`} onClick={slideNext}><ArrowForwardIosIcon /></Button>
        </div>
    );
}

export default HotelCover;
