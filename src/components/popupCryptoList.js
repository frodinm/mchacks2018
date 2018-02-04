import React, { Component } from 'react';

export class PopupCryptoList extends Component {
    render(){
        var cryptoList = this.props.cryptoList
        return(
            <div>
                {
                    cryptoList.map((x, key) => {
                        <div>{x}</div>
                    })
                }
            </div>
        )
    }
}