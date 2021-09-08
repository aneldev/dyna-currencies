"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynaCurrencies = void 0;
var currenciesInfo_1 = require("./currenciesInfo");
var countriesInfo_1 = require("./countriesInfo");
var DynaCurrencies = /** @class */ (function () {
    function DynaCurrencies() {
        var _this = this;
        this._currencyRates = {};
        this._lastUpdate = null;
        this.convert = function (value, fromCurrency, toCurrency, round) {
            if (round === void 0) { round = false; }
            var fromCurrencyLC = fromCurrency.toLowerCase();
            var toCurrencyLC = toCurrency.toLowerCase();
            var toCurrencyUC = toCurrency.toUpperCase();
            if (fromCurrencyLC === toCurrencyLC)
                return value;
            var fromRate = _this._currencyRates[fromCurrencyLC];
            var toRate = _this._currencyRates[toCurrencyLC];
            var curInfo = currenciesInfo_1.currenciesInfo[toCurrencyUC];
            if (fromRate === undefined)
                return null;
            if (toRate === undefined)
                return null;
            if (curInfo === undefined)
                return null;
            var output = value * fromRate / toRate;
            if (round) {
                var factor = Math.pow(10, curInfo.decimalDigits);
                output = Math.round(output * factor) / factor;
            }
            return output;
        };
        this.convertDynaPrice = function (price, toCurrency) {
            var toCurrencyLC = toCurrency.toLowerCase();
            var value = _this.convert(price.value, price.currency, toCurrencyLC);
            if (value === null)
                return null;
            return {
                value: value,
                currency: toCurrencyLC,
            };
        };
        this.convertToLabel = function (value, fromCurrency, toCurrency) {
            var currInfo = currenciesInfo_1.currenciesInfo[toCurrency.toUpperCase()] || {};
            var cValue = _this.convert(value, fromCurrency, toCurrency);
            if (currInfo === undefined)
                return null;
            if (cValue === null)
                return null;
            var cValueString = Math.round(cValue * Math.pow(10, currInfo.decimalDigits || 0)) / Math.pow(10, currInfo.decimalDigits || 0);
            return {
                text: "" + cValueString + currInfo.symbol,
                values: {
                    value: cValue,
                    decimals: currInfo.decimalDigits,
                    currencyName: currInfo.name,
                    currencyNamePlural: currInfo.namePlural,
                    currencyCode: currInfo.code,
                    currencySymbol: currInfo.symbol,
                    currencySymbolNative: currInfo.symbolNative,
                }
            };
        };
        this.getCurrencyRatesDic = function () {
            return _this._currencyRates;
        };
        this.getCurrencyRatesArray = function () {
            return Object.keys(currenciesInfo_1.currenciesInfo)
                .reduce(function (acc, code) {
                acc.push(currenciesInfo_1.currenciesInfo[code]);
                return acc;
            }, []);
        };
        this.getCurrencyRatesByCountry = function (countryCode) {
            var country = countriesInfo_1.countriesInfo[countryCode.toUpperCase()];
            if (!country)
                return [];
            return country
                .currency
                .split(',')
                .map(function (currencyCode) { return currenciesInfo_1.currenciesInfo[currencyCode]; })
                .filter(Boolean);
        };
        this.getCurrencyByCountry = function (countryCode) {
            var countryCurrencyRate = _this.getCurrencyRatesByCountry(countryCode)[0];
            if (!countryCurrencyRate)
                return null;
            return countryCurrencyRate;
        };
    }
    DynaCurrencies.prototype.updateRates = function (rates) {
        var _this = this;
        Object.keys(rates)
            .forEach(function (currencyName) { return _this._currencyRates[currencyName.toLowerCase()] = rates[currencyName]; });
        this._lastUpdate = new Date;
    };
    DynaCurrencies.prototype.clearRates = function () {
        this._currencyRates = {};
        this._lastUpdate = null;
    };
    Object.defineProperty(DynaCurrencies.prototype, "count", {
        get: function () {
            return Object.keys(this._currencyRates).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DynaCurrencies.prototype, "lastUpdate", {
        get: function () {
            return this._lastUpdate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DynaCurrencies.prototype, "hasRates", {
        get: function () {
            return !!this.count;
        },
        enumerable: false,
        configurable: true
    });
    return DynaCurrencies;
}());
exports.DynaCurrencies = DynaCurrencies;
//# sourceMappingURL=DynaCurrencies.js.map