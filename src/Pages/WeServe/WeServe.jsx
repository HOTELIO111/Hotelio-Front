import React from 'react';
import styles from './WeServe.module.css'; // Assuming you have a separate CSS module for styling
import WeserveBanner from '../../images/WeserveBanner.png';
import WeserveImage from '../../images/WeserveImage.png';

const WeServe = () => {
    return (
        <div
            className={styles.weServeContainer} // Apply CSS class for styling
            style={{
                backgroundImage: `linear-gradient(4deg, rgba(255,255,255,1) 17%, rgba(188,124,124,0.3394607843137255) 89%), url(${WeserveBanner})`,
                boxShadow: 'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px'
            }}
        >
            <div className="row p-2">
                <div className="col-xl-6 col-sm-12">
                    <img src={WeserveImage} className='img-fluid' alt="Weserve Banner" />
                </div>
                <div className="col-xl-6 col-sm-12" style={{ display: 'grid', placeItems: 'center' }}>
                    <h2>India's No. 1 Fastest Leading Hotel Chain</h2>
                    <p>More Destinations. More Ease. More Affordable.</p>

                    <div className="row">
                        <div className="col-xl-4 col-sm-12">
                            <div className='px-3'>
                                <h2>80</h2>
                                <p>Cities</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-12">
                            <div className='px-3'>
                                <h2>45000+</h2>
                                <p>Hotels</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-12">
                            <div className='px-3'>
                                <h2>150,000</h2>
                                <p>Vacation Homes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeServe;
