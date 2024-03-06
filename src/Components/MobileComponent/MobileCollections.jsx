import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Paper } from '@mui/material';
import styled from 'styled-components';



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


const MobileCollections = ({ CollectionData }) => {



    return (
        <>
            <CardContainer className='my-4'>
                {CollectionData?.data?.map((card, index) => (
                    <StyledCard key={index}>

                        <CardContent>
                            <img height={100} src={card?.cover || 'https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp'} className='rounded' alt={`Image ${index}`} />
                            <div className="d-flex justify-content-between py-2">
                                <Typography color={'#ee2e24'} variant="caption" display="block" gutterBottom>
                                    Hotelio
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ({card?.ratings || 0} rating)
                                </Typography>
                            </div>
                            {/* <Typography variant='small'></Typography> */}
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                {card?.title}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                ))}

            </CardContainer>
        </>
    );
};

export default MobileCollections;
