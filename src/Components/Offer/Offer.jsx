import React from 'react';
import style from './Offer.module.css';
import OfferLeftImage from '../../images/OfferLeftImage.png';
import OfferRightImage from '../../images/OfferRightImage.png';

const Offer = () => {
  return (
    <div className={`row rounded ${style.OfferContainer}`}>
      {/* Left Column */}
      <div className="col-xl-6 col-md-12 order-md-1 d-flex align-items-center justify-content-center">
        <div>
          <img className={`rounded ${style.image}`} src={OfferLeftImage} alt="" />
        </div>
      </div>
      {/* Right Column */}
      <div style={{ display: 'grid', placeItems: 'end' }} className={`col-xl-6 col-md-12 order-md-2 ${style.containerMobileBehavior}`}>
        <div className={`${style.textColorWithPadding}`}>
          <div>
            {/* Image */}
            <img className={`rounded img-fluid ${style.image}`} src={OfferRightImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
