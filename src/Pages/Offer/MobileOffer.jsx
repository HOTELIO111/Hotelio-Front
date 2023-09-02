import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import MobileHeader from '../../Components/MobileComponent/MobileHeader';
import MobileFooter from '../../Components/MobileComponent/MobileFooter';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


const MobileOffer = () => {

    const navigate = useNavigate()

    const FavouriteData = [
        {
            id: 1,
            title: 'Noida',
            para: 'Grab up to 40% OFF with Hotelio',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 2,
            title: 'Delhi',
            para: 'Grab up to 20% OFF with Hotelio',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 3,
            title: 'Agra',
            para: 'Grab up to 50% OFF with Hotelio',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 4,
            title: 'Mumbai',
            para: 'Grab up to 30% OFF with Hotelio',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
    ]


    const StyledCard = styled(Card)`
    min-width: 155px;
    padding-bottom: 10%;
     margin-bottom: 2%;
`;
    const [link, setLink] = useState('https://www.hoteliorooms.com/');
    const [isCopied, setIsCopied] = useState(false);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(link).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    return (
        <div>
            <MobileHeader />
            <div className='d-flex align-items-center'>
                <KeyboardArrowLeftIcon onClick={() => navigate(-1)} />
                <div className='d-flex justify-content-center w-100'>
                    <Typography variant="h6" gutterBottom>
                        Offers
                    </Typography>
                </div>
            </div>
            <Card className="p-2 my-2" style={{ maxWidth: '400px' }} >
                <Typography variant="p"><b>Get 999 INR</b> instantly Credit in your account. Also become eligible  for refer and earn.</Typography>

                <Button onClick={copyToClipboard} color='error' className="mt-2">
                    {isCopied ? 'Copied!' : 'Refer Copy Link'}
                </Button>
            </Card>
            <Grid container paddingBottom={10} spacing={1}>

                {
                    FavouriteData.map((card, index) => (

                        <Grid sx={{ padding: 0 }} item xs={6} md={6}>
                            <StyledCard key={index}>

                                <CardContent>
                                    <img src={card.image} className='rounded' alt={`Image ${index}`} />
                                    <div className="d-flex justify-content-between">
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography color={'#ee2e24'} variant="caption" display="block" gutterBottom>
                                            {card.content}
                                        </Typography>
                                    </div>
                                    {/* <Typography variant='small'></Typography> */}
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Grab up to <b style={{ color: '#ee2e24' }}>50%</b> OFF with Hotelio
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))
                }
            </Grid>
            <div>
                <MobileFooter />
            </div>
        </div>
    )
}

export default MobileOffer