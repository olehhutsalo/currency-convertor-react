import React from 'react';
import {Card, Select, Input} from 'antd';
import API from './services/api';

const Option = Select.Option;

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            baseCurrency: 'USD',
            baseAmount: 1000,
            targetCurrency: 'ILS',
            targetAmount: null,
            rates: null,
            loading: true,
            error: false,
        }
    }

    handleTargetCurrencyChange = (value) => {
        this.setState({targetCurrency: value}, () => this.convertCurrency('target'));
        
    }

    handleBaseCurrencyChange = (value) => {
        this.setState({baseCurrency: value}, () => this.convertCurrency('base'));
    }

    handleBaseAmountChange = value => {
        this.setState({baseAmount: value}, () => this.convertCurrency('base'));
    }

    handleTargetAmountChange = value => {
        this.setState({targetAmount: value}, () => this.convertCurrency('target'));
    }

    fetchData = () => {
        const {baseCurrency} = this.state;
        this.setState({loading: true});
        API.rates.getLatesRates(baseCurrency)
            .then(resp => {
                this.setState({rates: resp.rates, loading: false}, () => this.convertCurrency('base'))
            })
    }

    convertCurrency(origin){
        console.log('HERE')
        const {targetCurrency, baseCurrency, baseAmount, targetAmount, rates} = this.state;
        if (origin === 'base'){
            const nextTargetValue = rates[targetCurrency] * baseAmount;
            this.setState({targetAmount: nextTargetValue})
        }
        if (origin === 'target'){
            const nextBaseValue = rates[baseCurrency] * targetAmount;
            this.setState({baseAmount: nextBaseValue})
        }
    }
    componentDidMount () {
        this.fetchData();
    }

    // componentDidUpdate (prevProps, prevState) {
    //     if (prevState.targetCurrency !== this.state.targertCurrency) {
    //         this.convertCurrency('target');
    //     }
    //     if (prevState.baseCurrency !== this.state.baseCurrency) {
    //         this.convertCurrency('base');
    //     }
    // }

    render() {
        const {targetCurrency, baseCurrency, baseAmount, targetAmount, loading, rates} = this.state;
        const {} = this.props;
        if (loading || !rates) return (<div>Loading...</div>);
        const ratesArr = Object.keys(rates);
        return (
            <React.Fragment>
               <div>
                   <Input value={baseAmount} onChange={this.handleBaseAmountChange} style={{width: '33%'}}/>
                    <Select defaultValue={baseCurrency} style={{ width: '66%' }} onChange={this.handleBaseCurrencyChange}>
                        {ratesArr.map(currency => (<Option key={currency}  value={currency}>{currency}</Option>))}
                    </Select>
                </div>
               <div>
                   <Input value={targetAmount} onChange={this.handleTargetAmountChange} style={{width: '33%'}}/>
                    <Select defaultValue={targetCurrency} style={{ width: '66%' }} onChange={this.handleTargetCurrencyChange}>
                        {ratesArr.map(currency => (<Option key={currency} value={currency}>{currency}</Option>))}
                    </Select>
                </div>
            </React.Fragment>
        )
    }
}