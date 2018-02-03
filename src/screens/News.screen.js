import React, { Component } from 'react';
import {NavigationBar} from '../components';

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
      <div className="main">
        <NavigationBar />
        
      </div>
    );
  }
}


