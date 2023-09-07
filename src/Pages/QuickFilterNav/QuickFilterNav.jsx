import React from 'react';
import HotelBudget from '../../images/HotelInBudget.png';
import PrimeHotel from '../../images/PrimeHotel.png';
import HomeStay from '../../images/HomeStay.png';
import HotelBudgetTwo from '../../images/HotelInBudgetTwo.png';
import PrimeHotelTwo from '../../images/PrimeHotelTwo.png';
import HomeStayTwo from '../../images/HomeStayTwo.png';
import { useNavigate } from 'react-router-dom';
import style from './QuickFilterNav.module.css'
import { Card, CardContent, Grid } from '@mui/material';



const QuickFilterNav = () => {
    const navigate = useNavigate();

    return (

        <>
            {/* <div style={{ width: "100%" }} className={style.mainDiv}>
                <div onClick={() => navigate('/searchedhotels')} style={{ objectFit: "cover", objectPosition: 'center', minHeight: '180px', maxHeight: '200px' }} className={style.cardStyle}>
                    <img src={PrimeHotel} style={{ borderRadius: "1rem" }} alt="PrimeHotel" />
                    <h5>Hotelio Premium</h5>
                </div>
                <div onClick={() => navigate('/searchedhotels')} style={{ objectFit: "cover", objectPosition: 'center', minHeight: '180px', maxHeight: '200px' }} className={style.cardStyle}>
                    <img src={HomeStay} style={{ borderRadius: "1rem" }} alt="HomeStay" />
                    <h5>Hotelio Home Stay</h5>
                </div>
                <div onClick={() => navigate('/searchedhotels')} style={{ objectFit: "cover", objectPosition: 'center', minHeight: '180px', maxHeight: '200px' }} className={style.cardStyle}>
                    <img src={HotelBudget} style={{ borderRadius: "1rem" }} alt="HotelBudget" />
                    <h5>Hotelio Budget</h5>
                </div>
            </div> */}
            <Grid container className={style.mainDiv} spacing={3} paddingY={0} justifyContent="center">
                <Grid item >
                    <Card className='planCard'onClick={() => navigate('/searchedhotels')} sx={{ minHeight: 200, maxWidth: 200, maxHeight: 280, borderRadius: '8px', filter: 'invert(1)' }}>
                        <div className="text-center p-1">
                            <img src={PrimeHotelTwo} style={{ borderRadius: "1rem" }} alt="PrimeHotel" />
                        </div>
                        <CardContent className='pb-0'>
                            <div className="text-center">
                                <h5 style={{ color: '#11d1db', fontFamily: 'Roboto, sans-serif' }}>Hotelio Premium</h5>
                                <hr style={{ backgroundColor: '#f00', width: '120px', height: '2px', margin: '10px auto', color: '#f00' }} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className='planCard'onClick={() => navigate('/searchedhotels')} sx={{ minHeight: 200, maxWidth: 200, maxHeight: 280, borderRadius: '8px', filter: 'invert(1)' }}>
                        <div className="text-center p-1">
                            <img src={HomeStayTwo} style={{ borderRadius: "1rem" }} alt="HomeStay" />
                        </div>
                        <CardContent style={{ paddingBottom: '5px' }}>
                            <div className="text-center">
                                <h5 style={{ color: '#11d1db', fontFamily: 'Roboto, sans-serif', }}>Hotelio Home Stay</h5>
                                <hr style={{ backgroundColor: '#f00', width: '120px', height: '2px', margin: '10px auto', color: '#f00' }} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className='planCard'onClick={() => navigate('/searchedhotels')} sx={{ minHeight: 200, maxWidth: 200, maxHeight: 280, borderRadius: '8px', filter: 'invert(1)' }}>
                        <div className="text-center p-1">
                            <img src={HotelBudgetTwo} style={{ borderRadius: "1rem" }} alt="HotelBudget" />
                        </div>
                        <CardContent style={{ paddingBottom: '5px' }}>
                            <div className="text-center">
                                <h5 style={{ color: '#11d1db', fontFamily: 'Roboto, sans-serif' }}>Hotelio Budget</h5>
                                <hr style={{ backgroundColor: '#f00', width: '120px', height: '2px', margin: '10px auto', color: '#f00' }} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default QuickFilterNav;
