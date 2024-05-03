import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import style from './Testimonial.module.css'
import { Avatar, Grid, Rating, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TestimonialBack from '../../images/TestimonialBack.webp'
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";
import { GetHotelioReview } from '../../store/actions/HotelioReviewAction';

const responsive = {
    0: { items: 0 },
    568: { items: 1 },
    1024: { items: 2 },
};

const useStyles = makeStyles((theme) => ({
    testimonialContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '400px',
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
            margin: theme.spacing(10)
        },
        [theme.breakpoints.up('xs')]: {
            paddingRight: theme.spacing(1),
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(2),
        },
    },
    testimonialText: {
        color: '#8c8c8c',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(6),
        },
        [theme.breakpoints.up('xs')]: {
            marginBottom: theme.spacing(2),
            overflow: 'hidden'
        },
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: theme.spacing(2),
        color: '#6b0000',
        textAlign: 'start'
    },
    testimonialAvatar: {
        marginRight: theme.spacing(2),
    },
}));



const Testimonial = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GetHotelioReview())
    }, [])

    const HotelReview = useSelector((state) => state.GetHotelioReviewReducer.data);


    const classes = useStyles();

    return (
        <div style={{ background: `url(${TestimonialBack})`, backgroundRepeat: 'repeat', backgroundSize: 'contain' }}>
            {HotelReview?.data ? <Grid container>
                <Grid item xs={12} lg={4} xl={4} sx={{ display: 'grid', placeItems: 'center' }}>
                    <div style={{ padding: '0px 10px', textAlign: 'center' }}>
                        <Typography variant='h5' fontWeight={800}  >Our Testimonial</Typography>
                        <Typography variant='subtitle1' fontWeight={500} >Our Best Partner's Customer Reviews.</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} lg={8} xl={8}>
                    <div>
                        <AliceCarousel
                            mouseTracking
                            autoPlay
                            infinite
                            items={
                                HotelReview?.data?.map((i, index) => (
                                    <div className={`item ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value={index}>

                                        <div className={classes.testimonialAuthor}>
                                            <Avatar
                                                alt="Testimonial Author"
                                                src={i?.customer?.avatar}
                                                className={classes.testimonialAvatar}
                                            />
                                            <div>
                                                <Typography variant="subtitle1">{i?.customer?.name}</Typography>
                                                <Rating value={i?.ratings} readOnly />
                                            </div>
                                        </div>
                                        <Typography variant="body1" className={classes.testimonialText}>
                                            "{i?.message}"
                                        </Typography>
                                    </div>
                                ))
                            }
                            paddingLeft={5}
                            paddingRight={5}
                            responsive={responsive}
                            disableDotsControls
                            disableButtonsControls
                        />
                    </div>
                </Grid>
            </Grid> : <div className='p-5' style={{ display: 'grid', placeItems: 'center' }}>
                <Grid container>
                    <Grid item xs={12} lg={6} xl={6}>
                        <div className="px-3 pt-2">
                            <Skeleton
                                width="80%"
                                height={24}
                                duration={2}
                                style={{ backgroundColor: "#ddd" }}
                            />
                            <Skeleton
                                width="60%"
                                height={16}
                                duration={2}
                                style={{ backgroundColor: "#ddd" }}
                            />
                            <Skeleton
                                width="50%"
                                height={16}
                                duration={2}
                                style={{ backgroundColor: "#ddd" }}
                            />
                            <Skeleton
                                width="40%"
                                height={16}
                                duration={2}
                                style={{ backgroundColor: "#ddd" }}
                            />
                            <Skeleton
                                width="60%"
                                height={16}
                                duration={2}
                                style={{ backgroundColor: "#ddd" }}
                            />
                            <Skeleton
                                width="50%"
                                height={16}
                                duration={2}
                                style={{ backgroundColor: "#ddd" }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6} xl={6}>
                        <Skeleton
                            duration={1}
                            style={{
                                backgroundColor: "#ddd",
                                height: "180px",
                                width: "100%",
                            }}
                        />
                    </Grid>
                </Grid>
            </div>}
        </div>
    );
};

export default Testimonial;
