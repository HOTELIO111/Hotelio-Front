import React from 'react';
import style from './featured.module.css';
import { Button } from '@mui/material';

const Featured = () => {
  return (
    <div
      className={`row rounded ${style.featuredContainer}`}
    >
      {/* Left Column */}
      <div className="col-xl-8 col-sm-12" style={{ display: 'grid', placeItems: 'center' }}>
        <div className={`${style.textColourwithPadding}`}>
          <h4 className=''>Take your longest holiday yet</h4>
          <p>
            {/* Description */}
            Unwind amidst nature's embrace, beneath the sun's warm rays,
            Embrace the freedom to wander, to explore in endless ways.
            Recharge your weary soul, let stress be gently swept away,
            On this journey of leisure, make beautiful memories that'll forever stay.
          </p>
          {/* Button */}
          <Button variant="contained" className='my-3' color="error">Find & Stay</Button>
        </div>
      </div>
      {/* Right Column */}
      <div className="col-xl-4 col-sm-12" style={{ display: 'grid', placeItems: 'center' }}>
        <div className={`${style.textColourwithPadding}`}>
          {/* Image */}
          <img className='img-fluid rounded' src='https://hips.hearstapps.com/hmg-prod/images/champagne-beach-espiritu-santo-island-vanuatu-royalty-free-image-1655672510.jpg?crop=1.00xw:0.755xh;0,0.173xh&resize=1200:*' alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
