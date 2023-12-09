import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import style from './Hotel.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

const responsive = {
    // 0: { items: 1 },
    // 768: { items: 3 },
    0: { items: 1 },
    568: { items: 1 },
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
        <div className='p-1'>
            {/* Previous button */}
            <div className="position-relative">
                <Button variant="outlined" color='error' className={` ${style.previousButton}`} onClick={slidePrev}><ArrowBackIosIcon /></Button>

                {/* AliceCarousel component */}
                <AliceCarousel
                    mouseTracking
                    autoPlay
                    infinite
                    items={data?.hotelImages?.map((item, index) => {
                        return (
                            <div className="item mx-1 w-100" data-value={index}>
                                <img style={{ height: '400px', width: '100%' }} src={item} alt="hotelimg" />
                            </div>
                        )
                    })}
                    // paddingLeft={50}
                    // paddingRight={50}
                    responsive={responsive}
                    disableButtonsControls
                    disableDotsControls={true}
                    ref={(el) => (carousel = el)}
                />

                {/* Next button */}
                <Button variant="outlined" color='error' className={` ${style.NextButton}`} onClick={slideNext}><ArrowForwardIosIcon /></Button>
            </div>
        </div>
    );
}

export default HotelCover;
