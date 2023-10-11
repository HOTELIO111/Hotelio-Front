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
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="1">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg" alt="" />
        </div>,
        // Slide 2
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="2">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src="https://media-cdn.tripadvisor.com/media/photo-m/1280/21/dc/27/d1/fortune-pandiyan-hotel.jpg" alt="" />
        </div>,
        // Slide 3
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="3">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg" alt="" />
        </div>,
        // Slide 4
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="4">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src="https://media-cdn.tripadvisor.com/media/photo-m/1280/21/dc/27/d1/fortune-pandiyan-hotel.jpg" alt="" />
        </div>,
        // Slide 5
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="5">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg" alt="" />
        </div>,
        // Slide 6
        <div style={{ maxHeight: '500px' }} className="item mx-2" data-value="6">
            <img style={{ height: '250px', width: '100%' }} className='rounded' src="https://media-cdn.tripadvisor.com/media/photo-m/1280/21/dc/27/d1/fortune-pandiyan-hotel.jpg" alt="" />
        </div>,
    ];

    return (
        // AliceCarousel component with added spacing
        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            items={items}
            responsive={responsive}
            disableDotsControls
            disableButtonsControls // Disable the left and right navigation icons
        />
    );
};

export default SliderCarousel;
