import "./mock-jest";

import "./main.test";

import {DynaCurrencies} from './../src'

const dynaCurrencies = new DynaCurrencies();

dynaCurrencies.update({"usd": 1, "eur": 0.85});

let usdPrice = dynaCurrencies.convert(2.45, 'eur', 'USD',true);

debugger;
