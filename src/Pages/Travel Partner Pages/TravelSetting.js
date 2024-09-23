import { Button, Card, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const TravelSetting = () => {

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Card className='p-2'>
            <Grid spacing={1} container >
                <Grid item xs={12}>
                    <Typography variant='h5'> Payment Setting</Typography>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="wallet" control={<Radio />} label="Instant payment on wallet" />
                            <FormControlLabel value="orginal" control={<Radio />} label="Orginal Payment method settelment 2 or 3 working days " />
                        </RadioGroup>
                    </FormControl>
                    <Button variant='contained'> Save</Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default TravelSetting