import { Chip, Grid } from '@mui/material'
import React from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import BathroomIcon from '@mui/icons-material/Bathroom';

const Detail = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div className="p-2">
                        <div className='d-flex align-items-center justify-content-between'>
                            <h2>Casa del Trigo</h2>
                            <Chip color='success' label='7.5' />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ad aliquid nisi voluptatem necessitatibus, repellendus minus quibusdam hic assumenda asperiores id eos dolore distinctio nam veritatis dolorum ratione doloremque dolores?</p>
                    </div>

                    <div className="d-flex align-items-center justify-content-evenly">
                        <div>
                            <ul>
                                <li className='p-2' ><AcUnitIcon /> Air Conditioner Room</li>
                                <li className='p-2' ><ConnectedTvIcon /> Smart TV Attached</li>
                                <li className='p-2' ><NetworkWifiIcon /> Free WiFi</li>
                            </ul>
                        </div>
                        <div>
                        <ul>
                            <li className='p-2' ><CameraRearIcon /> Geyser</li>
                            <li className='p-2' ><BathroomIcon /> Attached Bathroom</li>
                        </ul>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </div>
    )
}

export default Detail