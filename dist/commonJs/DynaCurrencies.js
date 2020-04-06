"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currencies = require('./currencies.json'); // source: https://gist.github.com/Fluidbyte/2973986
var countries = require('./countries.json'); // source: https://github.com/annexare/Countries/blob/master/data/countries.json
var DynaCurrencies = /** @class */ (function () {
    function DynaCurrencies() {
        this._rates = {};
    }
    DynaCurrencies.prototype.update = function (rates) {
        var _this = this;
        Object.keys(rates).forEach(function (currenyName) { return _this._rates[currenyName.toLowerCase()] = rates[currenyName]; });
    };
    DynaCurrencies.prototype.clear = function () {
        this._rates = {};
    };
    Object.defineProperty(DynaCurrencies.prototype, "count", {
        get: function () {
            return Object.keys(this._rates || {}).length;
        },
        enumerable: true,
        configurable: true
    });
    DynaCurrencies.prototype.convert = function (value, fromCurrency, toCurrency, round) {
        if (round === void 0) { round = false; }
        if (fromCurrency === toCurrency)
            return value;
        var fromRate = this._rates[fromCurrency.toLowerCase()];
        var toRate = this._rates[toCurrency.toLowerCase()];
        if (!fromRate || !toRate)
            return null;
        var output = value * fromRate / toRate;
        if (round) {
            var factor = Math.pow(10, currencies[toCurrency].decimalDigits);
            output = Math.round(output * factor) / factor;
        }
        return output;
    };
    DynaCurrencies.prototype.convertDynaPrice = function (price, toCurrency) {
        return {
            value: this.convert(price.value, price.currency, toCurrency),
            currency: toCurrency,
        };
    };
    DynaCurrencies.prototype.convertToLabel = function (value, fromCurrency, toCurrency) {
        var currency = currencies[toCurrency.toUpperCase()] || {};
        var cValue = this.convert(value, fromCurrency, toCurrency);
        if (!cValue)
            return null;
        var cValueString = Math.round(cValue * Math.pow(10, currency.decimalDigits || 0)) / Math.pow(10, currency.decimalDigits || 0);
        return {
            text: "" + cValueString + currency.symbol,
            values: {
                value: cValue,
                decimals: currency.decimalDigits,
                currencyName: currency.name,
                currencyNamePlural: currency.namePlural,
                currencyCode: currency.code,
                currencySymbol: currency.symbol,
                currencySymbolNative: currency.symbolNative,
            }
        };
    };
    DynaCurrencies.prototype.getCurrencies = function () {
        return Object.keys(currencies).reduce(function (acc, code) {
            acc.push(currencies[code]);
            return acc;
        }, []);
    };
    DynaCurrencies.prototype.getCurrenciesByCountry = function (countryCode) {
        countryCode = countryCode.toUpperCase();
        var country = countries[countryCode];
        var currencyCode = country && country.currency;
        if (currencyCode) {
            return country.currency
                .split(',')
                .map(function (currencyCode) { return currencies[currencyCode]; });
        }
        else {
            return [];
        }
    };
    DynaCurrencies.prototype.getCurrencyByCountry = function (countryCode) {
        return this.getCurrenciesByCountry(countryCode)[0];
    };
    return DynaCurrencies;
}());
exports.DynaCurrencies = DynaCurrencies;
//# sourceMappingURL=DynaCurrencies.js.map