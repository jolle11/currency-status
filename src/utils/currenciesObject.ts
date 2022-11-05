interface CurrenciesObject {
    flag: string;
    acronym: string;
    name?: string;
    rate?: number;
}

const currenciesObject: CurrenciesObject[] = [
    { flag: '🇦🇺', acronym: 'AUD', name: 'Australian Dollar' },
    { flag: '🇧🇬', acronym: 'BGN', name: 'Bulgarian Lev' },
    { flag: '🇧🇷', acronym: 'BRL', name: 'Brazilian Real' },
    { flag: '🇨🇦', acronym: 'CAD', name: 'Canadian Dollar' },
    { flag: '🇨🇭', acronym: 'CHF', name: 'Swiss Franc' },
    { flag: '🇨🇳', acronym: 'CNY', name: 'Chinese Renminbi Yuan' },
    { flag: '🇨🇿', acronym: 'CZK', name: 'Czech Koruna' },
    { flag: '🇩🇰', acronym: 'DKK', name: 'Danish Krone' },
    { flag: '🇪🇺', acronym: 'EUR', name: 'Euro' },
    { flag: '🇬🇧', acronym: 'GBP', name: 'British Pound' },
    { flag: '🇭🇰', acronym: 'HKD', name: 'Hong Kong Dollar' },
    { flag: '🇭🇷', acronym: 'HRK', name: 'Croatian Kuna' },
    { flag: '🇭🇺', acronym: 'HUF', name: 'Hungarian Forint' },
    { flag: '🇮🇩', acronym: 'IDR', name: 'Indonesian Rupiah' },
    { flag: '🇮🇱', acronym: 'ILS', name: 'Israeli New Sheqel' },
    { flag: '🇮🇳', acronym: 'INR', name: 'Indian Rupee' },
    { flag: '🇮🇸', acronym: 'ISK', name: 'Icelandic Króna' },
    { flag: '🇯🇵', acronym: 'JPY', name: 'Japanese Yen' },
    { flag: '🇰🇷', acronym: 'KRW', name: 'South Korean Won' },
    { flag: '🇲🇽', acronym: 'MXN', name: 'Mexican Peso' },
    { flag: '🇲🇾', acronym: 'MYR', name: 'Malaysian Ringgit' },
    { flag: '🇳🇴', acronym: 'NOK', name: 'Norwegian Krone' },
    { flag: '🇳🇿', acronym: 'NZD', name: 'New Zealand Dollar' },
    { flag: '🇵🇭', acronym: 'PHP', name: 'Philippine Peso' },
    { flag: '🇵🇱', acronym: 'PLN', name: 'Polish Złoty' },
    { flag: '🇷🇴', acronym: 'RON', name: 'Romanian Leu' },
    { flag: '🇸🇪', acronym: 'SEK', name: 'Swedish Krona' },
    { flag: '🇸🇬', acronym: 'SGD', name: 'Singapore Dollar' },
    { flag: '🇹🇭', acronym: 'THB', name: 'Thai Baht' },
    { flag: '🇹🇷', acronym: 'TRY', name: 'Turkish Lira' },
    { flag: '🇺🇸', acronym: 'USD', name: 'United States Dollar' },
    { flag: '🇿🇦', acronym: 'ZAR', name: 'South African Rand' },
];

export default currenciesObject;
