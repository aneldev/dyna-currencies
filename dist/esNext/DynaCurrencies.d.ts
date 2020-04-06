import { IDynaLabel, IDynaPrice } from "dyna-interfaces";
export interface ICurrencyRates {
    [currencyName: string]: number | undefined;
}
export interface ICurrencies {
    [currencyName: string]: ICurrency;
}
export interface ICurrency {
    code: string;
    symbol: string;
    name: string;
    namePlural: string;
    symbolNative: string;
    decimalDigits: number;
    rounding: number;
}
export interface ICountries {
    [currencyName: string]: ICountry | undefined;
}
export interface ICountry {
    name: string;
    native: string;
    phone: string;
    continent: string;
    capital: string;
    currency: string;
    languages: string[];
}
export interface IDynaLabelCurrency extends IDynaLabel {
    values: {
        value: number;
        decimals: number;
        currencyName: string;
        currencyNamePlural: string;
        currencyCode: string;
        currencySymbol: string;
        currencySymbolNative: string;
    };
}
export declare class DynaCurrencies {
    private _currencyRates;
    private _lastUpdate;
    updateRates(rates: ICurrencyRates): void;
    clearRates(): void;
    get count(): number;
    get lastUpdate(): Date | null;
    get hasRates(): boolean;
    convert(value: number, fromCurrency: string, toCurrency: string, round?: boolean): number | null;
    convertDynaPrice(price: IDynaPrice, toCurrency: string): IDynaPrice | null;
    convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency | null;
    getCurrencyRatesDic(): ICurrencyRates;
    getCurrencyRatesArray(): ICurrency[];
    getCurrencyRatesByCountry(countryCode: string): ICurrency[];
    getCurrencyByCountry(countryCode: string): ICurrency | null;
}
