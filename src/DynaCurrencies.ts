import {IDynaLabel} from "dyna-interfaces";
import {isBoolean} from "util";

const currencies: ICurrencies = require('./currencies.json'); // source: https://gist.github.com/Fluidbyte/2973986

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

}

