import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const SliderCarousel = () => {
    const items = [
        // Slide 1
        <div style={{ maxHeight: '180px' }} className="item mx-2" data-value="1">
            <img className='img-fluid rounded' src="https://wallpapercave.com/wp/wp6181354.jpg" alt="" />
        </div>,
        // Slide 2
        <div style={{ maxHeight: '180px' }} className="item mx-2" data-value="2">
            <img className='img-fluid rounded' src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg" alt="" />
        </div>,
        // Slide 3
        <div style={{ maxHeight: '180px' }} className="item mx-2" data-value="3">
            <img className='img-fluid rounded' src="https://wallpapercave.com/wp/wp6181354.jpg" alt="" />
        </div>,
        // Slide 4
        <div style={{ maxHeight: '180px' }} className="item mx-2" data-value="4">
            <img className='img-fluid rounded' src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg" alt="" />
        </div>,
        // Slide 5
        <div style={{ maxHeight: '180px' }} className="item mx-2" data-value="5">
            <img className='img-fluid rounded' src="https://wallpapercave.com/wp/wp6181354.jpg" alt="" />
        </div>,
        // Slide 6
        <div style={{ maxHeight: '180px' }} className="item mx-2" data-value="6">
            <img className='img-fluid rounded' src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg" alt="" />
        </div>,
    ];

    return (
        // AliceCarousel component
        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            items={items}
            paddingLeft={50}
            paddingRight={50}
            responsive={responsive}
            disableButtonsControls // Disable the left and right navigation icons
            
        />
    );
};

export default SliderCarousel;
