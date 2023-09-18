import { Card } from '@mui/material'
import React, { useEffect } from 'react'
import OrderFailed from '../../images/OrderFailed.svg'
import { useAuthContext } from '../../context/userAuthContext';

const FailedPage = () => {

  const { currentUser } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `/Customer${currentUser?.name}Profile`; // Replace with your target page URL
    }, 8000);

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, []);

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Card className='text-center'
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '500px',
          height: '500px',
          background: '#eeeeeb',
          boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
        }}>
        <div>
          <img style={{ width: '200px' }} src={OrderFailed} alt="order-gif" />
          <p className='pt-2'><b>Hey, your transaction has been failed.</b></p>
          <p className='p-0'>The page will navigate to your booking history in a few seconds.</p>
        </div>
      </Card>
    </div>
  );
}

export default FailedPage;
