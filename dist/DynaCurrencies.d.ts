import { IDynaLabel } from "dyna-interfaces";
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
    convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency;
    getCurrencies(): ICurrency[];
}
