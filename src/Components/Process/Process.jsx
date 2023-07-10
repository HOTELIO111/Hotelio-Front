import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import ProcessImage from '../../images/Process.png'

const Process = () => {
    return (
        <div>
            <div>
                <img style={{ width: '100%' }} src={ProcessImage} alt="Process" />
                <div>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', padding: '0 15px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" gutterBottom>
                                    Search & Select
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" gutterBottom>
                                    Book & Confirm
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" className='pr-2' gutterBottom>
                                    Enjoy Your Stay
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Process
