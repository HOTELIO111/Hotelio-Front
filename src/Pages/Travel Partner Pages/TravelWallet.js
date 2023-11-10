import React from 'react'
import './TravelWallet.css'
import { Card, Grid, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TravelCarousel from './TravelCarousel.js';
import TravelGstVerify from './TravelGstVerify';

const TravelWallet = () => {
    return (
        <Grid container mt={1} spacing={1}>
            <Grid item xs={12} lg={4}>
                <div className="credit-card">
                    <div className="card-top">
                        {/* <div className="chip"></div> */}
                        <AccountBalanceWalletIcon fontSize='large' />
                        <div className="rupees">
                            <span>&#8377;</span> 1000.00
                        </div>
                    </div>
                    <div className="card-bottom">
                        <div className="card-holder">Wallet Amount</div>
                        <div className="valid-thru">
                            <span>VALID</span> THRU
                            <div className="valid-date">12/24</div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} lg={4}>
                <div className="credit-card">
                    <div className="card-top">
                        <BeenhereIcon fontSize='large' />
                        <div className="rupees">
                            10
                        </div>
                    </div>
                    <div className="card-bottom">
                        <div className="card-holder">My Bookings</div>
                        <div className="valid-thru">
                            <span>VALID</span> THRU
                            <div className="valid-date">12/24</div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} lg={4}>
                <div className="credit-card">
                    <div className="card-top">
                        <CurrencyRupeeIcon fontSize='large' />
                        <div className="rupees">
                            <span>&#8377;</span> 1000.00
                        </div>
                    </div>
                    <div className="card-bottom">
                        <div className="card-holder">Total Commission</div>
                        <div className="valid-thru">
                            <span>VALID</span> THRU
                            <div className="valid-date">12/24</div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Card className='p-4 mt-2' style={{ background: "#ee2e2463", boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}>
                    <TravelGstVerify />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card className='p-4' style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}>
                    <Typography fontWeight={600} variant='h5'>Hotelio Biz Offerings</Typography>
                    <Typography variant='p'>QUICK GLIMPSE OF WHAT HOTELIO OFFERS TO CORPORATES</Typography>
                    <TravelCarousel />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card className='p-4' style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}>
                    <Typography fontWeight={600} variant='h5'>Offer & Updates</Typography>
                    <Typography variant='p'>QUICK GLIMPSE OF WHAT HOTELIO OFFERS TO CORPORATES</Typography>
                    <TravelCarousel />
                </Card>
            </Grid>
        </Grid >
    )
}

export default TravelWallet