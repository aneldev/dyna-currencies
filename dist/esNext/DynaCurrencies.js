var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var currenciesInfo = require('./currenciesInfo.json'); // source: https://gist.github.com/Fluidbyte/2973986
var countriesInfo = require('./countriesInfo.json'); // source: https://github.com/annexare/Countries/blob/master/data/countries.json
var DynaCurrencies = /** @class */ (function () {
    function DynaCurrencies() {
        this._currencyRates = {};
        this._lastUpdate = null;
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynaCurrencies.prototype, "lastUpdate", {
        get: function () {
            return this._lastUpdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynaCurrencies.prototype, "hasRates", {
        get: function () {
            return !!this.count;
        },
        enumerable: true,
        configurable: true
    });
    DynaCurrencies.prototype.convert = function (value, fromCurrency, toCurrency, round) {
        if (round === void 0) { round = false; }
        var fromCurrencyLC = fromCurrency.toLowerCase();
        var toCurrencyLC = toCurrency.toLowerCase();
        var toCurrencyUC = toCurrency.toUpperCase();
        if (fromCurrencyLC === toCurrencyLC)
            return value;
        var fromRate = this._currencyRates[fromCurrencyLC];
        var toRate = this._currencyRates[toCurrencyLC];
        var curInfo = currenciesInfo[toCurrencyUC];
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
    DynaCurrencies.prototype.convertDynaPrice = function (price, toCurrency) {
        var toCurrencyLC = toCurrency.toLowerCase();
        var value = this.convert(price.value, price.currency, toCurrencyLC);
        if (value === null)
            return null;
        return {
            value: value,
            currency: toCurrencyLC,
        };
    };
    DynaCurrencies.prototype.convertToLabel = function (value, fromCurrency, toCurrency) {
        var currInfo = currenciesInfo[toCurrency.toUpperCase()] || {};
        var cValue = this.convert(value, fromCurrency, toCurrency);
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
    DynaCurrencies.prototype.getCurrencyRatesDic = function () {
        return __assign({}, this._currencyRates);
    };
    DynaCurrencies.prototype.getCurrencyRatesArray = function () {
        return Object.keys(currenciesInfo)
            .reduce(function (acc, code) {
            acc.push(currenciesInfo[code]);
            return acc;
        }, []);
    };
    DynaCurrencies.prototype.getCurrencyRatesByCountry = function (countryCode) {
        var country = countriesInfo[countryCode.toUpperCase()];
        if (!country)
            return [];
        return country
            .currency
            .split(',')
            .map(function (currencyCode) { return currenciesInfo[currencyCode]; })
            .filter(Boolean);
    };
    DynaCurrencies.prototype.getCurrencyByCountry = function (countryCode) {
        var countryCurrencyRate = this.getCurrencyRatesByCountry(countryCode)[0];
        if (!countryCurrencyRate)
            return null;
        return countryCurrencyRate;
    };
    return DynaCurrencies;
}());
export { DynaCurrencies };
//# sourceMappingURL=DynaCurrencies.js.map