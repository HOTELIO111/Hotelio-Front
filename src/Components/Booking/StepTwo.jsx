import { Alert, Button, Card, CardActions, CardContent, Chip, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CoffeeIcon from '@mui/icons-material/Coffee';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const StepTwo = () => {

  const navigate = useNavigate()
  const [show, setHide] = useState(false)

  return (
    <div className='container p-2'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <Card style={{ border: '2px solid #ee2e24' }} className='w-100'>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Enter your details
              </Typography>
              <Alert severity="success" color="info">
                Almost done! Just fill the * required info
              </Alert>

              <TextField
                InputProps={{ className: 'custom-input' }}
                id="outlined-basic"
                label="Full Name *"
                margin='normal'
                variant="outlined" />

              <br />

              <TextField
                InputProps={{ className: 'custom-input' }}
                id="outlined-basic"
                label="Email *"
                margin='normal'
                variant="outlined" />
              <Typography variant="caption" display="block">
                Confirmation email goes to this address
              </Typography>

              <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text-dark" fontWeight={700}>
                Who are you booking for?
              </Typography>

              <FormControl sx={{ ml: 1.5 }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="myself" control={<Radio sx={{ p: 0, pr: 1 }} />} label="Myself" />
                  <FormControlLabel value="someoneElse" control={<Radio sx={{ p: 0, pr: 1 }} />} label="someone else" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
          <Card style={{ border: '2px solid #ee2e24' }} className='w-100 my-2'>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Deluxe Double Room
              </Typography>

              <Typography sx={{ pl: 1.5, color: '#ee2e24' }} variant="subtitle1" >
                <CoffeeIcon /> Breakfast included in the price
              </Typography>
              <Typography sx={{ pl: 1.5, color: '#000' }} variant="subtitle1" >
                <DoDisturbIcon /> Total cost to cancel
                <Tooltip sx={{ pl: '1' }} title="Total cost for cancellation">
                  <HelpOutlineIcon fontSize='small' />
                </Tooltip>{' '}
              </Typography>
              <Typography sx={{ pl: 1.5 }} variant="overline" >
                <VapingRoomsIcon /> Smoking permitted
              </Typography>
              <Typography sx={{ pl: 1.5 }} variant="overline" display='block' >
                Swimming pool, Restaurant, WiFi, Parking
              </Typography>
              <Typography display={'flex'} alignItems={'center'} sx={{ fontSize: 14, fontWeight: 800, pl: 1.5 }} gutterBottom>
                Guests: <PersonIcon /> <PersonIcon /> <PersonIcon />
              </Typography>

            </CardContent>
          </Card>
        </Grid>
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
                  <hr />
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} item xs={12}>
                  <div>
                    <Typography variant="overline">
                      Your selected
                    </Typography>
                    <Typography variant="subtitle2">
                      1 room for 1 adult
                    </Typography>

                  </div>
                  <div style={{ cursor: 'pointer' }} className='p-2 border'>
                    {show ? <ExpandLessIcon onClick={() => setHide(!show)} /> : <ExpandMoreIcon onClick={() => setHide(!show)} />}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {show ? <>
                    <Typography variant="overline">
                      1 x Deluxe Double Room
                    </Typography>
                    <Typography variant="caption" display="block">
                      3 adults
                    </Typography>
                  </> : null}
                  <Typography onClick={() => navigate(-1)} sx={{ color: '#ee2e24' }} variant="subtitle2">
                    Change Your Selection
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
      </Grid>
    </div>
  )
}

export default StepTwo
