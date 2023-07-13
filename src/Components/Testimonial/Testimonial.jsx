import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import style from './Testimonial.module.css'
import { Avatar, Rating, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const useStyles = makeStyles((theme) => ({
    testimonialContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
    },
    testimonialText: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(6),
        },
    },
    testimonialAuthor: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    testimonialAvatar: {
        marginRight: theme.spacing(2),
    },
}));

const Testimonial = () => {
    const classes = useStyles();
    const items = [
        // Slide 1
        <div className={`item mx-2 ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="1">
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
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
        </div>,
        // Slide 2
        <div className={`item mx-2 ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="2">
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
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
        </div>,
        // Slide 3
        <div className={`item mx-2 ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="3">
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
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
        </div>,
        // Slide 4
        <div className={`item mx-2 ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="4">
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
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
        </div>,
        // Slide 5
        <div className={`item mx-2 ${style.TestimonialSliderStyle} ${classes.testimonialContainer}`} data-value="5">
            <Typography variant="body1" className={classes.testimonialText}>
                "The hotel staff provided exceptional service during our stay. The room was clean and comfortable, and the amenities were top-notch. The staff went above and beyond to make sure we had a wonderful experience. We will definitely be staying here again!"
            </Typography>
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
        </div>,
    ];

    return (
        // AliceCarousel component
        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            items={items}
            paddingLeft={50}
            paddingRight={50}
            responsive={responsive}
            disableButtonsControls // Disable the left and right navigation icons

        />
    );
};

export default Testimonial;
