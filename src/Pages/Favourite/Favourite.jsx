import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import MobileHeader from '../../Components/MobileComponent/MobileHeader';
import MobileFooter from '../../Components/MobileComponent/MobileFooter';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useAuthContext } from '../../context/userAuthContext';
import { GetAllFavouriteAction } from '../../store/actions/favouritAction';


const Favourite = () => {

    const { currentUser } = useAuthContext();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllFavouriteAction(currentUser?._id))
    }, [])


    const FavouriteList = useSelector((state) => state.GetAllFavouriteReducer.data);
    console.log(FavouriteList?.data[0]?.favourites)

    const FavouriteData = [
        {
            id: 1,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 2,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 3,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 4,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 5,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
        {
            id: 6,
            title: 'Hotel',
            para: 'Lorem ipsum dolor sit amet.',
            content: '(4.1 rating)',
            image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
        },
    ]

    const navigate = useNavigate()

    const StyledCard = styled(Card)`
    min-width: 155px;
    padding-bottom: 2%;
    margin-bottom: 2%;
`;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        const truncatedWords = words.slice(0, 10);
        return truncatedWords.join(' ');
    };

    return (
        <div>
            <MobileHeader />
            <div className='d-flex align-items-center'>
                <KeyboardArrowLeftIcon onClick={() => navigate(-1)} />
                <div className='d-flex justify-content-center w-100'>
                    <Typography variant="h6" gutterBottom>
                        Favourite
                    </Typography>
                </div>
            </div>
            <Grid container sx={{ mb: 10 }} spacing={1}>
                {
                    FavouriteList?.data[0]?.favourites.map((card, index) => (

                        <Grid sx={{ padding: 0 }} item xs={6} md={6}>
                            <StyledCard key={index}>

                                <CardContent>
                                    <img src={card?.hotelCoverImg} className='rounded' alt={`Image ${index}`} />
                                    <div className="d-flex justify-content-between">
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {card?.hotelName}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            ({card?.reviews.length}/5 rating)
                                        </Typography>
                                    </div>
                                    {/* <Typography variant='small'></Typography> */}
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {truncateDescription(card?.discription)}
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

export default Favourite