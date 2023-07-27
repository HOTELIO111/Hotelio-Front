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

const HotelCover = () => {
    const items = [
        // Slide 1
        <div style={{ maxHeight: '60vh' }} className="item mx-1" data-value="1">
            <img className='img-fluid rounded' src="https://images.oyoroomscdn.com/uploads/hotel_image/109466/large/8f8433f482cb77d1.jpg" alt="" />
        </div>,
        // Slide 2
        <div style={{ maxHeight: '60vh' }} className="item mx-1" data-value="2">
            <img className='img-fluid rounded' src="https://images.oyoroomscdn.com/uploads/hotel_image/109466/large/13970a427de2a9a9.jpg" alt="" />
        </div>,
        // Slide 3
        <div style={{ maxHeight: '60vh' }} className="item mx-1" data-value="3">
            <img className='img-fluid rounded' src="https://images.oyoroomscdn.com/uploads/hotel_image/109466/large/2fef05273913f88f.jpg" alt="" />
        </div>,
        // Slide 4
        <div style={{ maxHeight: '60vh' }} className="item mx-1" data-value="4">
            <img className='img-fluid rounded' src="https://images.oyoroomscdn.com/uploads/hotel_image/109466/large/33e13e1afcc1070b.jpg" alt="" />
        </div>
    ];

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
                items={items}
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
