import { AiOutlineCopy, AiOutlineSelect } from "react-icons/ai";

import "./CurrencyCard.scss";
import "./Loader.scss";

// TOASTIFY
import { toast } from "react-toastify";

interface Props {
	currency: SelectedCurrency;
	rates: Rates[];
	index: number;
	inputNumber?: number;
	handleCurrencyChange: HandleCurrencyChange;
	isLoading: boolean;
}

import { CopyResult, Rates, SelectedCurrency } from "../../ts";

type HandleCurrencyChange = (currency: SelectedCurrency) => void;

const copyResult = ({ rate, acronym }: CopyResult) => {
	navigator.clipboard.writeText(`${rate} - ${acronym}`);
	toast("Result copied to the clipboard 📋", {
		position: "top-center",
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
	const rateResult: number = rates?.[index]
		? Math.round(
				((inputNumber || 0) * rates[index].rate + Number.EPSILON) * 100,
		  ) / 100
		: 0;

	return (
		<div className="card">
			<div className="card__options">
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<span
					className="card__options card__options--change"
					onClick={() => handleCurrencyChange({ flag, acronym, name })}
				>
					<AiOutlineSelect />
				</span>
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
