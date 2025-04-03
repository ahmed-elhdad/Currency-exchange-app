"use client";

import React, { useState } from 'react'
import "./ImgsList.css";
const ImgsList = () => {
    const flagsAPI = "https://restcountries.com/v3.1/all";
    const [FIcon, setFIcon] = useState<{ flags: { svg: string } }[]>([]);

    async function fetchFlagsApi() {
        fetch(flagsAPI)
        .then((response) => {
            let data = response.json();
            console.log(data);
            return data;
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                setFIcon((prev) => [...prev, { flags: { svg: data[i].flags.svg } }]);
            }
            
        })
    }
    return (
        <>
            {/* ADD IMAGE */}
            {FIcon.map((ico, index) => (
                <img key={index} src={ico.flags.svg} alt="" />
            ))
            }
        </>
    )
}

export default ImgsList