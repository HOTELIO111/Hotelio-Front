import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../context/userAuthContext';
import { GetAllRecommendationAction } from '../../store/actions/recommendedAction';
import { API_URL } from '../../config';

const CardContainer = styled(Paper)`
  display: flex;
  overflow-x: auto;
  background: transparent !important;
  box-shadow: none !important;
  padding: '4px';
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledCard = styled(Card)`
  min-width: 150px;
  margin: 4px;
`;


const MobileRecommended = () => {

    const { currentUser } = useAuthContext();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllRecommendationAction(currentUser?._id))
    }, [currentUser])


    const RecommededData = useSelector((state) => state.GetAllRecommendedReducer.data);

    const [titles, setTitles] = useState({});

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const titlePromises = RecommededData?.data?.map(async (card) => {
                    const response = await fetch(`${API_URL}/property-type/get?_id=${card.hotelType}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching data for ID ${card.hotelType}`);
                    }

                    const data = await response.json();
                    const title = data?.data[0]?.title || 'Title not available';

                    return { id: card.hotelType, title };
                });

                // Wait for all title promises to resolve
                const titlesArray = await Promise.all(titlePromises);

                // Construct titles object
                const titlesObject = titlesArray.reduce((acc, { id, title }) => {
                    acc[id] = title;
                    return acc;
                }, {});

                // Update state with the titles
                setTitles(titlesObject);
            } catch (error) {
                console.error(error);
                // Handle the error, you may want to set default titles or show a message
            }
        };

        // Call the fetchTitles function only if RecommededData.data changes
        if (RecommededData?.data) {
            fetchTitles();
        }
    }, [RecommededData]);


    return (
        <>
            <CardContainer className='my-4'>
                {RecommededData?.data?.map((card, index) => (
                    <StyledCard key={index}>
                        <CardContent>
                            <img src={card?.hotelCoverImg} className='rounded' alt={`Image ${index}`} />
                            <div className="d-flex justify-content-between pt-2">
                                <Typography variant="caption" display="block" gutterBottom>
                                    {card?.hotelName}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ({card?.hotelRatings} rating)
                                </Typography>
                            </div>
                            {/* <Typography variant='small'></Typography> */}
                            <Typography variant="body1" display="block" color={'#ee2e24'} gutterBottom>
                                {titles[card?.hotelType] || 'Title not available'}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                ))}

            </CardContainer>
        </>
    );
};

export default MobileRecommended;
