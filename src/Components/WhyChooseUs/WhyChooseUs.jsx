import React from 'react';
import style from './WhyChooseUs.module.css';
import CardBackGround from '../../images/CardBackground.jpg';
import { FcBiohazard, FcOnlineSupport, FcRating, FcVip } from 'react-icons/fc';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AliceCarousel from 'react-alice-carousel';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const useStyles = makeStyles((theme) => ({
    WhyChooseUsContainer: {
        borderRadius: '15px',
        overflow: 'hidden',
        width: '100%',
        background: 'none',
        [theme.breakpoints.down('sm')]: {
            height: '100%',
        },
    },
    textSize: {
        fontSize: '0.9vw',
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.5vw',
        },
    },
}));

const WhyChooseUs = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const items = [
        // Slide 1
        <div className="item mx-3" data-value="1">
            <div className={`card ${style.card}`}>
                <img className="card-img" src={CardBackGround} alt="Card image" />
                <div className="card-img-overlay">
                    <h5 className="card-title">
                        <FcVip size={isMobile ? 30 : 80} />
                        <span style={{ color: '#ff5419' }}>VIP Service</span>
                    </h5>
                    <p className={`card-text ${classes.textSize}`}>
                        Introducing our exclusive VIP services, where luxury meets personalized care. Whether you're a
                        high-profile executive, a celebrity, or simply someone who appreciates the finer things in life,
                        we have tailored experiences to cater to your every need.
                    </p>
                </div>
            </div>
        </div>,
        // Slide 2
        <div className="item mx-3" data-value="2">
            <div className={`card  ${style.card}`}>
                <img className="card-img" src={CardBackGround} alt="Card image" />
                <div className="card-img-overlay">
                    <h5 className="card-title">
                        <FcOnlineSupport size={isMobile ? 30 : 80} />
                        <span style={{ color: '#ff5419' }}>24x7 Support</span>
                    </h5>
                    <p className={`card-text ${classes.textSize}`}>
                        Our hotel is committed to providing exceptional customer service around the clock with our 24x7
                        support. Whether it's late at night or early in the morning, our dedicated team is available to
                        assist you at any hour.
                    </p>
                </div>
            </div>
        </div>,
        // Slide 3
        <div className="item mx-3" data-value="3">
            <div className={`card  ${style.card}`}>
                <img className="card-img" src={CardBackGround} alt="Card image" />
                <div className="card-img-overlay">
                    <h5 className="card-title">
                        <FcBiohazard size={isMobile ? 30 : 80} />
                        <span style={{ color: '#ff5419' }}>Sanitization</span>
                    </h5>
                    <p className={`card-text ${classes.textSize}`}>
                        Our hotel takes cleaning and sanitization seriously, placing the safety and well-being of our
                        guests as a top priority. Our dedicated housekeeping team adheres to rigorous cleaning protocols
                        to ensure a pristine and hygienic environment throughout the hotel.
                    </p>
                </div>
            </div>
        </div>,
        // Slide 4
        <div className="item mx-3" data-value="4">
            <div className={`card ${style.card}`}>
                <img className="card-img" src={CardBackGround} alt="Card image" />
                <div className="card-img-overlay">
                    <h5 className="card-title">
                        <FcRating size={isMobile ? 30 : 80} />
                        <span style={{ color: '#ff5419' }}>5 Star Rating</span>
                    </h5>
                    <p className={`card-text ${classes.textSize}`}>
                        Nestled in an idyllic setting, this 5-star hotel is a sanctuary of luxury and refinement. As you
                        step through its grand entrance, you are greeted by a team of attentive staff dedicated to making
                        your stay an exceptional one.
                    </p>
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
            paddingLeft={isMobile ? 10 : 50}
            paddingRight={isMobile ? 10 : 50}
            responsive={responsive}
            disableButtonsControls // Disable the left and right navigation icons
            stagePadding={{ paddingLeft: 0, paddingRight: 0 }} // Remove horizontal padding on slides
        />
    );
};

export default WhyChooseUs;
