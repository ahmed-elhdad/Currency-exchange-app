"use client";

import React, { useEffect, useRef, useState } from 'react'
import "./inputs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
const Inputs = () => {
    const changeUrl = "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=ee33934ff8c64da4bb48704b94fd761a";
    const flagsAPI = "https://restcountries.com/v3.1/all";
    const currencyAPI = "https://gist.githubusercontent.com/ksafranski/2973986/raw/Common-Currency.json";
    const [amountIcon, setAmountIcon] = useState([]);
    const [currencyName, setCurrencyName] = useState([]);
    const [FIcon, setFIcon] = useState<{ flags: { svg: string } }[]>([]);
    const [FSymbol, setFSymbol] = useState<string[]>([]);
    const [TIcon, setTIcon] = useState<any>([]);
    const amountRef = useRef<HTMLInputElement>(null);
    const [money, setMoney] = useState<any>(null);
    async function fetchFlagsApi() {
        fetch(flagsAPI)
        .then((response) => {
            let data = response.json();
            return data;
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                setFIcon((prev) => [...prev, { flags: { svg: data[i].flags.svg } }]);
                setCurrencyName((prev) => [...prev, data[i].name.common]);
                setAmountIcon((prev) => [...prev, data[i].currencies]);
            }
            
        })
    }
    async function fetchCurrencyAPI() {
        fetch(currencyAPI)
        .then((response) => {
            let data = response.json();
            return data;
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                
                setFSymbol((prev) => [...prev, data[i]])
            }
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchFlagsApi();
        fetchCurrencyAPI()
    })
    return (
        <div className='inupts flex items-center justify-center tajawal-600'>
            <h2 className="title tajawal-bold">تحويل</h2>
            <div className="inputs flex justify-center items-center">
                <div className="amount flex justify-center items-center border inputs-rad">
                    <div className="main">
                        
                    </div>
                    <div className="input">
                        <label htmlFor="amountInput">المبلغ</label>
                        <input type="text" ref={amountRef} name='amountInput'
                        placeholder='المبلغ المراد تحويله'
                        onChange={(e) => { 
                            setMoney(e.target.value);
                            console.log(money);
                            
                            }
                        }
                        />
                    </div>
                </div>
                <div className="change flex justify-center items-center">
                    <div className="from">
                        <div className="input border inputs-rad tajawal-500">
                            <label htmlFor="fromInput">من</label>
                            <input type="text" name='fromInput' />
                        </div>
                        <div className="select d-none tajawal-500">
                            <div className='images'>
                                {/* ADD IMAGE */}
                                {FIcon.map((ico, index) => (
                                    <img key={index} src={ico.flags.svg} alt="" />
                                ))
                                }
                            <div/>
                        </div>
                            <div className="name tajawal-500">
                                {/* ADD NAME */}
                                {currencyName.map((name, index) => (
                                    <span key={index}>{name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button type='button' className='switch tajawal-500'>
                        <FontAwesomeIcon icon={faShuffle} />
                    </button>
                    <div className="to tajawal-500">
                            <div className="input">
                                <label htmlFor="toInput"></label>
                                <input type="text"  name='toInput' />
                            </div>
                            <div className="select d-none tajawal-500">
                                <div className="images">
                                     {/* ADD IMAGE */}
                                    {FIcon.map((ico, index) => (
                                        <img key={index} src={ico.flags.svg} alt="" />
                                    ))
                                }
                                </div>
                                <div className="symbol">
                                    {/* ADD SYMBOL */}
                                    {FSymbol.map((symb, index) => (
                                        <span key={index}>{symb}</span>
                                    ))}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <a href="../Header/Header.scss" download>click to download</a>
            <button type='button'>تحويل</button>
        </div>
    )
}
export default Inputs;