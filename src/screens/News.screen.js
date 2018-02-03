import React, { Component } from 'react';
import {getTopNewsHeadlines} from '../api'

export class NewsScreen extends Component {
    componentDidMount(){
        getTopNewsHeadlines().then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


