import {
  IDynaLabel,
  IDynaPrice
} from "dyna-interfaces";

import { currenciesInfo } from "./currenciesInfo";
import { countriesInfo } from "./countriesInfo";

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
  }
}

export class DynaCurrencies {
  private _currencyRates: ICurrencyRates = {};
  private _lastUpdate: Date | null = null;

  public updateRates(rates: ICurrencyRates): void {
    Object.keys(rates)
      .forEach((currencyName: string) => this._currencyRates[currencyName.toLowerCase()] = rates[currencyName]);
    this._lastUpdate = new Date;
  }

  public clearRates(): void {
    this._currencyRates = {};
    this._lastUpdate = null;
  }

  public get count(): number {
    return Object.keys(this._currencyRates).length;
  }

  public get lastUpdate(): Date | null {
    return this._lastUpdate;
  }

  public get hasRates(): boolean {
    return !!this.count;
  }

  public convert(value: number, fromCurrency: string, toCurrency: string, round: boolean = false): number | null {
    const fromCurrencyLC = fromCurrency.toLowerCase();
    const toCurrencyLC = toCurrency.toLowerCase();
    const toCurrencyUC = toCurrency.toUpperCase();

    if (fromCurrencyLC === toCurrencyLC) return value;

    const fromRate = this._currencyRates[fromCurrencyLC];
    const toRate = this._currencyRates[toCurrencyLC];
    const curInfo = currenciesInfo[toCurrencyUC];

    if (fromRate === undefined) return null;
    if (toRate === undefined) return null;
    if (curInfo === undefined) return null;

    let output: number = value * fromRate / toRate;

    if (round) {
      const factor: number = Math.pow(10, curInfo.decimalDigits);
      output = Math.round(output * factor) / factor;
    }

    return output;
  }

  public convertDynaPrice(price: IDynaPrice, toCurrency: string): IDynaPrice | null {
    const toCurrencyLC = toCurrency.toLowerCase();
    const value = this.convert(price.value, price.currency, toCurrencyLC);
    if (value === null) return null;
    return {
      value,
      currency: toCurrencyLC,
    };
  }

  public convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency | null {
    const currInfo = currenciesInfo[toCurrency.toUpperCase()] || {};
    const cValue = this.convert(value, fromCurrency, toCurrency);
    if (currInfo === undefined) return null;
    if (cValue === null) return null;

    const cValueString: number = Math.round(cValue * Math.pow(10, currInfo.decimalDigits || 0)) / Math.pow(10, currInfo.decimalDigits || 0);

    return {
      text: `${cValueString}${currInfo.symbol}`,
      values: {
        value: cValue,
        decimals: currInfo.decimalDigits,
        currencyName: currInfo.name,
        currencyNamePlural: currInfo.namePlural,
        currencyCode: currInfo.code,
        currencySymbol: currInfo.symbol,
        currencySymbolNative: currInfo.symbolNative,
      }
    }
  }

  public getCurrencyRatesDic(): ICurrencyRates {
    return {...this._currencyRates};
  }

  public getCurrencyRatesArray(): ICurrency[] {
    return Object.keys(currenciesInfo)
      .reduce((acc: ICurrency[], code: string) => {
        acc.push(currenciesInfo[code]);
        return acc;
      }, []);
  }

  public getCurrencyRatesByCountry(countryCode: string): ICurrency[] {
    const country = countriesInfo[countryCode.toUpperCase()];

    if (!country) return [];

    return country
      .currency
      .split(',')
      .map((currencyCode: string) => currenciesInfo[currencyCode])
      .filter(Boolean);
  }

  public getCurrencyByCountry(countryCode: string): ICurrency | null {
    const countryCurrencyRate = this.getCurrencyRatesByCountry(countryCode)[0];
    if (!countryCurrencyRate) return null;
    return countryCurrencyRate;
  }
}

