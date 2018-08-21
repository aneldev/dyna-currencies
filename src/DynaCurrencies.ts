import {IDynaLabel, IDynaPrice} from "dyna-interfaces";

const currencies: ICurrencies = require('./currencies.json'); // source: https://gist.github.com/Fluidbyte/2973986
const countries: ICountries = require('./countries.json'); // source: https://github.com/annexare/Countries/blob/master/data/countries.json

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
  }
}

export class DynaCurrencies {
  private _rates: ICurrencyRates = {};

  public update(rates: ICurrencyRates): void {
    Object.keys(rates).forEach((currenyName: string) => this._rates[currenyName.toLowerCase()] = rates[currenyName]);
  }

  public clear(): void {
    this._rates = {};
  }

  public get count(): number {
    return Object.keys(this._rates || {}).length;
  }

  public convert(value: number, fromCurrency: string, toCurrency: string, round: boolean = false): number {
    if (fromCurrency === toCurrency) return value;
    const fromRate: number = this._rates[fromCurrency.toLowerCase()];
    const toRate: number = this._rates[toCurrency.toLowerCase()];
    if (!fromRate || !toRate) return null;

    let output: number = value * fromRate / toRate;


    if (round) {
      const factor: number = Math.pow(10, currencies[toCurrency].decimalDigits);
      output = Math.round(output * factor) / factor;
    }

    return output;
  }

  public convertDynaPrice(price: IDynaPrice, toCurrency: string): IDynaPrice {
    return {
      value: this.convert(price.value, price.currency, toCurrency),
      currency: toCurrency,
    };
  }

  public convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency {
    const currency: ICurrency = currencies[toCurrency.toUpperCase()] || {};
    const cValue: number = this.convert(value, fromCurrency, toCurrency);
    if (!cValue) return null;
    const cValueString: number = Math.round(cValue * Math.pow(10, currency.decimalDigits || 0)) / Math.pow(10, currency.decimalDigits || 0)

    return {
      text: `${cValueString}${currency.symbol}`,
      values: {
        value: cValue,
        decimals: currency.decimalDigits,
        currencyName: currency.name,
        currencyNamePlural: currency.namePlural,
        currencyCode: currency.code,
        currencySymbol: currency.symbol,
        currencySymbolNative: currency.symbolNative,
      }
    }
  }

  public getCurrencies(): ICurrency[] {
    return Object.keys(currencies).reduce((acc: ICurrency[], code: string) => {
      acc.push(currencies[code]);
      return acc;
    }, []);
  }

  public getCurrenciesByCountry(countryCode: string): ICurrency[] {
    countryCode = countryCode.toUpperCase();
    const country: ICountry = countries[countryCode];
    const currencyCode: string = country && country.currency;

    if (currencyCode) {
      return country.currency
        .split(',')
        .map((currencyCode: string) => currencies[currencyCode]);
    } else {
      return [];
    }
  }

  public getCurrencyByCountry(countryCode: string): ICurrency {
    return this.getCurrenciesByCountry(countryCode)[0];
  }

}

