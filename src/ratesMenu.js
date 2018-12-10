import React from 'react';
import {Menu, Icon} from 'antd';
import CurrencyConverter from './currencyConverter';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'converter'
        }
    }

    handleClick = (e) => {
        this.setState({selectedTab: e.key});
    };

    render() {
        const {selectedTab} = this.state;
        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.selectedTab]}
                    mode="horizontal"
                >
                    <Menu.Item key="converter">
                        <Icon type="retweet" />Currency concerter
                    </Menu.Item>
                    <Menu.Item key="history">
                        <Icon type="calendar" />Historical rates
                    </Menu.Item>
                </Menu>
                
                {selectedTab === 'converter' && <CurrencyConverter/>}
            </div>
        )
    }
}