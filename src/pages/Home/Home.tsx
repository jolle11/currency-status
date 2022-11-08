import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { CurrencyCard, Header, Footer } from '../../components';

import './Home.scss';

import currenciesObject from '../../utils/currenciesObject';

interface SelectedCurrency {
    flag: string;
    acronym: string;
    name?: string;
    rate?: number;
}

interface Rates {
    rate: number;
}

const apiUrl: string = 'https://api.frankfurter.app/latest';

const Home = () => {
    const [currencies, setCurrencies] = useState<SelectedCurrency[]>(currenciesObject);
    const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency>();
    const [currencyList, setCurrencyList] = useState<SelectedCurrency[]>([]);
    const [rates, setRates] = useState<Rates[]>([]);
    const [inputNumber, setInputNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleInputChange = (e: React.ChangeEvent) => {
        const limit: number = 11;
        setInputNumber(Number((e.target as HTMLInputElement).value.slice(0, limit)));
    };

    const handleCurrencySelect = (currency: object, index: number) => {
        setIsLoading(true);
        setSelectedCurrency(currencies[index]);
        const selectedCurrencyExcluded: SelectedCurrency[] = currencies.filter((selected) => {
            return selected !== currency;
        });
        setCurrencyList(selectedCurrencyExcluded);
        setInputNumber(1);
        // localStorage.setItem('currency', JSON.stringify(currency));
    };

    const handleCurrencyChange = (currency: SelectedCurrency) => {
        setIsLoading(true);
        setSelectedCurrency(currency);
        const changeCurrencyExcluded: SelectedCurrency[] = currencies.filter((selected) => {
            return selected.acronym !== currency.acronym;
        });
        setCurrencyList(changeCurrencyExcluded);
        // localStorage.setItem('currency', JSON.stringify(currency));
    };

    useEffect(() => {
        // TODO Get currency del localStorage
        // TODO Set selectedCurrency
        axios
            .get(
                `${apiUrl}?from=${
                    selectedCurrency?.acronym !== undefined ? selectedCurrency.acronym : 'EUR'
                }`
            )
            .then((response: AxiosResponse) => {
                const ratesObject: Rates = response.data.rates;
                let actualRates: Rates[] = [];
                // Create array of rate objects
                Object.entries(ratesObject).forEach(([key, value]) => {
                    actualRates.push({ rate: value });
                });
                setRates(actualRates);
                setIsLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [selectedCurrency, setSelectedCurrency]);

    return (
        <>
            <Header />
            {selectedCurrency ? (
                <div className="currency">
                    <form className="currency__form">
                        <h1 className="currency__title">{selectedCurrency.flag}</h1>
                        <label className="currency__selected">
                            {selectedCurrency.acronym} - {selectedCurrency.name} <br />
                        </label>
                        <input
                            type="number"
                            name="currency"
                            value={inputNumber}
                            placeholder="0"
                            onChange={handleInputChange}
                            min={1}
                            max={11}
                            maxLength={11}
                            className="currency__input"
                        />
                    </form>
                    {currencyList.map((currency, index) => (
                        <div key={index} className="currency__list">
                            <CurrencyCard
                                currency={currency}
                                index={index}
                                rates={rates}
                                inputNumber={inputNumber}
                                handleCurrencyChange={handleCurrencyChange}
                                isLoading={isLoading}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="currency">
                    {currencies.map((currency, index) => (
                        <button
                            key={index}
                            className="currency__select"
                            onClick={() => handleCurrencySelect(currency, index)}
                        >
                            {currency.flag}
                        </button>
                    ))}
                </div>
            )}
            <Footer />
        </>
    );
};

export default Home;
