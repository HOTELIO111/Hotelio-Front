import React from 'react';
import style from './featured.module.css';
import { Button } from '@mui/material';

const Featured = () => {
  return (
    <div
      className={`row rounded ${style.featuredContainer}`}
    >
      {/* Left Column */}
      <div className={`col-xl-12 col-sm-12 m-0 p-0 ${style.featuredContainerOne}`}  >
        {/* Image */}
        {/* <img className='img-fluid rounded' src='https://www.maunakearesort.com/images/hero/full/SHOT01_COUPLE_WALKING_SAND_0500.jpg' alt="" /> */}
      </div>
      <div className="col-xl-12 col-sm-12 m-0 p-5 text-center" style={{ display: 'grid', placeItems: 'center' }}>
        <div className={`${style.textColourwithPadding}`}>
          <h4 className=''>Take your longest holiday yet</h4>
          <p className='text-dark'>
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
    </div>
  );
}

export default Featured;
