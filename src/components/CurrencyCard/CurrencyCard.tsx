import { AiOutlineSelect, AiOutlineCopy } from 'react-icons/ai';

import './CurrencyCard.scss';
import './Loader.scss';

interface Props {
    currency: SelectedCurrency;
    rates: Rates[];
    index: number;
    inputNumber?: number;
    handleCurrencyChange: any;
    isLoading: boolean;
}

interface SelectedCurrency {
    flag: string;
    acronym: string;
    name?: string;
    rate?: number;
}

interface CopyResult {
    rate: number;
    acronym: string;
}

interface Rates {
    rate: number;
}

const copyResult = ({ rate, acronym }: CopyResult) => {
    console.log(`${rate} - ${acronym}`);
    navigator.clipboard.writeText(`${rate} - ${acronym}`);
};

const CurrencyCard = ({
    currency,
    rates,
    index,
    inputNumber,
    handleCurrencyChange,
    isLoading,
}: Props) => {
    const { flag, name, acronym } = currency;
    const rateResult: number =
        Math.round(((inputNumber || 0) * rates[index].rate + Number.EPSILON) * 100) / 100;
    return (
        <div className="card">
            <div className="card__options">
                <span
                    className="card__options card__options--change"
                    onClick={() => handleCurrencyChange({ flag, acronym, name })}
                >
                    <AiOutlineSelect />
                </span>
                <span
                    className="card__options card__options--copy"
                    onClick={() =>
                        copyResult({
                            rate: rateResult,
                            acronym,
                        })
                    }
                >
                    <AiOutlineCopy />
                </span>
            </div>
            <p className="card__flag">{flag}</p>
            {inputNumber && !isLoading ? (
                <p className="card__rate">{rateResult}</p>
            ) : (
                // <p className="card__rate"></p>
                <div className="line-wobble"> </div>
            )}
            <p className="card__acronym">{acronym}</p>
            <p className="card__name">{name}</p>
        </div>
    );
};

export default CurrencyCard;
