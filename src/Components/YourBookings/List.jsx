import * as React from 'react';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuthContext } from "../../context/userAuthContext";
import { GetBookingHistoryAction } from '../../store/actions/BookingHistoryAction';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Container, IconButton, Modal, Rating, TextareaAutosize, Typography } from '@mui/material';
import moment from 'moment/moment';


export default function List() {

    const dispatch = useDispatch()
    const { currentUser } = useAuthContext();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const BookingData = useSelector((state) => state.GetBookingHistoryReducers);


    React.useEffect(() => {
        dispatch(GetBookingHistoryAction(currentUser?._id));
    }, [currentUser])

    console.log(BookingData?.data?.data)

    const totalLengthOfStay = (checkIn, checkOut) => {
        const newCheckIn = new Date(checkIn);
        const newCheckOut = new Date(checkOut);
        const timeDifference = newCheckOut.getTime() - newCheckIn.getTime();
        const totalDays = timeDifference / (1000 * 3600 * 24);
        return totalDays;
    };


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
                Booking History
            </Typography>
            <ReviewModal />
            {
                BookingData?.data?.data?.map((item, index) => {
                    return (
                        <Grid container spacing={0} my={1} key={index} sx={{ boxShadow: '10px 10px 34px 0px rgba(0,0,0,0.15)' }}>
                            <Grid item xs={12} lg={4}>
                                <img
                                    style={{ borderRadius: '5px 0px 0px 0px', width: '100%', maxHeight: '250px', objectFit: 'cover', minHeight: '250px' }}
                                    src={item?.hotel?.[0]?.hotelCoverImg}
                                    alt="hotel"
                                />
                            </Grid>
                            <Grid item xs={12} lg={8}>
                                <Card sx={{ display: 'flex', borderRadius: '0px 5px 0px 0px', height: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {item?.hotel?.[0]?.hotelName}
                                            </Typography>
                                            <Typography component="div" variant="p">
                                                {item?.hotel?.[0]?.reviews.length} ({item?.hotel?.[0]?.reviews.length} reviews)
                                            </Typography>
                                            <Rating name="read-only" value={item?.hotel?.[0]?.hotelRatings} readOnly />
                                        </CardContent>
                                        <Box sx={{ pl: 1, pb: 1 }}>
                                            {item?.hotel?.[0]?.discription && (
                                                <span>
                                                    {item?.hotel[0]?.discription.substring(0, 200)}...
                                                </span>
                                            )}
                                            <CardActions>
                                                <Grid spacing={1} container>
                                                    <Grid item xs={12} lg={6} xl={6}>
                                                        <div>
                                                            <Button color='error' href={`/searchedhotel/${item?.hotel?.[0]?._id}`} variant="contained" size="medium">View Hotel</Button>
                                                            <Button onClick={AlertBox} sx={{ ml: 1 }} variant="outlined" color="error" size="medium">Cancel</Button>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} lg={6} xl={6} sx={{ display: 'flex', justifyContent: 'end' }}>
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

                                            <Grid spacing={2} p={1} container>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            BOOKING ID :
                                                        </Typography>
                                                        <Typography fontWeight={800} sx={{ pl: 2.5 }} variant="h6">
                                                            {item?.bookingId}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            BOOKING DATE & TIME :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            {moment(item?.dateOfBooking).format('DD-MM-YYYY, h:mm a')}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            CHECK IN :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            {moment(item?.bookingDate?.checkIn).format('DD-MM-YYYY, h:mm a')}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            CHECK OUT :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            {moment(item?.bookingDate?.checkOut).format('DD-MM-YYYY, h:mm a')}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            NO OF DAYS & NIGHT :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            {totalLengthOfStay(item?.bookingDate?.checkIn, item?.bookingDate?.checkOut)} NIGHT
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            NO OF GUEST :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            {item?.numberOfGuests?.adults} Guest, {item?.numberOfRooms} Room
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            TXN ID :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            NA
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center  border-bottom">
                                                        <Typography fontWeight={700} variant="p">
                                                            BOOKING STATUS :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2.5 }} variant="h6">
                                                            {item?.bookingStatus}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center">
                                                        <Typography fontWeight={700} variant="p">
                                                            PAYMENT METHOD :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2 }} variant="h6">
                                                            {item?.payment?.paymentType}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <div className="d-flex align-items-center">
                                                        <Typography fontWeight={700} variant="p">
                                                            PAID AMOUNT :
                                                        </Typography>
                                                        <Typography sx={{ pl: 2 }} variant="h6">
                                                            {item?.payment?.payments && item.payment.payments.length === 0 ? (
                                                                <Button variant="contained" size='small' color="primary">
                                                                    Pay Now
                                                                </Button>
                                                            ) : (
                                                                item?.payment?.payments
                                                            )}

                                                        </Typography>
                                                    </div>
                                                </Grid>

                                            </Grid>

                                        </Card>
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
