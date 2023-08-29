import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import style from './Testimonial.module.css'
import { Avatar, Grid, Rating, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

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
            paddingRight: theme.spacing(1), // Reduced padding for small screens
            marginLeft: theme.spacing(0), // Adjusted margin for small screens
            marginRight: theme.spacing(2), // Adjusted margin for small screens
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
            marginBottom: theme.spacing(2), // Reduced margin for small screens
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
    const classes = useStyles();
    const items = [
        // Slide 1
        <div className={`item ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="1">

            <div className={classes.testimonialAuthor}>
                <Avatar
                    alt="Testimonial Author"
                    src="/path-to-avatar-image.jpg"
                    className={classes.testimonialAvatar}
                />
                <div>
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Rating value={5} readOnly />
                </div>
            </div>
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
        </div>,
        // Slide 2
        <div className={`item ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="2">
            <div className={classes.testimonialAuthor}>
                <Avatar
                    alt="Testimonial Author"
                    src="/path-to-avatar-image.jpg"
                    className={classes.testimonialAvatar}
                />
                <div>
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Rating value={5} readOnly />
                </div>
            </div>
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
        </div>,
        // Slide 3
        <div className={`item ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="3">
            <div className={classes.testimonialAuthor}>
                <Avatar
                    alt="Testimonial Author"
                    src="/path-to-avatar-image.jpg"
                    className={classes.testimonialAvatar}
                />
                <div>
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Rating value={5} readOnly />
                </div>
            </div>
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
        </div>,
        // Slide 4
        <div className={`item ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="4">
            <div className={classes.testimonialAuthor}>
                <Avatar
                    alt="Testimonial Author"
                    src="/path-to-avatar-image.jpg"
                    className={classes.testimonialAvatar}
                />
                <div>
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Rating value={5} readOnly />
                </div>
            </div>
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
        </div>
    ];

    return (
        <div>
            <Grid container>
                <Grid item xs={12} lg={4} xl={4} sx={{ display: 'grid', placeItems: 'center' }}>
                    <div style={{ padding: '0px 10px', textAlign: 'center' }}>
                        <h3 className='mb-4'>
                            <b>Our Testimonial</b>
                        </h3>
                        <p>Our Best Vendor and Customer Reviews.</p>
                    </div>
                </Grid>
                <Grid item xs={12} lg={8} xl={8}>
                    <div>
                        <AliceCarousel
                            mouseTracking
                            autoPlay
                            infinite
                            items={items}
                            paddingLeft={5}
                            paddingRight={5}
                            responsive={responsive}
                            disableButtonsControls // Disable the left and right navigation icons
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Testimonial;
