import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { SearchBar } from './index';

export class AddCryptoButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    state = { 
        visible: false
    }
    showModal = () => {
        if(this.props.currentCount < 4){
            this.setState({
                visible: true
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

    handleSearch(text){

        var {cryptoNameList} = this.props
        var tempArray = []

        for(var i in cryptoNameList){
            var x = cryptoNameList[i]
            if(x.toLowerCase().indexOf(text.toLowerCase()) !== -1){
                tempArray.push(x)
            }
        }

        this.setState({
            data: tempArray
        })
    }

    componentDidMount() {
        this.handleSearch('')
    }

    render(){
        let {data} = this.state
        let {cryptoNameList} = this.props

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
                        <SearchBar handleSearch ={this.handleSearch.bind(this)}/>
                    </div>
                        
                    {
                        data.map((x, key) => {
                            return(
                                <div className = "crypto-list__button" 
                                onClick = {() => this.handleCryptoButton(x,cryptoNameList.indexOf(x))} 
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
    