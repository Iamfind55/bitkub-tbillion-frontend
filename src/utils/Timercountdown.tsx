import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ seconds, onCountdownEnd }:{ seconds:number, onCountdownEnd:()=>void }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            onCountdownEnd(); // Trigger callback when countdown reaches zero
        }
    }, [timeLeft, onCountdownEnd]);

    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <p>Time Left: {formatTime(timeLeft)}</p>
        </div>
    );
};

export default CountdownTimer;