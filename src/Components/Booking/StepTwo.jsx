import { Alert, Box, Button, Card, CardContent, Chip, FormControl, FormControlLabel, Grid, IconButton, Modal, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CoffeeIcon from '@mui/icons-material/Coffee';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Dates from '../date/Date';

const StepTwo = () => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 2,
    textAlign: 'center',
    borderRadius: '8px'
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [changeSelection, setChangeSelection] = useState(false)
  const [selectedValue, setSelectedValue] = useState('myself');
  const [show, setHide] = useState(false)
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [selectedGuest, setselectedGuest] = useState(1);
  const [selectedRoom, setselectedRoom] = useState(1);

  const Guestincrement = () => {
    if (selectedRoom) {
      if (selectedGuest < selectedRoom * 4) {
        setselectedGuest(selectedGuest + 1);
      } else {
        if (selectedGuest === 32) {
          window.alert('Maximum guests and rooms reached');
        } else {
          setselectedGuest(selectedGuest + 1);
          if (selectedGuest % 4 === 0) {
            setselectedRoom(selectedRoom + 1);
            window.alert('Selected room increased to ' + (selectedRoom + 1));
          }
        }
      }
    }
  };

  const Guestdecrement = () => {
    if (selectedGuest > 1) {
      setselectedGuest(selectedGuest - 1);
    }
  };

  const Roomincrement = () => {
    if (selectedRoom < 8) {
      setselectedRoom(selectedRoom + 1);
    }
  };

  const Roomdecrement = () => {
    if (selectedRoom > 1) {
      setselectedRoom(selectedRoom - 1);
    }
  };



  return (
    <div className='container p-2'>
      <Modal
        sx={{ zIndex: '1000' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Dates />
          <div className='my-2 d-flex justify-content-between'>
            <Button variant='contained'>Submit</Button>
            <Button sx={{ ml: 1 }} onClick={handleClose} variant='outlined'>Cancel</Button>
          </div>
        </Box>
      </Modal>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <Card style={{ border: '2px solid #ee2e24' }} className='w-100'>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                Enter your details
              </Typography>
              <Alert severity="success" color="info">
                {selectedValue === 'myself' ? 'Almost done! Just fill the * required info' : 'Just fill guest details'}
              </Alert>

              {selectedValue === 'myself' ? <div>
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
              </div> : <div>
                <TextField
                  InputProps={{ className: 'custom-input' }}
                  id="outlined-basic"
                  label="Full Name *"
                  margin='normal'
                  variant="outlined" />
                <TextField
                  InputProps={{ className: 'custom-input' }}
                  id="outlined-basic"
                  label="Email *"
                  margin='normal'
                  sx={{ ml: 1 }}
                  variant="outlined" />
                <br />

                <TextField
                  InputProps={{ className: 'custom-input' }}
                  id="outlined-basic"
                  label="Contact No. *"
                  margin='normal'
                  variant="outlined" />
              </div>}
              <Typography variant="caption" display="block">
                Confirmation email goes to this address
              </Typography>

              <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text-dark" fontWeight={700}>
                Who are you booking for?
              </Typography>

              <FormControl sx={{ ml: 1.5 }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="myself" control={<Radio sx={{ p: 0, pr: 1 }} />} label="Myself" />
                  <FormControlLabel value="someoneElse" control={<Radio sx={{ p: 0, pr: 1 }} />} label="Someone else" />
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
              <div className='d-flex justify-content-between align-items-center'>
                <Typography color="text-dark" variant='h6' fontWeight={700}>
                  Your booking details
                </Typography>

                <Typography onClick={handleOpen} sx={{ cursor: 'pointer' }} color='#ee2e24' variant='button' fontWeight={700}>
                  Edit
                </Typography>

              </div>
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
                      {selectedRoom} room for {selectedGuest} Guest
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
                  <Typography color='error' sx={{ cursor: 'pointer' }} onClick={() => setChangeSelection(!changeSelection)} variant="subtitle2">
                    Change Your Selection
                  </Typography>
                  {changeSelection &&
                    <div className='text-center'>
                      <div className='d-flex justify-content-evenly align-items-center'>
                        <Typography variant='overline' gutterBottom>Guest</Typography>
                        <FormControl className='w-50'>
                          <div>
                            <IconButton onClick={Guestdecrement} ><RemoveIcon /></IconButton>&nbsp;{selectedGuest}&nbsp;<IconButton onClick={Guestincrement} ><AddIcon /></IconButton>
                          </div>
                        </FormControl>
                      </div>
                      <div className='d-flex justify-content-evenly align-items-center py-2'>
                        <Typography variant='overline' gutterBottom>Room</Typography>
                        <FormControl className='w-50'>
                          <div>
                            <IconButton onClick={Roomdecrement} ><RemoveIcon /></IconButton>&nbsp;{selectedRoom}&nbsp;<IconButton onClick={Roomincrement} ><AddIcon /></IconButton>
                          </div>
                        </FormControl>
                      </div>
                      <Button color='error' fullWidth variant='contained'>Done</Button>
                    </div>

                  }
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
