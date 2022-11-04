import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { CurrencyCard, Header, Footer } from '../../components';

import './Home.scss';

import currenciesObject from '../../utils/currenciesObject';

interface SelectedCurrency {
    flag: string;
    acronym: string;
    name: string;
}

interface CurrencyList extends SelectedCurrency {
    amount: number;
}

interface Rates {
    rate: number;
}

const Home = () => {
    const [currencies, setCurrencies] = useState<SelectedCurrency[]>(currenciesObject);
    const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency>();
    const [currencyList, setCurrencyList] = useState<CurrencyList[]>([]);
    const [rates, setRates] = useState<Rates[]>([]);
    const [inputNumber, setInputNumber] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleInputChange = (e: React.ChangeEvent) => {
        console.log(Number((e.target as HTMLInputElement).value));
        const limit: number = 11;
        setInputNumber(Number((e.target as HTMLInputElement).value.slice(0, limit)));
    };

    const handleCurrencySelect = (currency: object, index: number) => {
        setSelectedCurrency(currencies[index]);
        localStorage.setItem('currency', JSON.stringify(currency));
    };

    useEffect(() => {
        // TODO Get currency del localStorage
        // TODO Setejar selectedCurrency

        axios
            .get(`https://api.frankfurter.app/latest?from=${selectedCurrency?.acronym}`)
            .then((response: AxiosResponse) => {
                const ratesObject: Rates = response.data.rates;
                let actualRates: Rates[] = [];
                // Create array of rate objects
                Object.entries(ratesObject).forEach(([key, value]) => {
                    actualRates.push({ rate: value });
                });
                setRates(actualRates);
                // Exclude selected currency from list
                const selectedCurrencyExcluded: SelectedCurrency[] = currencies.filter(
                    (selected) => {
                        return selected !== selectedCurrency;
                    }
                );
                // Create list with amount included
                const currencyListWithAmount: CurrencyList[] = [];
                selectedCurrencyExcluded.map((value, index) => {
                    currencyListWithAmount.push({
                        flag: value.flag,
                        acronym: value.acronym,
                        name: value.name,
                        amount: rates[index].rate,
                    });
                });
                setCurrencyList(currencyListWithAmount);
                setIsLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [selectedCurrency]);

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
                    {/* TODO: Posar form en un component */}
                    <form>
                        <h1>{selectedCurrency.flag}</h1>
                        <label>
                            {selectedCurrency.acronym} - {selectedCurrency.name} <br />
                            <input
                                type="number"
                                name="currency"
                                value={inputNumber}
                                defaultValue={1}
                                onChange={handleInputChange}
                                min={1}
                                max={11}
                                maxLength={11}
                                style={{ width: '100px' }}
                            />
                        </label>
                    </form>
                    {/* Map de CurrencyCard */}
                    {/* TODO: Buscar la forma de renderitzar el component al mateix temps que s'actualitzen els rates*/}
                    {currencyList.map((currency, index) => (
                        <div key={index}>
                            <p>{currency.flag}</p>
                            <p>{currency.acronym}</p>
                            <p>
                                {Math.round(
                                    (inputNumber * rates[index].rate + Number.EPSILON) * 100
                                ) / 100}
                            </p>
                        </div>
                    ))}
                </>
            )}
            <Footer />
        </div>
    );
};

export default Home;
