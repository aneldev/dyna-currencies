import "jest";

import {DynaCurrencies, IDynaLabelCurrency, ICurrencyRates, ICurrency} from '../../src/index';

const ratesText: string = `{"cad":46.1916,"tnd":23.3343,"rsd":0.570674,"bgn":34.6998,"isk":0.547281,"pab":57.8802,"pgk":18.0727,"iqd":0.0496036,"yer":0.23125,"bam":34.7771,"bnd":42.512,"brl":18.2717,"vnd":0.00254673,"sos":0.0996402,"huf":0.21786000000000003,"myr":13.6563,"szl":4.23543,"bbd":28.9401,"lrd":0.491978,"kpw":0.443319,"kgs":0.841167,"sll":0.00755799,"kmf":0.138257,"cop":0.019611,"mxn":3.17877,"uyu":1.98799,"aud":45.106,"std":0.00277178,"top":26.6704,"kyd":70.5856,"tzs":0.0257759,"lvl":96.7816,"srd":7.79029,"nad":4.23543,"dkk":9.12142,"mur":1.69321,"btn":0.88399,"bmd":57.8802,"php":1.1326,"ron":14.7845,"gyd":0.278449,"mmk":0.0424789,"gnf":0.00645576,"clp":0.0913881,"dzd":0.509336,"sgd":42.4225,"fjd":28.4566,"mnt":0.0234724,"kes":0.559771,"ngn":0.160793,"irr":0.00171303,"tjs":6.57344,"thb":1.73277,"ugx":0.0160575,"wst":23.1391,"shp":76.6419,"bdt":0.707676,"htg":0.917332,"try":16.1305,"mad":6.13102,"uah":2.16814,"twd":1.90176,"gip":76.6281,"gel":23.4152,"lsl":4.23543,"bsd":57.8802,"chf":59.4605,"jmd":0.448254,"all":0.507967,"ang":32.3512,"hkd":7.4003,"ern":3.75759,"csk":57.8702,"cup":2.18416,"vuv":0.537586,"gtq":7.88623,"aoa":0.348847,"lyd":42.2557,"pen":17.7167,"bwp":5.57528,"pln":15.7273,"lak":0.00696068,"djf":0.323918,"gmd":1.2256,"jod":81.6577,"afn":0.848065,"ils":16.403,"uzs":0.0071667,"eur":67.9076,"pyg":0.0102382,"kwd":191.541,"azn":34.0039,"mga":0.0190843,"bhd":153.436,"inr":0.8852150000000001,"sek":7.0712,"nok":7.22595,"awg":32.3353,"ttd":8.58375,"xpf":0.570061,"mro":0.162231,"gbp":76.9843,"sdg":8.66674,"usd":57.8134,"ghs":13.1223,"zmk":0.00595744,"omr":150.421,"xaf":0.103706,"byn":29.4321,"tmt":16.5181,"xdr":81.7077,"cve":0.61653,"zar":4.23641,"xof":0.103706,"rwf":0.0684434,"scr":4.22194,"pkr":0.549439,"mop":7.1948,"vef":5.68939,"npr":0.552454,"fkp":76.6419,"cdf":0.0369761,"idr":0.00428036,"lkr":0.377695,"mkd":1.10675,"jpy":0.511872,"egp":3.28025,"ars":3.32402,"mwk":0.0796816,"sbd":7.42699,"krw":0.0503829,"byr":0.00298291,"nio":1.90499,"syp":0.11227,"khr":0.0142788,"zwl":57.8802,"mzn":0.949043,"cny":8.6893,"hrk":9.07598,"ltl":19.7018,"mdl":3.28485,"kzt":0.16938199999999998,"aed":15.7586,"hnl":2.47562,"amd":0.120974,"etb":2.46175,"mvr":3.74848,"qar":15.8296,"sar":15.4332,"lbp":0.0383272,"bzd":28.9406,"bob":8.37907,"crc":0.101296,"xcd":21.4371,"nzd":41.4107,"bif":0.0332641,"dop":1.21545,"czk":2.61026}`;
const rates: ICurrencyRates = JSON.parse(ratesText);


describe('DynaCurrencies, converters', () => {
  it('should load the rates', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    expect(dynaCurrencies.hasRates).toBe(false);
    dynaCurrencies.updateRates(rates);
    expect(dynaCurrencies.count).not.toBe(0);
    expect(dynaCurrencies.hasRates).toBe(true);
  });

  it('should reset the rates', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    expect(dynaCurrencies.hasRates).toBe(false);
    expect(dynaCurrencies.lastUpdate).toBe(null);
    dynaCurrencies.updateRates(rates);
    expect(dynaCurrencies.count).not.toBe(0);
    expect(dynaCurrencies.hasRates).toBe(true);
    expect(dynaCurrencies.lastUpdate).not.toBe(null);
    dynaCurrencies.clearRates();
    expect(dynaCurrencies.count).toBe(0);
    expect(dynaCurrencies.hasRates).toBe(false);
    expect(dynaCurrencies.lastUpdate).toBe(null);
  });

  it('should generate a label with values', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    dynaCurrencies.updateRates(rates);
    const label = dynaCurrencies.convertToLabel(1, 'euR', 'Gbp');
    expect(label).not.toBe(null);
    if (!label) return;
    expect(label.text).not.toBe(null);
    expect(label.text).not.toBe(undefined);
    expect(label.text).not.toBe('');
    expect(label.values.currencyCode).not.toBe(undefined);
    expect(label.values.currencyName).not.toBe(undefined);
    expect(label.values.currencyNamePlural).not.toBe(undefined);
    expect(label.values.currencySymbol).not.toBe(undefined);
    expect(label.values.currencySymbolNative).not.toBe(undefined);
    expect(label.values.decimals >= 0).toBe(true);
    expect(label.values.value >= 0).toBe(true);
  });

  it('should get all currencies', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    dynaCurrencies.updateRates(rates);
    const allCurrencies: ICurrency[] = dynaCurrencies.getCurrencyRatesArray();
    expect(allCurrencies.length > 100).toBe(true);
    expect(allCurrencies.filter(c => c.symbol.indexOf('$') > -1).length > 20).toBe(true);
  });

  it('should get currencies by country code', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    dynaCurrencies.updateRates(rates);

    expect(dynaCurrencies.getCurrencyByCountry('us')).toMatchSnapshot('us');
    expect(dynaCurrencies.getCurrencyByCountry('fr')).toMatchSnapshot('fr');
    expect(dynaCurrencies.getCurrencyByCountry('gr')).toMatchSnapshot('gr');
    expect(dynaCurrencies.getCurrencyByCountry('tr')).toMatchSnapshot('tr');
    expect(dynaCurrencies.getCurrencyByCountry('hk')).toMatchSnapshot('hk');
    expect(dynaCurrencies.getCurrencyByCountry('unknown')).toMatchSnapshot('unknown');
  });

  it('should not convert when no rates', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    expect(dynaCurrencies.convert(3.12, 'eur', 'gbp')).toBe(null);
    dynaCurrencies.updateRates(rates);
    expect(dynaCurrencies.convert(3.12, 'eur', 'gbp')).not.toBe(null);
  });

  it('should convert DynaPrices', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    dynaCurrencies.updateRates(rates);
    const gbpDynaPrice = dynaCurrencies.convertDynaPrice(
      {
        value: 3.12,
        currency: 'euR',
      },
      'gbP',
    );
    expect(gbpDynaPrice).toMatchSnapshot();
  });

  it('should not convert DynaPrices when no rates', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    const gbpDynaPrice = dynaCurrencies.convertDynaPrice(
      {
        value: 3.12,
        currency: 'euR',
      },
      'gbP',
    );
    expect(gbpDynaPrice).toMatchSnapshot();
  });

  it('should convert to label', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    dynaCurrencies.updateRates(rates);
    const labelPrice = dynaCurrencies.convertToLabel(3.12, 'euR', 'gbP');
    expect(labelPrice).toMatchSnapshot();
  });

  it('should not convert label when no rates', () => {
    const dynaCurrencies: DynaCurrencies = new DynaCurrencies();
    const labelPrice = dynaCurrencies.convertToLabel(3.12, 'euR', 'gbP');
    expect(labelPrice).toMatchSnapshot();
  });
});
