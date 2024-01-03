import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import OfferProvider from '../../context/useOffers'

const HotelioOffer = ({ hotelData }) => {

    console.log(hotelData)
    const { CustomerOffers } = OfferProvider

    // console.log(CustomerOffers(hotelData._id, ))


    return (
        <Card style={{ border: "2px solid #ee2e24" }} className="w-100 my-1">
            <CardContent>
                <FormControl>
                    <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700} id="demo-radio-buttons-group-label">Hotelio Offers</Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        sx={{ ml: 1 }}
                    >
                        <FormControlLabel value="blackfriday" control={<Radio />} label="BLACKFRIDAY" />
                        <FormControlLabel value="halfpayment" control={<Radio />} label="HALFPAYMENT" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    )
}

export default HotelioOffer