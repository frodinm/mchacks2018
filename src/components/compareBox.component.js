import React, { Component } from 'react';
import {AddCryptoButton} from '../components';
import numeral from 'numeral';

var headers = ['LOGO','NAME','ALGORITHM','PROOFTYPE','SYMBOL','RANK','PRICE(USD)','PRICE(BTC)',
'1H CHANGE','24H CHANGE','7D CHANGE','24H VOLUME','MARKET CAP(USD)',
'AVAILABLE SUPPLY','TOTAL SUPPLY','MAX SUPPLY','LAST UPDATE']

// var categories = ['name','symbol','rank','price_usd','price_btc'
// ,'24h_volume_usd','market_cap_usd','available_supply',
// 'total_supply','max_supply','percent_change_1h','percent_change_24h',
// 'percent_change_7d','last_updated']

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export class CompareBox extends Component {

    render(){
        var {currentCrypto, data, handleAdd, cryptoNameList, currentCount, cryptoCompareData, removeCrypto} = this.props

        return(
            <div className="compare-box-wrapper">
                <div className="compare-box">
                    <div className="headers">
                    {
                        headers.map((x,key) => {
                            return(
                                <div key={key}>{x}</div>
                            )
                        })
                    }
                    </div>
                    {
                        currentCrypto.map((x,key) => {
                            var index = x.k
                            var crypto = data[index]
                            var symbol = data[index].symbol
                            if(symbol === 'MIOTA'){
                                symbol = 'IOT'
                            }
                            console.log(cryptoCompareData)
                            return(
                                <div className="crypto-category-wrapper">
                                    <div>
                                        {
                                            (symbol !== 'MIOTA')
                                            ?(<img alt = {x.name} src={"https://www.cryptocompare.com"+cryptoCompareData[symbol].ImageUrl}/>)
                                            :(<img alt = "Iota" src={"https://www.cryptocompare.com"+cryptoCompareData['IOT'].ImageUrl}/>)
                                        }
                                        <span onClick={() => removeCrypto(x.name)}>
                                            <img alt={x.name} src="https://image.flaticon.com/icons/png/128/148/148766.png"/>
                                        </span>
                                    </div>
                                    <div>{crypto.name}</div>
                                    <div>{cryptoCompareData[symbol].Algorithm}</div>
                                    <div>{cryptoCompareData[symbol].ProofType}</div>
                                    <div>{crypto.symbol}</div>
                                    <div>{crypto.rank}</div>
                                    <div>{numeral(crypto.price_usd).format('$0,0.00')}</div>
                                    <div>{crypto.price_btc}</div>
                                    <div>{crypto.percent_change_1h+" %"}</div>
                                    <div>{crypto.percent_change_24h+" %"}</div>
                                    <div>{crypto.percent_change_7d+" %"}</div>
                                    <div>{numeral(crypto['24h_volume_usd']).format('$0,0.00')}</div>
                                    <div>{numeral(crypto.market_cap_usd).format('$0,0.00')}</div>
                                    <div>{numeral(crypto.available_supply).format('0,0')}</div>
                                    <div>{numeral(crypto.total_supply).format('0,0')}</div>
                                    <div>{numeral(crypto.max_supply).format('0,0')}</div>
                                    <div>{timeConverter(crypto.last_updated)}</div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    (cryptoNameList !== [])?(
                    <AddCryptoButton 
                    handleAdd = {handleAdd}
                    cryptoNameList = {cryptoNameList}
                    currentCount = {currentCount}
                    currentCrypto = {currentCrypto}/>
                    ):(
                    ""
                    )
                }
            </div>            
        )
    }
}