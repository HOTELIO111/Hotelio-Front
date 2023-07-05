import React from 'react'
import style from './Profile.module.css'
import { Button, Grid } from '@mui/material'

const Profile = () => {
  return (
    <div>
      <Grid container className='min-vh-100' spacing={2}>
        <Grid xs={12} className='text-center' item>
          <h3>Welcome to Hotelio Please Update Your profile !</h3>
          <p>Membership Offer Coming Soon</p>
        </Grid>
        <Grid item xs={4}>
          <div className={`${style.box1} ${style.box}`}>
            <div className={` ${style.content}`}>
              <div className={` ${style.image}`}>
                <img src="https://i.postimg.cc/bryMmCQB/profile-image.jpg" alt="Profile Image" />
              </div>
              <div className={` ${style.level}`}>
                <p>PRO</p>
              </div>
              <div className={` ${style.text}`}>
                <p className={` ${style.name}`}>Ethan Rivers</p>
                <h5 className={` ${style.job_title}`}>8090300447</h5>
                <h5 className={` mt-0 ${style.job_discription}`}>abc@gmail.com</h5>
              </div>
              <div className={` ${style.button}`}>
                <div>
                  <Button variant='contained' className={` ${style.connect}`} type="button">Edit</Button>
                </div>
              </div>
              <div className={`mt-1 ${style.button}`}>
                <div>
                  <Button variant='contained' className={` ${style.connect}`} type="button">Update Password</Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'grid', placeItems: 'center' }} className={`min-vh-100 ${style.box1} ${style.box}`}>
            <div>
              Hotel History Loading...
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile