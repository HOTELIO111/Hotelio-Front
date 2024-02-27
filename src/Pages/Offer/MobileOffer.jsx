import { BiSolidOffer } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllBookingOffers } from '../../store/actions/OfferActions'
import MobileHeader from '../../Components/MobileComponent/MobileHeader'
import MobileFooter from '../../Components/MobileComponent/MobileFooter'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Button, Card, CardContent, Box, Typography } from '@mui/material'



const MobileOffer = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllBookingOffers())
    }, [])


    const OfferData = useSelector((state) => state.GetAllBookingOffersReducers.data);
    console.log(OfferData)
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
            <Box>
                {
                    OfferData?.data?.map((item, index) => (
                        <Card key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <BiSolidOffer size={100} color='#ee2e24' />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {item?.code}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        {item?.description}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))
                }
            </Box>
            <div>
                <MobileFooter />
            </div>
        </div>
    )
}

export default MobileOffer