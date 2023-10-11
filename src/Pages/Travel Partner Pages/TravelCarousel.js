import { Shield } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
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
        <div className="item m-2" data-value="1">
            <Card sx={{
                height: "100%", border: '1px solid #ee2e24', borderRadius: '8px'
            }}>
                <CardContent>

                    <Typography variant='h6'>Manage Your Organization</Typography>
                    <Typography sx={{ py: 2 }} variant='p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, culpa?</Typography>
                    <div className='d-flex pt-3 justify-content-between align-items-center'>
                        <IconButton color='#ee2e24' aria-label="delete">
                            <Shield />
                        </IconButton>
                        <Typography color='blue' variant='span' >Learn More</Typography>
                    </div>
                </CardContent>
            </Card>
        </div >,
        // Slide 2
        <div className="item m-2" data-value="2">
            <Card sx={{
                height: "100%", border: '1px solid #ee2e24', borderRadius: '8px'
            }}>
                <CardContent>

                    <Typography variant='h6'>Corporate fares</Typography>
                    <Typography sx={{ py: 2 }} variant='p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, culpa?</Typography>
                    <div className='d-flex pt-3 justify-content-between align-items-center'>
                        <IconButton color='#ee2e24' aria-label="delete">
                            <Shield />
                        </IconButton>
                        <Typography color='blue' variant='span' >Learn More</Typography>
                    </div>
                </CardContent>
            </Card>
        </div >,
        // Slide 3
        <div className="item m-2" data-value="3">
            <Card sx={{
                height: "100%", border: '1px solid #ee2e24', borderRadius: '8px'
            }}>
                <CardContent>

                    <Typography variant='h6'>Hotelio Biz Assured Hotels</Typography>
                    <Typography sx={{ py: 2 }} variant='p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, culpa?</Typography>
                    <div className='d-flex pt-3 justify-content-between align-items-center'>
                        <IconButton color='#ee2e24' aria-label="delete">
                            <Shield />
                        </IconButton>
                        <Typography color='blue' variant='span' >Learn More</Typography>
                    </div>
                </CardContent>
            </Card>
        </div >,
    ];

    return (
        // AliceCarousel component with added spacing
        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            items={items}
            responsive={responsive}
            disableButtonsControls
            disableDotsControls
        />
    );
};

export default SliderCarousel;
