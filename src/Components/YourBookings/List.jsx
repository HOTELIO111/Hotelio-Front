import * as React from 'react';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Container, IconButton, Rating, Typography } from '@mui/material';


export default function List() {


    const HotelBookedData = [
        {
            id: 1,
            imageURL: 'https://www.theparkhotels.com/images/site-specific/navi-mumbai/home/navi-mumbai-night-view.jpg',
            hotelName: 'The Park',
            totalReviewsCount: 7.6,
            totalRatingCount: 277,
            hotelStar: 4,
            hotelAddress: 'The hotel also offers room service (during limited hours). Quench your thirst with your favorite drink at the bar/lounge. Buffet breakfasts are available daily from 7 AM to 10:30 AM for a fee'
        },
        {
            id: 2,
            imageURL: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/orlandofl/5900_pool_b92df465-0c67-4161-b8bb-67f9fc301094.jpg',
            hotelName: 'The Park',
            totalReviewsCount: 7.6,
            totalRatingCount: 277,
            hotelStar: 4,
            hotelAddress: 'The hotel also offers room service (during limited hours). Quench your thirst with your favorite drink at the bar/lounge. Buffet breakfasts are available daily from 7 AM to 10:30 AM for a fee'
        },
        {
            id: 3,
            imageURL: 'https://www.hotelescaliforniasalou.com/assets/establishments/hotel-california-garden/piscina-y-exteriores.JPG',
            hotelName: 'The Park',
            totalReviewsCount: 7.6,
            totalRatingCount: 277,
            hotelStar: 4,
            hotelAddress: 'The hotel also offers room service (during limited hours). Quench your thirst with your favorite drink at the bar/lounge. Buffet breakfasts are available daily from 7 AM to 10:30 AM for a fee'
        }
    ]

    const AlertBox = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel Booking!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelled!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    return (
        <Container maxWidth="md">
            <Typography component="div" variant="h4">
                <b>Your Bookings</b>
            </Typography>
            {
                HotelBookedData.map((item) => {  // Changed 'index' to 'item'
                    return (
                        <Grid container spacing={0} marginTop={1} key={item.id}>
                            <Grid item xs={12} sm={4}>
                                <img
                                    style={{ borderRadius: '5px 0px 0px 0px', width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={item.imageURL}
                                    alt=""
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Card sx={{ display: 'flex', borderRadius: '0px 5px 0px 0px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {item.hotelName}
                                            </Typography>
                                            <Typography component="div" variant="p">
                                                {item.totalReviewsCount} ({item.totalRatingCount} reviews)
                                            </Typography>
                                            <Rating name="read-only" value={item.hotelStar} readOnly />
                                        </CardContent>
                                        <Box sx={{ pl: 1, pb: 1 }}>
                                            {item.hotelAddress}
                                            <CardActions>
                                                <Button variant="contained" color="primary" size="medium">Detail</Button>
                                                <Button onClick={AlertBox} variant="outlined" color="error" size="medium">Cancel</Button>
                                            </CardActions>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Accordion sx={{ borderRadius: '0px' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Accordion 1</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Container>
    );
}
