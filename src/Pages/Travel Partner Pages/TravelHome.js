import React, { useEffect, useState } from 'react';
import TravelHeader from '../../Components/Travel Partner Components/TravelHeader';
import { Card, Container, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import TravelProfile from './TravelProfile';
import TravelWallet from './TravelWallet';
import { useAuthContext } from '../../context/userAuthContext';
import { useNavigate } from 'react-router-dom';
import TravelBooking from './TravelBooking';
import TravelSetting from './TravelSetting';

const tabIcons = {
    tab1: <AccountBalanceWalletIcon fontSize='large' />,
    tab2: <BeenhereIcon fontSize='large' />,
    tab3: <AccountCircleIcon fontSize='large' />,
    tab4: <SettingsIcon fontSize='large' />,
};

const tabLabels = {
    tab1: 'Dashboard',
    tab2: 'Booking',
    tab3: 'Account',
    tab4: 'Settings',
};

const TravelHome = () => {

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('tab1'); // Initial active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const { currentUser } = useAuthContext();

    const handleBackButton = () => {
        navigate('/Travel-Partner-Home'); // Navigate to the desired route without a page reload
    };

    useEffect(() => {
        const popstateListener = (e) => {
            if (e.type === "popstate") {
                handleBackButton();
            }
        };

        window.addEventListener("popstate", popstateListener);

        return () => {
            window.removeEventListener("popstate", popstateListener);
        };
    }, [navigate]);

    return (
        <div>
            <TravelHeader />
            <Container>
                <div>
                    <Typography py={1} className='text-capitalize' variant='h6'>Welcome, {currentUser?.name}</Typography>
                </div>
                <Card className='d-flex p-3 m-1 justify-content-between align-items-center'>
                    {Object.keys(tabIcons).map((tab) => (
                        <div
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            // className={activeTab === tab ? '' : stylediv}
                            style={{ color: activeTab === tab ? "#ee2e24" : "", cursor: 'pointer' }}
                        >
                            {tabIcons[tab]}
                            <Typography variant='p'>{tabLabels[tab]}</Typography>
                        </div>
                    ))}
                </Card>
                {activeTab === 'tab1' ? <TravelWallet /> : activeTab === 'tab2' ? (<TravelBooking />) : activeTab === 'tab3' ? (<TravelProfile />) : activeTab === 'tab4' && (
                    <TravelSetting />
                )}
            </Container>
        </div >
    );
};

export default TravelHome;
