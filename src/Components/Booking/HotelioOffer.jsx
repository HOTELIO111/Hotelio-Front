import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useOffers } from '../../context/useOffers';
import { useBooking } from '../../context/useBooking';

const HotelioOffer = ({ hotelData }) => {
    const { GetOffer, CustomerOffers } = useOffers();
    // const { userBookingDetails } = useBooking()

    useEffect(() => {
        const fetchOffers = async () => {
            try {

                await CustomerOffers({ hotelId: "6572d0ed4e86694aa6cc66b8", roomId: "6572d0ed4e86694aa6cc66b9" });
            } catch (error) {
                console.error('Error fetching offers', error);
            }
        };

        fetchOffers();
    }, [CustomerOffers, GetOffer]);


    return (
        <Card style={{ border: '2px solid #ee2e24' }} className="w-100 my-1">
            <CardContent>
                {/* {console.log("chal rha hai")} */}
                <FormControl>
                    <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700} id="demo-radio-buttons-group-label">
                        Hotelio Offers
                    </Typography>
                    {GetOffer?.data && (
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            sx={{ ml: 1 }}
                        // value={selectedValue} // Replace 'selectedValue' with your actual state variable
                        // onChange={handleChange} // Replace 'handleChange' with your actual change handler function
                        >
                            {GetOffer.data.map((item, index) => (
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