import React from "react";
import FourZeroFour from "../../images/FourZeroFour.jpg";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          minHeight: '100vh', // This ensures the content takes at least the full viewport height
        }}
      >
        <img src={FourZeroFour} alt="404" />
      </div>
    </div>
  );
};

export default PageNotFound;
