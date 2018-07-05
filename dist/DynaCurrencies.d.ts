import { IDynaLabel, IDynaPrice } from "dyna-interfaces";
export interface ICurrencyRates {
    [currencyName: string]: number;
}
export interface ICurrencies {
    [currencyName: string]: ICurrency;
}
export interface ICurrency {
    code?: string;
    symbol?: string;
    name?: string;
    namePlural?: string;
    symbolNative?: string;
    decimalDigits?: number;
    rounding?: number;
}
export interface ICountries {
    [currencyName: string]: ICurrency;
}
export interface ICountry {
    name?: string;
    native?: string;
    phone?: string;
    continent?: string;
    capital?: string;
    currency?: string;
    languages?: string[];
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
    private _rates;
    update(rates: ICurrencyRates): void;
    clear(): void;
    readonly count: number;
    convert(value: number, fromCurrency: string, toCurrency: string, round?: boolean): number;
    convertDynaPrice(price: IDynaPrice, toCurrency: string): IDynaPrice;
    convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency;
    getCurrencies(): ICurrency[];
    getCurrenciesByCountry(countryCode: string): ICurrency[];
    getCurrencyByCountry(countryCode: string): ICurrency;
}
