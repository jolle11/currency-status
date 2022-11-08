import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { Header, Footer } from '../../components';

import './SpecificConversion.scss';

import currenciesObject from '../../utils/currenciesObject';

interface Rate {
    rate: number;
}

const apiUrl: string = 'https://api.frankfurter.app/latest?amount=1&from=';

const SpecificConversion = () => {
    const [currencyFrom, setCurrencyFrom] = useState<number>(1);
    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<string>('AUD');
    const [currencyTo, setCurrencyTo] = useState<number>(1);
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<string>('AUD');
    const [rate, setRate] = useState<Rate>({ rate: 1 });

    const handleInputChange = (e: React.ChangeEvent) => {
        if (selectedCurrencyFrom === selectedCurrencyTo) {
            setRate({ rate: 1 });
        }
        setCurrencyFrom(Number((e.target as HTMLInputElement).value));
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

    useEffect(() => {
        // TODO Get currency del localStorage
        // TODO Set selectedCurrency
        if (selectedCurrencyFrom !== selectedCurrencyTo) {
            axios
                .get(`${apiUrl}${selectedCurrencyFrom}&to=${selectedCurrencyTo}`)
                .then((response: AxiosResponse) => {
                    let rateResponse: object = response.data.rates;
                    let responseValue: number = Object.values(rateResponse)[0];
                    setRate({ rate: responseValue });
                    setCurrencyTo(currencyFrom * responseValue);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }, [selectedCurrencyFrom, setSelectedCurrencyFrom, selectedCurrencyTo, setSelectedCurrencyTo]);

    return (
        <div className="specific">
            <Header />
            <h1 className="specific__title">Specific Conversion</h1>
            <form className="specific__form">
                <div className="specific__from">
                    <label htmlFor="From">From</label>
                    <select name="currencyFrom" onChange={handleFromSelectChange}>
                        {currenciesObject.map((currency) => (
                            <option key={currency.acronym} value={currency.acronym}>
                                {currency.flag} {currency.acronym}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="from"
                        placeholder="0"
                        className="specific__input"
                        value={currencyFrom}
                        onChange={handleInputChange}
                    />
                </div>
                <span>➡️</span>
                <div className="specific__to">
                    <label htmlFor="To">To</label>
                    <select name="currencyTo" onChange={handleToSelectChange}>
                        {currenciesObject.map((currency) => (
                            <option key={currency.acronym} value={currency.acronym}>
                                {currency.flag} {currency.acronym}
                            </option>
                        ))}
                    </select>
                    <p className="specific__result">
                        {Math.round((currencyTo + Number.EPSILON) * 100) / 100}
                    </p>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default SpecificConversion;
