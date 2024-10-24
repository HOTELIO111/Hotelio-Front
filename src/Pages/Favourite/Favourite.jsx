import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography, CardMedia, Box } from '@mui/material';
import MobileHeader from '../../Components/MobileComponent/MobileHeader';
import MobileFooter from '../../Components/MobileComponent/MobileFooter';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useAuthContext } from '../../context/userAuthContext';
import { GetAllFavouriteAction } from '../../store/actions/favouritAction';
import { BiSolidHeartCircle } from 'react-icons/bi';

const Favourite = () => {
    const { currentUser } = useAuthContext();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllFavouriteAction(currentUser?._id));
    }, [currentUser]);

    const FavouriteList = useSelector((state) => state.GetAllFavouriteReducer.data);

    const navigate = useNavigate();

    const StyledCard = styled(Card)`
        min-width: 155px;
        padding-bottom: 2%;
        margin-bottom: 2%;
    `;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        const truncatedWords = words.slice(0, 6);
        return truncatedWords.join(' ');
    };

    return (
        <Box>
            <MobileHeader />
            <Box className="d-flex align-items-center">
                <KeyboardArrowLeftIcon onClick={() => navigate(-1)} />
                <Box className="d-flex justify-content-center w-100 pt-2">
                    <Typography variant="h6" gutterBottom>
                        Favourite
                    </Typography>
                </Box>
            </Box>
            <Grid container sx={{ mb: 10 }} p={1} spacing={1}>
                {FavouriteList?.data?.length > 0 ? (
                    FavouriteList?.data[0]?.favourites.map((card, index) => (
                        <Grid sx={{ padding: 0 }} item xs={6} md={6} key={index}>
                            <StyledCard>
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
                                            ({card?.rating} rating)
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {truncateDescription(card?.discription)}...
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ display: 'grid', placeItems: 'center', width: '100%', height: '60vh' }}>
                        <Box
                            sx={{
                                display: 'grid',
                                placeItems: 'center',
                                bgcolor: '#fff',
                                borderRadius: 5,
                                p: 2,
                                height: '100%',
                                margin: 'auto',
                                textAlign: 'center',
                            }}
                        >
                            <Box>
                                <BiSolidHeartCircle size={100} color="#ee2e24" />
                                <Typography variant="h6" color="initial">
                                    You currently have no favorite hotels.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Grid>
            <Box>
                <MobileFooter />
            </Box>
        </Box>
    );
};

export default Favourite;
