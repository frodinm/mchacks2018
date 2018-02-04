import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { SearchBar } from './index';

export class AddCryptoButton extends Component {

    state = { 
        visible: false
     }
    showModal = () => {
        if(this.props.currentCount < 4){
            this.setState({
                visible: true,
            });
        }else{
            alert('The max number of coin is 4')
        }
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    handleCancel = (e) => {
    console.log(e);
    this.setState({
        visible: false,
    });
    }

    checkIfExist(currentCrypto, x){
        return new Promise((resolve, reject) => {
            var exist = false      
            for(var i in currentCrypto){
                if(currentCrypto[i].name === x){
                    exist = true
                }
            }
            resolve(exist)
        })
    }

    handleCryptoButton(x,key){
        var handleAdd = this.props.handleAdd  
        var currentCrypto = this.props.currentCrypto
        this.checkIfExist(currentCrypto, x).then(
            (exist) => {
                if(!exist){
                    handleAdd(x,key)            
                }else{
                    alert('This coin is already being compared')
                }
            }
        )
        this.handleCancel()
    }

    render(){

        var cryptoNameList = this.props.cryptoNameList
        console.log(this.state)

        return(
            <div className="add-crypto-button">
                <Button type="primary" onClick={this.showModal}>+</Button>
                <Modal
                width="80vw"
                title="Choose a cryptocurrency"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <div className ="crypto-list">
                    <div className = "search-bar">
                        <SearchBar />
                    </div>
                        
                    {
                        cryptoNameList.map((x, key) => {
                            return(
                                <div className = "crypto-list__button" 
                                onClick = {() => this.handleCryptoButton(x,key)} 
                                key = {key}>
                                    {x}
                                </div>
                            ) 
                        })
                    }
                    </div>
                </Modal>
            </div>
        )
    }
}
    