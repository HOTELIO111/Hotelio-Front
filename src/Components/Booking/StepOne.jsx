import { Alert, Button, Card, CardActions, CardContent, Chip, Grid, Rating, TextField, Typography } from '@mui/material'
import React from 'react'

const StepOne = () => {
    return (
        <div className='container p-2'>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ mb: 1.5 }} color="text-dark" fontWeight={700}>
                                Enter your details
                            </Typography>
                            <Alert severity="success" color="info">
                                Almost done! Just fill in the * required info
                            </Alert>
                            <Typography display={'flex'} alignItems={'center'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Hotel <Rating
                                    name="read-only"
                                    value={5}
                                    readOnly
                                />
                            </Typography>
                            <div className='d-flex align-items-center'>
                                <Chip
                                    label={'9.3'}
                                    sx={{ mr: 1, my: 1, background: '#ee2e24', color: '#ffd700' }}
                                /> 5 · 233 reviews
                            </div>
                            <Typography variant="body2">
                                Swimming pool, Resturant, WiFi, Parking
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card className='w-100 mx-2'>
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
                                Swimming pool, Resturant, WiFi, Parking
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default StepOne