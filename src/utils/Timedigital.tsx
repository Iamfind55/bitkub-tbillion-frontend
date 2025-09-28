"use client";
import React, { useState, useEffect } from 'react';
const Timedigital = () => {
    const [time, setTime] = useState(''); 
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);
    return (
        <div className='bg-info/70 text-warning w-[200px] rounded mt-5 text-xl text-center p-2'> 
            {<p>{time?time:'Loading...'}</p>}
        </div>
    );
};

export default Timedigital;