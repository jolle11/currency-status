import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { CurrencyCard, Footer, Header } from "../../components";
import currenciesObject from "../../utils/currenciesObject";
import { Rates, SelectedCurrency } from ".././../ts";
import "./Home.scss";

const apiUrl: string = "https://api.frankfurter.app/latest";

const Home = () => {
    const [currencies, setCurrencies] =
        useState<SelectedCurrency[]>(currenciesObject);
    const [selectedCurrency, setSelectedCurrency] =
        useState<SelectedCurrency>();
    const [currencyList, setCurrencyList] = useState<SelectedCurrency[]>([]);
    const [rates, setRates] = useState<Rates[]>([]);
    const [inputNumber, setInputNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleInputChange = (e: React.ChangeEvent) => {
        const inputNumber = (e.target as HTMLInputElement).value.replace(
            /\D/g,
            ""
        );
        setInputNumber(Number(inputNumber));
    };

    const handleCurrencySelect = (currency: object, index: number) => {
        setIsLoading(true);
        setSelectedCurrency(currencies[index]);
        const selectedCurrencyExcluded: SelectedCurrency[] = currencies.filter(
            (selected) => {
                return selected !== currency;
            }
        );
        setCurrencyList(selectedCurrencyExcluded);
        setInputNumber(1);
        window.scrollTo(0, 0);
        // localStorage.setItem('currency', JSON.stringify(currency));
    };

    const handleCurrencyChange = (currency: SelectedCurrency) => {
        setIsLoading(true);
        setSelectedCurrency(currency);
        const changeCurrencyExcluded: SelectedCurrency[] = currencies.filter(
            (selected) => {
                return selected.acronym !== currency.acronym;
            }
        );
        setCurrencyList(changeCurrencyExcluded);
        window.scrollTo(0, 0);
        // localStorage.setItem('currency', JSON.stringify(currency));
    };

    useEffect(() => {
        // TODO Get currency del localStorage
        // TODO Set selectedCurrency
        axios
            .get(
                `${apiUrl}?from=${
                    selectedCurrency?.acronym !== undefined
                        ? selectedCurrency.acronym
                        : "EUR"
                }`
            )
            .then((response: AxiosResponse) => {
                const ratesObject: Rates = response.data.rates;
                // Create array of rate objects
                let actualRates: Rates[] = [];
                Object.entries(ratesObject).forEach(([key, value]) => {
                    actualRates.push({ rate: value });
                });
                setRates(actualRates);
                setIsLoading(false);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            });
    }, [selectedCurrency, setSelectedCurrency]);

    return (
        <>
            <Header />
            {selectedCurrency ? (
                <div className="currency">
                    <form className="currency__form">
                        <h1 className="currency__title">
                            {selectedCurrency.flag}
                        </h1>
                        <label className="currency__selected">
                            {selectedCurrency.acronym} - {selectedCurrency.name}
                        </label>
                        <br />
                        <input
                            type="text"
                            name="currency"
                            min="0"
                            value={inputNumber}
                            placeholder="0"
                            onChange={handleInputChange}
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
                            onClick={() =>
                                handleCurrencySelect(currency, index)
                            }
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
