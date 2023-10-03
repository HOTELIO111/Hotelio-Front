import React, { useState } from 'react'
import { Alert, Button, Card, CardActions, CardContent, Chip, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material'
import OrderSucessfully from '../../images/OrderSucessfully.gif'
import './BookingSteps.css'


const StepThree = () => {

  const [activeTab, setActiveTab] = useState('payOnline'); // Initialize the active tab state

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    orderId: '#HT0123456'
  });


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can process the formData, perform validation, and handle the payment
    console.log(formData);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [activeButton, setActiveButton] = useState('creditCard'); // Initialize the active tab state

  const handleButtonChange = (tab) => {
    setActiveButton(tab);
  };

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleBankNameChange = (event) => {
    setBankName(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitS = (event) => {
    event.preventDefault();
  };

  return (
    <div className='container p-2'>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card style={{ border: '2px solid #ee2e24' }} className='w-100 mb-1'>
            <CardContent>
              <Typography display={'flex'} alignItems={'center'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Hotel <Rating
                  name="read-only"
                  value={5}
                  readOnly
                />
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Desi Hotel (Resort)
              </Typography>
              <Typography variant="body2">
                22 Mal Road, Delhi, India
                100001
              </Typography>
              <div className='d-flex align-items-center'>
                <Chip
                  label={'9.3'}
                  sx={{ mr: 1, my: 1, background: '#ee2e24', color: '#ffd700' }}
                /> 5 · 233 reviews
              </div>
              <Typography variant="body2">
                Swimming pool, Restaurant, WiFi, Parking
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ border: '2px solid #ee2e24' }} className='w-100 mt-2 my-1'>
            <CardContent>
              <Typography color="text-dark" fontWeight={700}>
                Your booking details
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6} >
                  <Typography variant="overline" display="block">
                    Check-in
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ pl: 1.5 }} variant="overline" display="block" >
                    Check-out
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ borderRight: '1px solid #808080' }}>
                  <Typography variant="subtitle2">
                    Sat 26 Aug 2003
                  </Typography>
                  <Typography variant="caption" >
                    11:30 - 23:30
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ pl: 1.5 }} variant="subtitle2" >
                    Sun 27 Aug 2003
                  </Typography>
                  <Typography sx={{ pl: 1.5 }} variant="caption" >
                    10:30 - 11:00
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="overline">
                    Total length of stay:
                  </Typography>
                  <Typography variant="subtitle2">
                    1 night
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ border: '2px solid #ee2e24' }}>
            <CardContent>
              <Typography color="text-dark" fontWeight={700}>
                Your price summary
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" >
                  Original price
                </Typography>
                <Typography variant="caption" >
                  ₹ 2,800
                </Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" >
                  Limited-time Deal
                </Typography>
                <Typography variant="caption" >
                  - ₹ 1,120
                </Typography>
              </div>
              <Typography variant="caption">
                You're getting a discount because, for a limited time, this property is offering reduced rates on some rooms that match your search.
              </Typography>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ebf3ff', padding: '20px' }}>
              <Typography fontWeight={600} variant="h5">
                Price
              </Typography>
              <div className='text-right'>
                <Typography color='error' variant="h6" >
                  <del>₹ 2800</del>
                </Typography>
                <Typography fontWeight={700} variant="h5">
                  ₹ 1,680
                </Typography>
                <Typography variant="caption">
                  + ₹ 202 taxes and charges
                </Typography>
              </div>
            </div>
            <CardContent>
              <Typography color="text-dark" fontWeight={700}>
                Price information
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" >
                  Excludes ₹ 201.60 in taxes and charges
                </Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" >
                  Goods & services tax
                </Typography>
                <Typography variant="caption" >
                  ₹ 201.60
                </Typography>
              </div>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>

          {/* Conditionally render content based on activeTab */}
          <Grid container spacing={2} my={2}>

            <Grid item xs='12'>
              <Typography variant="h5" gutterBottom>
                Order Id: <b>#HT0123456</b>
              </Typography>
            </Grid>
            <Grid item xs='12'>
              <Typography variant="h5" gutterBottom>
                Pay Amount: <b>₹ 1680</b>
              </Typography>
            </Grid>
            <Grid item xs='12'>
              <Button size='small' variant="contained" color='error' onClick={() => handleTabChange('payAtHotel')} >Pay at Hotel</Button>
              <Button size='small' variant="contained" color='error' sx={{ m: 1 }} onClick={() => handleTabChange('partPayment')} >Part Payment</Button>
              <Button size='small' variant="contained" color='error' onClick={() => handleTabChange('payOnline')} >Pay Online</Button>
            </Grid>
          </Grid>
          <Grid container paddingY={2} spacing={1} mt={2}>
            <Grid item xs='12'>

              {activeTab === 'payAtHotel' ? <>
                <div style={{ background: '#eeeeeb' }} className='text-center'>
                  <img style={{ width: '200px' }} src={OrderSucessfully} alt="OrderSucessfully" />
                  <Typography variant="h5" py={2} gutterBottom>
                    Your hotel room booking has been successfully confirmed. Please check your registered email or mobile number for further details. If you require assistance, please contact our customer care.
                  </Typography>
                </div>
              </> : null}
              {activeTab === 'partPayment' ? <>
                <b>NA</b>
              </> : null}
              {activeTab === 'payOnline' ? <>
                <Grid container spacing={1}>
                  <Grid item xs={4} lg={4} sx={{
                    border: '1px solid #ee2e24',
                    padding: '10px !important',
                    borderRadius: '8px 0px 0px 8px'
                  }}>
                    <ul>
                      <li className={activeButton === 'creditCard' ? 'activeBorder ' : ' In-activeBorder'} style={{ fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('creditCard')} >Credit Card</li>
                      <li className={activeButton === 'debitCard' ? 'activeBorder ' : ' In-activeBorder'} style={{ borderTop: '2px solid #ee2e24', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('debitCard')} >Debit Card</li>
                      <li className={activeButton === 'netBanking' ? 'activeBorder' : ' In-activeBorder'} style={{ borderTop: '2px solid #ee2e24', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('netbanking')} >Net Banking</li>
                      <li className={activeButton === 'cashCard' ? 'activeBorder ' : ' In-activeBorder'} style={{ borderTop: '2px solid #ee2e24', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('creditCard')} >Cash Card</li>
                      <li className={activeButton === 'mobilePayment' ? 'activeBorder ' : ' In-activeBorder'} style={{ borderTop: '2px solid #ee2e24', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('creditCard')} >Mobile Payments</li>
                      <li className={activeButton === 'emi' ? 'activeBorder ' : ' In-activeBorder'} style={{ borderTop: '2px solid #ee2e24', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('creditCard')} >EMI</li>
                      <li className={activeButton === 'wallet' ? 'activeBorder ' : ' In-activeBorder'} style={{ borderTop: '2px solid #ee2e24', fontWeight: '600', cursor: 'pointer' }} onClick={() => handleButtonChange('creditCard')} >Wallet</li>
                    </ul>
                  </Grid>
                  <Grid item xs={8} lg={8} sx={{ borderRight: '2px solid #ee2e24', borderTop: '2px solid #ee2e24', borderBottom: '2px solid #ee2e24', borderRadius: '0px 8px 8px 0px', padding: '5px' }}>
                    <div>
                      {
                        activeButton === 'creditCard' ? <>
                          <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <TextField
                                  label="Card Number"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.cardNumber}
                                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Cardholder Name"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.cardholderName}
                                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  label="Expiration Date"
                                  variant="outlined"
                                  fullWidth
                                  type='month'
                                  value={formData.expirationDate}
                                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  label="CVV"
                                  variant="outlined"
                                  fullWidth
                                  value={formData.cvv}
                                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                                />
                              </Grid>
                            </Grid>
                            <Button
                              type="submit"
                              href='/Payment_failed'
                              variant="contained"
                              color='error'
                              size="large"
                              style={{ marginTop: '1rem' }}
                            >
                              Pay
                            </Button>
                          </form>
                        </> :
                          activeButton === 'debitCard' ? <>
                            <form onSubmit={handleSubmit}>
                              <Grid container spacing={3}>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Card Number"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.cardNumber}
                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Cardholder Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.cardholderName}
                                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    label="Expiration Date"
                                    variant="outlined"
                                    type='month'
                                    fullWidth
                                    value={formData.expirationDate}
                                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    label="CVV"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.cvv}
                                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                                  />
                                </Grid>
                              </Grid>
                              <Button
                                type="submit"
                                variant="contained"
                                sx={{ background: '#ee2e24' }}
                                size="large"
                                style={{ marginTop: '1rem' }}
                              >
                                Pay
                              </Button>
                            </form>
                          </> : activeButton === 'netbanking' ? <>
                            <form onSubmit={handleSubmitS}>
                              <Grid container spacing={3}>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Bank Name"
                                    variant="outlined"
                                    fullWidth
                                    value={bankName}
                                    onChange={handleBankNameChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Account Number"
                                    variant="outlined"
                                    fullWidth
                                    value={accountNumber}
                                    onChange={handleAccountNumberChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ background: '#ee2e24' }}
                                    size="large"
                                    fullWidth
                                  >
                                    Pay
                                  </Button>
                                </Grid>
                              </Grid>
                            </form>
                          </> : null
                      }

                    </div>
                  </Grid>
                </Grid>

              </> : null}
            </Grid>
          </Grid>


        </Grid>
      </Grid>
    </div>
  )
}

export default StepThree