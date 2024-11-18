import React from 'react';
import { Box, Card, CardContent, Typography, Divider, Button, Stack } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MovieIcon from '@mui/icons-material/Movie';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';

function FlightCard() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, my: 2, boxShadow: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
        <Typography variant="subtitle1" color="text.secondary">
          Air India
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <FlightTakeoffIcon fontSize="small" />
          <Box>
            <Typography variant="h6">03:30</Typography>
            <Typography variant="caption" color="text.secondary">New Delhi (DEL)</Typography>
          </Box>
          
          <Divider orientation="vertical" flexItem />

          <FlightLandIcon fontSize="small" />
          <Box>
            <Typography variant="h6">06:20</Typography>
            <Typography variant="caption" color="text.secondary">Bangalore (BLR)</Typography>
          </Box>
        </Stack>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          2h 50m • A350 Widebody jet
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <FastfoodIcon fontSize="small" color="action" />
          <Typography variant="caption">Meal available (Free)</Typography>
          <LocalDrinkIcon fontSize="small" color="action" />
          <Typography variant="caption">Beverages (Free)</Typography>
          <MovieIcon fontSize="small" color="action" />
          <Typography variant="caption">On-demand video</Typography>
        </Stack>
      </Box>
      
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6" color="primary">₹7,025</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>Select</Button>
      </Box>
    </Card>
  );
}

export default FlightCard;
