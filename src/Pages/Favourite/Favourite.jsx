import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography, CardMedia, Box } from '@mui/material';
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
    }, [currentUser])


    const FavouriteList = useSelector((state) => state.GetAllFavouriteReducer.data);


    const navigate = useNavigate()

    const StyledCard = styled(Card)`
    min-width: 155px;
    padding-bottom: 2%;
    margin-bottom: 2%;
`;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        const truncatedWords = words.slice(0, 5);
        return truncatedWords.join(' ');
    };

    return (
        <Box>
            <MobileHeader />
            <Box className='d-flex align-items-center'>
                <KeyboardArrowLeftIcon onClick={() => navigate(-1)} />
                <Box className='d-flex justify-content-center w-100'>
                    <Typography variant="h6" gutterBottom>
                        Favourite
                    </Typography>
                </Box>
            </Box>
            <Grid container sx={{ mb: 10 }} p={1} spacing={1}>
                {
                    FavouriteList?.data[0]?.favourites.map((card, index) => (

                        <Grid sx={{ padding: 0 }} item xs={6} md={6}>
                            <StyledCard key={index}>

                                <CardContent>
                                    <CardMedia
                                        sx={{ borderRadius: 2 }}
                                        component="img"
                                        height="100"
                                        image={card?.hotelCoverImg}
                                        alt={`Image ${index}`}
                                    />
                                    <Box className="d-flex justify-content-between mt-1">
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {card?.hotelName}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            ({card?.reviews.length}/5 rating)
                                        </Typography>
                                    </Box>
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
            <Box>
                <MobileFooter />
            </Box>
        </Box>
    )
}

export default Favourite