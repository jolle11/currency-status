import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { CurrencyCard, Header, Footer } from '../../components';

import './Home.scss';

import currenciesObject from '../../utils/currenciesObject';

interface SelectedCurrency {
    flag: string;
    acronym: string;
    name: string;
}

interface CurrencyList {
    flag: string;
    acronym: string;
    name: string;
    amount: number;
}

interface Rates {
    rate: number;
}

const Home = () => {
    const [currencies, setCurrencies] = useState(currenciesObject);
    const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency>();
    const [currencyList, setCurrencyList] = useState<CurrencyList[]>([]);
    const [rates, setRates] = useState<Rates[]>([]);

    useEffect(() => {
        axios
            .get(`https://api.frankfurter.app/latest?from=${selectedCurrency?.acronym}`)
            .then((response: AxiosResponse) => {
                const ratesObject: Rates = response.data.rates;
                let actualRates: Rates[] = [];
                Object.entries(ratesObject).forEach(([key, value]) => {
                    actualRates.push({ rate: value });
                });
                setRates(actualRates);
                const selectedCurrencyExcluded: SelectedCurrency[] = currencies.filter(
                    (selected) => {
                        return selected !== selectedCurrency;
                    }
                );
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
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [selectedCurrency, rates]);

    return (
        <div>
            <Header />
            {!selectedCurrency && (
                <>
                    {currencies.map((currency, index) => (
                        <button onClick={() => setSelectedCurrency(currencies[index])}>
                            {currency.flag}
                        </button>
                    ))}
                </>
            )}
            {selectedCurrency && currencyList && (
                <>
                    <form>
                        <h1>{selectedCurrency.flag}</h1>
                        <label>
                            {selectedCurrency.acronym} - {selectedCurrency.name}
                            <input type="text" name="currency" />
                        </label>
                    </form>
                    {/* Map de CurrencyCard */}
                    {currencyList.map((currency, index) => (
                        <div>
                            <p>{currency.flag}</p>
                            <p>{rates[index].rate}</p>
                        </div>
                    ))}
                </>
            )}
            <Footer />
        </div>
    );
};

export default Home;
