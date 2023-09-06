import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/footer/Footer'
import HotelCover from './HotelCover'
import Detail from './Detail'
import { API_URL } from '../../config'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const HotelDetail = () => {

    const { id } = useParams();

    const [data, setData] = useState(null);

    const GetHoteldata = async () => {
        try {
            const response = await axios.get(API_URL + `/hotel/hoteldetails/${id}`);
            if (response.status === 200) {
                setData(response.data.data);
                console.log(data);
            }
            console.log('API Response:', response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetHoteldata();
    }, []);


    return (
        <>
            <Navbar />
            <HotelCover data={data} />
            <Detail data={data} />
            <Footer />
        </>
    )
}

export default HotelDetail