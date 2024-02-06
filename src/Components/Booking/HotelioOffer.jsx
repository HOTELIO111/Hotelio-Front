import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useCollections } from '../../context/useStateManager';

const HotelioOffer = () => {

    const offerData = useSelector((state) => state.GetBookingOffersReducers);
    const { applicableOffer, setApplicableOffer } = useCollections();
    const handleOfferChange = (event) => {
        setApplicableOffer(event.target.value);
    };

    return (
        <Card style={{ border: '2px solid #ee2e24' }} className="w-100 my-1">
            <CardContent>
                <FormControl>
                    <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700} id="demo-radio-buttons-group-label">
                        Hotelio Offers
                    </Typography>
                    {offerData?.data && (
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            sx={{ ml: 1 }}
                            value={applicableOffer}
                            
                            // defaultValue={offerData?.data?.[0]?.item?._id}
                            onChange={handleOfferChange}
                        >
                            {offerData.data.map((item, index) => (
                                <FormControlLabel key={index} value={item._id} control={<Radio />} label={item.code} />
                            ))}
                        </RadioGroup>
                    )}
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default HotelioOffer;
