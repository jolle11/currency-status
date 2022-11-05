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
    const [inputNumber, setInputNumber] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleInputChange = (e: React.ChangeEvent) => {
        const limit: number = 11;
        setInputNumber(Number((e.target as HTMLInputElement).value.slice(0, limit)));
    };

    const handleCurrencySelect = (currency: object, index: number) => {
        setSelectedCurrency(currencies[index]);
        const selectedCurrencyExcluded: SelectedCurrency[] = currencies.filter((selected) => {
            return selected !== currency;
        });
        setCurrencyList(selectedCurrencyExcluded);
        setIsLoading(false);
        localStorage.setItem('currency', JSON.stringify(currency));
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
                console.log(response.data);
                const ratesObject: Rates = response.data.rates;
                let actualRates: Rates[] = [];
                // Create array of rate objects
                Object.entries(ratesObject).forEach(([key, value]) => {
                    actualRates.push({ rate: value });
                });
                setRates(actualRates);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [selectedCurrency, setSelectedCurrency]);

    return (
        <div>
            <Header />
            {!selectedCurrency && (
                <>
                    {currencies.map((currency, index) => (
                        <button key={index} onClick={() => handleCurrencySelect(currency, index)}>
                            {currency.flag}
                        </button>
                    ))}
                </>
            )}
            {selectedCurrency && (
                <>
                    {/* TODO: Posar form en un component? */}
                    <form>
                        <h1>{selectedCurrency.flag}</h1>
                        <label>
                            {selectedCurrency.acronym} - {selectedCurrency.name} <br />
                            <input
                                type="number"
                                name="currency"
                                value={inputNumber}
                                placeholder="0"
                                onChange={handleInputChange}
                                min={1}
                                max={11}
                                maxLength={11}
                                style={{ width: '100px' }}
                            />
                        </label>
                    </form>
                    {/* Map de CurrencyCard */}
                    {currencyList.map((currency, index) => (
                        <div key={index}>
                            <p>{currency.flag}</p>
                            <p>{currency.acronym}</p>
                            {inputNumber ? (
                                <p>
                                    {Math.round(
                                        (inputNumber * rates[index].rate + Number.EPSILON) * 100
                                    ) / 100}
                                </p>
                            ) : (
                                <p>0</p>
                            )}
                        </div>
                    ))}
                </>
            )}
            <Footer />
        </div>
    );
};

export default Home;
