import React from 'react';
import style from './WhyChooseUs.module.css';
import CardBackGround from '../../images/CardBackground.jpg';
import { FcBiohazard, FcOnlineSupport, FcRating, FcVip } from 'react-icons/fc';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    WhyChooseUsContainer: {
        [theme.breakpoints.down('sm')]: {
            // Custom styles for small screens
            // Add mobile-specific styles here
        },
    }
}));

const WhyChooseUs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={`${style.WhyChooseUsContainer} ${classes.WhyChooseUsContainer}`}>
            <div className="row">
                <div className="col-xl-6">
                    <div className={`card  ${style.card}`}>
                        <img className="card-img" src={CardBackGround} alt="Card image" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">
                                <FcVip size={isMobile ? 30 : 80} />
                                <span style={{ color: '#ff5419' }}>VIP Service</span>
                            </h5>
                            <p className="card-text">
                                Introducing our exclusive VIP services, where luxury meets personalized care. Whether you're a
                                high-profile executive, a celebrity, or simply someone who appreciates the finer things in life,
                                we have tailored experiences to cater to your every need.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className={`card  ${style.card}`}>
                        <img className="card-img" src={CardBackGround} alt="Card image" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">
                                <FcOnlineSupport size={isMobile ? 30 : 80} />
                                <span style={{ color: '#ff5419' }}>24x7 Support</span>
                            </h5>
                            <p className="card-text">
                                Our hotel is committed to providing exceptional customer service around the clock with our 24x7
                                support. Whether it's late at night or early in the morning, our dedicated team is available to
                                assist you at any hour.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <div className={`card  ${style.card}`}>
                        <img className="card-img" src={CardBackGround} alt="Card image" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">
                                <FcBiohazard size={isMobile ? 30 : 80} />
                                <span style={{ color: '#ff5419' }}>Sanitization</span>
                            </h5>
                            <p className="card-text">
                                Our hotel takes cleaning and sanitization seriously, placing the safety and well-being of our
                                guests as a top priority. Our dedicated housekeeping team adheres to rigorous cleaning protocols
                                to ensure a pristine and hygienic environment throughout the hotel.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className={`card ${style.card}`}>
                        <img className="card-img" src={CardBackGround} alt="Card image" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">
                                <FcRating size={isMobile ? 30 : 80} />
                                <span style={{ color: '#ff5419' }}>5 Star Rating</span>
                            </h5>
                            <p className="card-text">
                                Nestled in an idyllic setting, this 5-star hotel is a sanctuary of luxury and refinement. As you
                                step through its grand entrance, you are greeted by a team of attentive staff dedicated to making
                                your stay an exceptional one.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
