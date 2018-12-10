import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import API from './services/api';
import RatesHistory from './ratesHisoty';
import RatesMenu from './ratesMenu';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <div className="app-header">My Currency Exchange Application</div>
        <div className='app-content'>
          <RatesMenu/>
          <RatesHistory/>
        </div>
      </div>
    );
  }
}

export default App;
