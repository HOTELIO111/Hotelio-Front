import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const HotelioOffer = () => {
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

// import { Card, CardContent, Chip, Rating, Typography } from '@mui/material'
// import React from 'react'

// const HotelDetail = ({ hotelData }) => {
//     return (
//         <Card style={{ border: "2px solid #ee2e24" }} className="w-100 my-1">
//             <CardContent>
//                 <Typography
//                     display={"flex"}
//                     alignItems={"center"}
//                     sx={{ fontSize: 14 }}
//                     color="text.secondary"
//                     gutterBottom
//                 >
//                     Hotel{" "}
//                     <Rating name="read-only" value={hotelData?.hotelRatings} readOnly />
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
//                     {hotelData?.hotelName} ({hotelData?.hotelType?.title})
//                 </Typography>
//                 <Typography variant="body2">{hotelData?.address}</Typography>
//                 <div className="d-flex align-items-center">
//                     <Chip
//                         label={`${hotelData?.hotelRatings}`}
//                         sx={{ mr: 1, my: 1, background: "#ee2e24", color: "#ffd700" }}
//                     />{" "}
//                     5 · 233 reviews
//                 </div>
//                 <Typography variant="body2">
//                     Swimming pool, Restaurant, WiFi, Parking
//                 </Typography>
//             </CardContent>
//         </Card>
//     )
// }

// export default HotelDetail
