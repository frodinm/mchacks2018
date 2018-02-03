import React, { Component } from 'react';
import {CompareBox, NavigationBar} from '../components';
import axios from 'axios';

export class CompareScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  getDataFromCoinMarketCap() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
    .then((response) => {
      console.log(response);
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getDataFromCoinMarketCap()
  }

  render() {

    console.log(this.state)

    return (
      <div className="main">
        <NavigationBar />
        <div className="body">
          <CompareBox />
        </div>
      </div>
    );
  }
}


