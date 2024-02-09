import React, { useState, useEffect } from "react";
import moment from "moment";
import { Typography } from "@mui/material";

const CountdownTimer = ({ futureTime }) => {
    console.log(futureTime)
    const calculateTimeLeft = () => {
        const difference = moment(futureTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')- new Date();
        console.log(difference)
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [futureTime, calculateTimeLeft]);

    const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

    return (
        <div>
            {timeLeft.days > 0 && <div>{timeLeft.days} days</div>}
            <Typography
                variant="h6"
                gutterBottom
                className="text-warning fw-bolder"
            >
                {addLeadingZero(timeLeft.minutes)}:
                {addLeadingZero(timeLeft.seconds)}
            </Typography>

        </div>
    );
};

export default CountdownTimer;
