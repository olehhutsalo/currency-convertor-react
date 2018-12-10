import React from 'react';
import {Card, Select, Input} from 'antd';
import API from './services/api';

const Option = Select.Option;

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topCurrency: "USD",
            topAmount: "1000",
            bottomCurrency: "ILS",
            bottomAmount: "",
            rates: null,
            loading: true,
            error: false,
        }
    }
    
    handleTopCurrencyChange = value => {
        // New fetching of rates will be initiated in componentDidUpdate()
        this.setState({topCurrency: value});
    };
    
    handleBottomCurrencyChange = value => {
        this.setState({bottomCurrency: value}, () => this.convertCurrency('bottom'));
    };
    
    handleTopAmountChange = ({target: {value}}) => {
        this.setState({topAmount: value}, () => this.convertCurrency('top'));
    };
    
    handleBottomAmountChange = ({target: {value}}) => {
        this.setState({bottomAmount: value}, () => this.convertCurrency('bottom'));
    };
    
    fetchData = () => {
        const {topCurrency} = this.state;
        this.setState({loading: true});
        API.rates.getLatesRates(topCurrency)
            .then(resp => {
                this.setState({rates: resp.rates, loading: false}, () => this.convertCurrency('top'))
            })
    };
    
    convertCurrency(origin){
        const {topCurrency, bottomCurrency, topAmount, bottomAmount, rates} = this.state;
        // debugger
        if (origin === 'top'){
            const nextBottomAmount = rates[bottomCurrency] * +topAmount;
            this.setState({bottomAmount: +nextBottomAmount.toFixed(2)})
        }
        if (origin === 'bottom'){
            const nextTopAmount = rates[bottomCurrency] * +bottomAmount;
            this.setState({topAmount: +nextTopAmount.toFixed(2)})
        }
    }
    
    componentDidMount () {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.topCurrency !== this.state.topCurrency) this.fetchData();
    }
    
    render() {
        const {topCurrency, bottomCurrency, topAmount, bottomAmount, loading, rates} = this.state;
        const {} = this.props;
        const ratesArr = typeof rates === 'object' && rates !== null? Object.keys(rates) : [];
        return (
            <React.Fragment>
                <div>
                    <Input
                        type="number"
                        disabled={loading}
                        value={Number.isNaN(topAmount)? '' : topAmount}
                        onChange={this.handleTopAmountChange}
                        style={{width: '33%'}}
                    />
                    <Select
                        disabled={loading}
                        defaultValue={topCurrency}
                        style={{ width: '66%' }}
                        onChange={this.handleTopCurrencyChange}
                    >
                        {ratesArr.map(currency => (<Option key={currency}  value={currency}>{currency}</Option>))}
                    </Select>
                </div>
                <div>
                    <Input
                        type="number"
                        disabled={loading}
                        value={Number.isNaN(bottomAmount)? '' : bottomAmount}
                        onChange={this.handleBottomAmountChange}
                        style={{width: '33%'}}
                    />
                    <Select
                        disabled={loading}
                        defaultValue={bottomCurrency}
                        style={{ width: '66%' }}
                        onChange={this.handleBottomCurrencyChange}
                    >
                        {ratesArr.map(currency => (<Option key={currency} value={currency}>{currency}</Option>))}
                    </Select>
                </div>
            </React.Fragment>
        )
    }
}