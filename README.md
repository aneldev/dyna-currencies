# About

`dyna-currencies` is a currency converter.

_Currently it doesn't fetch currency rates from any service. You have to provide the currency rates._

Written in Typescript, runs everywhere.

# Usage
```
import {DynaCurrencies} from 'dyna-currencies';

const dynaCurrencies = new DynaCurrencies();

dynaCurrencies.updateRates({"usd": 1, "eur": 0.85});

let usdPrice = dynaCurrencies.convert(2.45, 'eur', 'usd', true);

console.log(usdPrice); // 2.88 

```  

# Methods

## updateRates(rates: ICurrencyRates): void

Update the partially. You can pass so many rates you want (not all of them).

When no rates are updated, the many convert functions return null.

## clear(): void

Clears all rates (added/updated with `update`).

## convert(value: number, fromCurrency: string, toCurrency: string, round: boolean = false): number | null

Set `round` to true to round the currency according to the decimals of the target currency.

## convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency | null

Converts the currency, and the output instead of a number is the IDynaLabelCurrency interface where is friendly for the [Yahoo Intl](https://github.com/yahoo/react-intl). 

## convertDynaPrice(price: IDynaPrice, toCurrency: string): IDynaPrice | null

It converts a DynaPrice object.

## getCurrencyRatesDic(): ICurrencyRates

Get all currencies as a dictionary.

## getCurrencies(): ICurrency[]

Get all currencies to array for drop-down controls, etc..

## getCurrencyRatesByCountry(countryCode: string): ICurrency[]

Get all currencies that a country can hold.

## getCurrencyByCountry(countryCode: string): ICurrency | null

Get the main currency for a country.

Return null when no rates are loaded or when it countryCode is wrong.

# Properties

## count: number

It returns the number of all updated rates.

## hasRates: boolean

It returns all the updated rates.

## lastUpdate: Date

When updated last time

# Interfaces

interface ICurrencyRates {
  [currencyName: string]: number | undefined;
}

interface ICurrencies {
  [currencyName: string]: ICurrency;
}

interface ICurrency {
  code: string;
  symbol: string;
  name: string;
  namePlural: string;
  symbolNative: string;
  decimalDigits: number;
  rounding: number;
}

interface ICountries {
  [currencyName: string]: ICountry | undefined;
}

interface ICountry {
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string[];
}

interface IDynaLabelCurrency extends IDynaLabel {
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

interface IDynaLabel {
  // object used for ui labels, where the content of it is used also for translations
  text?: string;            // the text will be applied if the tk not found (as default text)
  tk?: string;              // the translation key
  values?: {                // values are used inside the translated text (obtained by the tk)
    [key: string]: string | number;
  };
}
