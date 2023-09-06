import * as React from 'react';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Container, IconButton, Modal, Rating, TextareaAutosize, Typography } from '@mui/material';


export default function List() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            text: "Do you really want to cancel your Booking ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel Booking!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelled!',
                    'Your Booking will be cancelled.',
                    'success'
                )
            }
        })
    }


    const ReviewModal = () => {

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
            textAlign: 'center'
        }

        const [valueOfMoney, setvalueOfMoney] = React.useState(1);
        const [cleanliness, setcleanliness] = React.useState(1);
        const [comfort, setcomfort] = React.useState(1);
        const [overallReview, setoverallReview] = React.useState(1);

        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6">
                        Please share your review
                    </Typography>
                    <hr />
                    <div className='py-2'>
                        <Typography component="legend">Value of Money</Typography>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={valueOfMoney}
                            onChange={(event, newValue) => {
                                setvalueOfMoney(newValue);
                            }}
                        />

                        {console.log(valueOfMoney)}
                    </div>
                    <div className='py-2'>
                        <Typography component="legend">Cleanliness</Typography>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={cleanliness}
                            onChange={(event, newValue) => {
                                setcleanliness(newValue);
                            }}
                        />
                    </div>
                    <div className='py-2'>
                        <Typography component="legend">Comfort</Typography>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={comfort}
                            onChange={(event, newValue) => {
                                setcomfort(newValue);
                            }}
                        />
                    </div>
                    <div className='py-2'>
                        <Typography component="legend">Overall Review</Typography>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={overallReview}
                            onChange={(event, newValue) => {
                                setoverallReview(newValue);
                            }}
                        />
                    </div>
                    <div className='py-2'>
                        <Typography component="legend"> Write your Review </Typography>
                        <textarea className='border p-1' cols={50} rows={5} />
                    </div>
                    <Button variant="contained" onClick={handleClose} color="primary" size="medium">Share</Button>
                </Box>
            </Modal>
        )
    }


    return (
        <Container maxWidth="lg">
            <Typography py={3} component="div" variant="h4">
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
                                    alt="hotel"
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
                                                <Grid spacing={1} container>
                                                    <Grid item xs={12} lg={6} xl={6}>
                                                        <div>
                                                            <Button variant="contained" size="medium">View Hotel</Button>
                                                            <Button onClick={AlertBox} sx={{ ml: 1 }} variant="outlined" color="error" size="medium">Cancel</Button>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} lg={6} xl={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                                                        <ReviewModal />
                                                        <Button variant="contained" onClick={handleOpen} color="primary" size="medium">Share review</Button>
                                                    </Grid>
                                                </Grid>

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
                                        <Button variant="contained" color="primary" size="medium">Check Details</Button>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} lg={2} xl={2}>
                                                <Typography variant="button" display="block">
                                                    Booking ID
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    #HT0123456
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={2} xl={2}>
                                                <Typography variant="button" display="block">
                                                    Booking Date
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    24-08-2023
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={2} xl={2}>
                                                <Typography variant="button" display="block">
                                                    Booking Time
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    03:34 PM
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={2} xl={2}>
                                                <Typography variant="button" display="block">
                                                    No Of Guest
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    02 Adult
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={2} xl={2}>
                                                <Typography variant="button" display="block">
                                                    Booking status
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    Completed
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} lg={2} xl={2}>
                                                <Typography variant="button" display="block">
                                                    Payment Method
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    Online
                                                </Typography>
                                            </Grid>
                                        </Grid>
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
