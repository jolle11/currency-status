import { AiOutlineSelect, AiOutlineCopy } from 'react-icons/ai';

import './CurrencyCard.scss';
import './Loader.scss';

// TOASTIFY
import { toast } from 'react-toastify';

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
    navigator.clipboard.writeText(`${rate} - ${acronym}`);
    toast('Result copied to the clipboard 📋', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
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
            {isLoading ? (
                <div className="line-wobble"> </div>
            ) : (
                <p className="card__rate">{rateResult}</p>
            )}
            <p className="card__acronym">{acronym}</p>
            <p className="card__name">{name}</p>
        </div>
    );
};

export default CurrencyCard;
