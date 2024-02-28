import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../context/userAuthContext';
import { GetAllRecommendationAction } from '../../store/actions/recommendedAction';

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

const cardData = [
    {
        title: 'Hotel',
        para: 'Hotelio Homestay.',
        content: '(4.1 rating)',
        image: 'https://passionbuz.com/wp-content/uploads/2019/09/luxurious-hotels-in-the-world-TITANIC-MARDAN-PALACE-1024x683.jpg',
    },
    {
        title: 'Hotel',
        para: 'Hotelio Premium.',
        content: '(4.2 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Hotel',
        para: 'Hotelio Budget.',
        content: '(4.1 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Hotel',
        para: 'Hotelio Premium.',
        content: '(4.4 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
    {
        title: 'Hotel',
        para: 'Hotelio Homestay.',
        content: '(3.8 rating)',
        image: 'https://cliffshotelandspa.com/wp-content/uploads/2021/08/pismo_beach_hotels_1024x630_pool_gallery-1024x683-1.jpeg',
    },
];

const MobileCollections = () => {

    const { currentUser } = useAuthContext();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllRecommendationAction(currentUser._id))
    }, [currentUser])


    const RecommededData = useSelector((state) => state.GetAllRecommendedReducer.data);

    return (
        <>
            <CardContainer className='my-4'>
                {cardData.map((card, index) => (
                    <StyledCard key={index}>

                        <CardContent>
                            <img src={card.image} className='rounded' alt={`Image ${index}`} />
                            <div className="d-flex justify-content-between py-2">
                                <Typography variant="caption" display="block" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    {card.content}
                                </Typography>
                            </div>
                            {/* <Typography variant='small'></Typography> */}
                            <Typography variant="caption" display="block" gutterBottom>
                                {card.para}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                ))}

            </CardContainer>
        </>
    );
};

export default MobileCollections;
