import { Container } from '@mui/material'
import React from 'react'
import { FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import HotelioLogo from "../../images/HotelioLogo.png";

const MobileHeader = () => {

    const redesigne = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)'
    }

    const handlePhoneCall = () => {
        const phoneNumber = '811-551-0050';

        // Construct the phone call URL using the tel: scheme
        const phoneCallUrl = `tel:${phoneNumber}`;

        // Open the phone call URL
        window.location.href = phoneCallUrl;
    };

    return (
        <Container style={{ borderBottom: '2px solid #ee2e24' }}>
            <div style={redesigne}>
                <div></div>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/" >
                        <img alt="logo" style={{ width: '120px' }} src={HotelioLogo} />
                    </Link>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <FiPhoneCall onClick={handlePhoneCall} color='#ee2e24' size={20} />
                </div>
            </div>
        </Container>
    )
}

export default MobileHeader