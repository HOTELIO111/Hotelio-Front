import React from "react";
import styles from "./WeServe.module.css";
import worldMap from "../../images/worldMap.png";
import WeserveImage from "../../images/WeserveImage.webp";
import style from "./WeServe.module.css";

const WeServe = () => {
  return (
    <div
      className={styles.weServeContainer} // Apply CSS class for styling
      style={{
        backgroundImage: `url(${worldMap})`, width: '100%'
      }}
    >
      <div className={`row p-2 ${style.rowRevert}`}>
        <div className="col-xl-6 col-sm-12">
          <img src={WeserveImage} alt="Weserve Banner" width={'100%'} height={'100%'} />
        </div>
        <div
          className="col-xl-6 col-sm-12"
          style={{ display: "grid", placeItems: "center" }}
        >
          <div className="text-center text-dark">
            <h2><b>India's No. 1 Fastest Leading Hotel Chain</b></h2>
            <p className={` ${style.MiddlePadding}`}>
              <b>More Destinations. More Ease. More Affordable.</b>
            </p>

            <div className="row">
              <div className="col-xl-4 col-sm-12">
                <div className="px-3">
                  <h2><b>80</b></h2>
                  <p><b>Cities</b></p>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className="px-3">
                  <h2><b>45000+</b></h2>
                  <p><b>Hotels</b></p>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className="px-3">
                  <h2><b>150,000</b></h2>
                  <p><b>Vacation Homes</b></p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-sm-12">
                <div className="p-3">
                  <h4><b>Mumbai</b></h4>
                </div>
              </div>
              <div className="col-xl-6 col-sm-12">
                <div className="p-3">
                  <h4><b>Delhi</b></h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-sm-12">
                <div className="p-3">
                  <h4><b>Lucknow</b></h4>
                </div>
              </div>
              <div className="col-xl-6 col-sm-12">
                <div className="p-3">
                  <h4><b>Chennai</b></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeServe;
