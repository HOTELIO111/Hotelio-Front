import React from 'react'
import './TravelWallet.css'
import { Grid } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const TravelWallet = () => {
    return (
        <Grid container mt={1} spacing={1}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
        </Grid>
    )
}

export default TravelWallet