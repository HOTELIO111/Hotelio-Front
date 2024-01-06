import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useBooking } from '../../context/useBooking';
import React, { useEffect } from 'react';
import { useOffers } from '../../context/useOffers';
import { GetBookingOffers } from '../../store/actions/OfferActions';

const HotelioOffer = () => {

    const offerData = useSelector((state) => state.GetBookingOffersReducers)





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
                        >
                            {offerData.data.map((item, index) => (
                                <FormControlLabel key={index} value={item.code} control={<Radio />} label={item.code} />
                            ))}
                        </RadioGroup>
                    )}
                </FormControl>
            </CardContent>
        </Card>

    );
};

export default HotelioOffer;