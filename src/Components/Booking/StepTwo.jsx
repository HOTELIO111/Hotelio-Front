import { Alert, Button, Card, CardActions, CardContent, Chip, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material'
import React from 'react'

const StepTwo = () => {
  return (
    <div className='container p-2'>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card className='w-100'>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Enter your details
              </Typography>
              <Alert severity="success" color="info">
                Almost done! Just fill in the * required info
              </Alert>
              <TextField id="outlined-basic" label="Full Name *" margin='normal' variant="outlined" />

              <br />

              <TextField id="outlined-basic" label="Email *" margin='normal' variant="outlined" />
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
        </Grid>
        <Grid item xs={4}>
          <Card className='w-100'>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default StepTwo
