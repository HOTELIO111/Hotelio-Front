import * as React from 'react';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Container, IconButton, Modal, Rating, TextareaAutosize, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';


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
            <Typography py={3} component="div" fontWeight={600} variant="h4">
                Your Bookings
            </Typography>
            {
                HotelBookedData.map((item) => {
                    return (
                        <Grid container spacing={0} my={1} key={item.id} sx={{ boxShadow: '10px 10px 34px 0px rgba(0,0,0,0.15)' }}>
                            <Grid item xs={12} lg={4}>
                                <img
                                    style={{ borderRadius: '5px 0px 0px 0px', width: '100%', maxHeight: '250px', objectFit: 'cover', minHeight: '250px' }}
                                    src={item.imageURL}
                                    alt="hotel"
                                />
                            </Grid>
                            <Grid item xs={12} lg={8}>
                                <Card sx={{ display: 'flex', borderRadius: '0px 5px 0px 0px', height: '100%' }}>
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
                                                            <Button color='error' href={`/searchedhotel/${item._id}`} variant="contained" size="medium">View Hotel</Button>
                                                            <Button onClick={AlertBox} sx={{ ml: 1 }} variant="outlined" color="error" size="medium">Cancel</Button>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} lg={6} xl={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                                                        <ReviewModal />
                                                        <Button variant="contained" color='error' onClick={handleOpen} size="medium">Share review</Button>
                                                    </Grid>
                                                </Grid>

                                            </CardActions>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid sx={{ borderTop: '2px solid #ee2e24' }} item xs={12} sm={12}>
                                <Accordion sx={{ borderRadius: '0px' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Button variant="contained" color='error' size="medium">Check Details</Button>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card sx={{ bgcolor: 'transparent', boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', borderRadius: '15px' }} className="p-1">
                                            {/* <Typography variant="h5">My Hotelio Wallet</Typography>
                                            <hr style={{ marginTop: "0px" }} /> */}

                                            <Grid spacing={2} p={1} container>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            BOOKING ID :
                                                        </Typography>
                                                        <Typography fontWeight={800} sx={{ pl: 2.5 }} variant="h6">
                                                            #HT0123456
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            BOOKING DATE & TIME :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            24-08-2023, 03:34 PM
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            CHECK IN :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            25-08-2023, 10:00 AM
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            CHECK OUT :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            27-08-2023, 10:00 AM
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            NO OF DAYS & NIGHT :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            3 DAYS, 2 NIGHT
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            NO OF GUEST :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            02 Guest, 1 Room
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            PAYMENT METHOD :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            Online
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            PAID AMOUNT :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            ₹ 1200
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            TXN ID :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            SD852352896
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            BOOKING STATUS :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            Completed
                                                        </Typography>
                                                    </div>
                                                </Grid>

                                            </Grid>

                                        </Card>
                                        {/* <Grid container spacing={2}>
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
                                        </Grid> */}
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
