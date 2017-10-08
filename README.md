# About

`dyna-currencies` is a currency converter.

_Currently it doesn't fetch currency rates from any service. You have to provide the currency rates._

Written in Typescript, runs everywhere.

# Usage
```
import {DynaCurrencies} from 'dyna-currencies';

const dynaCurrencies = new DynaCurrencies();

dynaCurrencies.update({"usd": 1, "eur": 0.85});

let usdPrice = dynaCurrencies.convert(2.45, 'eur', 'USD',true);

console.log('usd', usdPrice);
```  

# Methods

## update(rates: ICurrencyRates): void

Update the the rates partially. You can pass so many rates you want (not all of them).

## clear(): void

Clears all rates (added/updated with `update`).

## convert(value: number, fromCurrency: string, toCurrency: string, round: boolean = false): number

The converter a curreny to something else.

Set `round` to true to round the currency according the decimals of the target currency.

## convertToLabel(value: number, fromCurrency: string, toCurrency: string): IDynaLabelCurrency

Converts the currency and the output instead of number is the IDynaLabelCurrency interface where is friently for the [Yahoo Intl](https://github.com/yahoo/react-intl). 

## getCurrencies(): ICurrency[]

Get all currencies to array for drop down controls etc..

# Properties

## count: number

Returns the number of the loaded rates.

# Interfaces

## ICurrencyRates
```
{
  [currencyName: string]: number;
}
```

## ICurrencies 
```
{
  [currencyName: string]: ICurrency;
}
```

## ICurrency 
```
{
  code?: string;
  symbol?: string;
  name?: string;
  namePlural?: string;
  symbolNative?: string;
  decimalDigits?: number;
  rounding?: number;
}
```

## IDynaLabelCurrency
```
{
  text?: string;            // the text will be applied if the tk not found (as default text)
  tk?: string;              // the translation key (not yet created from dyna-currency)
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
```
