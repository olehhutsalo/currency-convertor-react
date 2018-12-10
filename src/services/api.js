const URI = 'https://api.exchangeratesapi.io';

export default ({
    rates: {
        getLatesRates: (currency) => (fetch(`${URI}/latest?base=${currency}`).then(resp => resp.json())),
    }
});