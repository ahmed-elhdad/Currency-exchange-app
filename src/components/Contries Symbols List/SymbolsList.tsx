"use client";

import React, { useState } from 'react';
import "./SymbolsList.css";

const SymbolsList = () => {     
    const currencyAPI = "https://gist.githubusercontent.com/ksafranski/2973986/raw/Common-Currency.json";
    const [FSymbol, setFSymbol] = useState([]);
    async function fetchCurrencyAPI() {
        fetch(currencyAPI)
        .then((response) => {
            let data = response.json();
            return data;
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                
                setFSymbol(data[i])
            }
        })
        .catch((err) => console.log(err))
    }
    return (
        <>
            {FSymbol.map((symb, index) => (
                <span key={index}>{symb}</span>
            ))}
        </>
    )
}

export default SymbolsList