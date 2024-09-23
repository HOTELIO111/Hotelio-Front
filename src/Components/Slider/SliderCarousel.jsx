import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ImageOne from '../../images/luxurious.webp'
import ImageTwo from '../../images/fortune.webp'

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const SliderCarousel = ({ SliderData }) => {
    const items = [

        // Slide 1
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="1">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src={ImageOne} alt="" />
        </div>,
        // Slide 2
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="2">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src={ImageTwo} alt="" />
        </div>,
        // Slide 3
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="3">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src={ImageOne} alt="" />
        </div>,
        // Slide 4
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="4">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src={ImageTwo} alt="" />
        </div>,
        // Slide 5
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="5">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src={ImageOne} alt="" />
        </div>,
        // Slide 6
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="6">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src={ImageTwo} alt="" />
        </div>,
    ];

    return (
        // AliceCarousel component with added spacing
        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            items={
                SliderData?.data?.map((item, index) => (
                    <div key={index} style={{ maxHeight: '500px' }} className="item mx-2" data-value={index}>
                        <img style={{ height: '250px', width: '100%' }} className='rounded' src={item?.img} alt="" />
                    </div>
                ))
            }
            responsive={responsive}
            disableDotsControls
            disableButtonsControls // Disable the left and right navigation icons
        />
    );
};

export default SliderCarousel;
