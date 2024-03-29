import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AiOutlineCopy } from "react-icons/ai";

import { Footer, Header } from "../../components";

import currenciesObject from "../../utils/currenciesObject";

import "./SpecificConversion.scss";

import { Rate } from "../../ts";

const apiUrl: string = "https://api.frankfurter.app/latest?amount=1&from=";

const SpecificConversion = () => {
    const [currencyFrom, setCurrencyFrom] = useState<number>(1);
    const [selectedCurrencyFrom, setSelectedCurrencyFrom] =
        useState<string>("AUD");
    const [currencyTo, setCurrencyTo] = useState<number>(1);
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<string>("AUD");
    const [rate, setRate] = useState<Rate>({ rate: 1 });

    const handleInputChange = (e: React.ChangeEvent) => {
        const inputNumber = (e.target as HTMLInputElement).value.replace(
            /\D/g,
            ""
        );
        if (selectedCurrencyFrom === selectedCurrencyTo) {
            setRate({ rate: 1 });
        }
        setCurrencyFrom(Number(inputNumber));
        setCurrencyTo(Number((e.target as HTMLInputElement).value) * rate.rate);
    };

    const handleFromSelectChange = (e: React.ChangeEvent) => {
        if (selectedCurrencyFrom === selectedCurrencyTo) {
            setRate({ rate: 1 });
        }
        setSelectedCurrencyFrom((e.target as HTMLInputElement).value);
    };

    const handleToSelectChange = (e: React.ChangeEvent) => {
        if (selectedCurrencyFrom === selectedCurrencyTo) {
            setRate({ rate: 1 });
        }
        setSelectedCurrencyTo((e.target as HTMLInputElement).value);
    };

    const copyConversion = () => {
        navigator.clipboard.writeText(
            `${currencyFrom} ${selectedCurrencyFrom} = ${
                Math.round((currencyTo + Number.EPSILON) * 100) / 100
            } ${selectedCurrencyTo}`
        );
        toast("Conversion copied to the clipboard 📋", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        // TODO Get currency del localStorage
        // TODO Set selectedCurrency
        if (selectedCurrencyFrom !== selectedCurrencyTo) {
            axios
                .get(
                    `${apiUrl}${selectedCurrencyFrom}&to=${selectedCurrencyTo}`
                )
                .then((response: AxiosResponse) => {
                    let rateResponse: object = response.data.rates;
                    let responseValue: number = Object.values(rateResponse)[0];
                    setRate({ rate: responseValue });
                    setCurrencyTo(currencyFrom * responseValue);
                })
                .catch((error: AxiosError) => {
                    console.log(error);
                });
        }
    }, [
        selectedCurrencyFrom,
        setSelectedCurrencyFrom,
        selectedCurrencyTo,
        setSelectedCurrencyTo,
    ]);

    return (
        <>
            <Header />
            <div className="specific">
                <h1 className="specific__title">$pecific Conv€rsion</h1>
                <form className="specific__form">
                    <div className="specific__from">
                        <label htmlFor="From" className="specific__label">
                            From:
                        </label>
                        <select
                            name="currencyFrom"
                            onChange={handleFromSelectChange}
                            className="specific__select"
                        >
                            {currenciesObject.map((currency) => (
                                <option
                                    key={currency.acronym}
                                    value={currency.acronym}
                                >
                                    {currency.flag} {currency.acronym}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="from"
                            min="0"
                            placeholder="0"
                            className="specific__input"
                            value={currencyFrom}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <span className="specific__icon" onClick={copyConversion}>
                        <AiOutlineCopy />
                    </span>
                    <div className="specific__to">
                        <label htmlFor="To" className="specific__label">
                            To:
                        </label>
                        <select
                            name="currencyTo"
                            onChange={handleToSelectChange}
                            className="specific__select"
                        >
                            {currenciesObject.map((currency) => (
                                <option
                                    key={currency.acronym}
                                    value={currency.acronym}
                                >
                                    {currency.flag} {currency.acronym}
                                </option>
                            ))}
                        </select>
                        <p className="specific__result">
                            {Math.round((currencyTo + Number.EPSILON) * 100) /
                                100}
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default SpecificConversion;
