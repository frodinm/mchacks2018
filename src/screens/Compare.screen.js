import React, { Component } from 'react';
import {CompareBox, NavigationBar, SearchBar, AddCryptoButton} from '../components';
import axios from 'axios';
import '../css/compare.css';

export class CompareScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
      cryptoCompareData: [],
      currentCrypto: [],
      cryptoNameList: [],
      currentCount: 0
    }
  }

  getDataFromCoinMarketCap() {
    return new Promise((resolve, reject) => {
      axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
      .then((response) => {
        this.setState({
          data: response.data
        })
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    })
  }

  getDataFromCryptoCompare() {
    return new Promise((resolve, reject) => {
      axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then((response) => {
        this.setState({
          cryptoCompareData: response.data['Data']
        })
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    })
  }

  makeCryptoNameList(data) {
      var tempCryptoNameList = []
      for(var i in data){
        tempCryptoNameList.push(data[i].name)
      }
      this.setState({
        cryptoNameList: tempCryptoNameList
      })
  }

  componentDidMount() {
    this.getDataFromCoinMarketCap().then((data)=>{
      this.makeCryptoNameList(data)
    })
    this.getDataFromCryptoCompare()
  }

  handleAdd(cryptoName, key) {
    this.setState({ 
      currentCrypto: this.state.currentCrypto.concat(
        [{name:cryptoName,k:key}])
    })
    this.setState({
      currentCount: ++this.state.currentCount
    })
  }

  removeCrypto(name) {
    var currentCrypto = this.state.currentCrypto
    for(var i in currentCrypto){
      if(currentCrypto[i].name === name){
        this.state.currentCrypto.splice(i,1)
        this.forceUpdate()
        this.setState({
          currentCount: --this.state.currentCount
        })
      }
    }
  } 

  render() {
    var cryptoNameList = this.state.cryptoNameList


    console.log(this.state)
    return (
      <div className="main">
        <NavigationBar />
        <div className="body">
          <CompareBox 
            currentCrypto = {this.state.currentCrypto}
            data = {this.state.data}
            handleAdd = {this.handleAdd.bind(this)}
            cryptoNameList = {cryptoNameList}
            currentCount ={this.state.currentCount}
            cryptoCompareData = {this.state.cryptoCompareData}
            removeCrypto = {this.removeCrypto.bind(this)}/>
        </div>
      </div>
    );
  }
}


