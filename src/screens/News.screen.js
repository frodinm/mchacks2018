import React, { Component } from 'react';
import {NavigationBar} from '../components';
import { getTopNewsHeadlines } from '../api'
import { Card } from 'antd';

export class NewsScreen extends Component {
    constructor(){
        super();
        this.state={
            topNewsStories: {},
            error: null
        }
    }
    componentDidMount(){
        getTopNewsHeadlines().then((res)=>{
            this.setState({
                topNewsStories: res.data.articles
            })
            console.log(this.state.topNewsStories)
        }).catch((err)=>{
            this.setState({
                error: err
            })
        })
    }

    handleNewsCard(){

    }

  render() {
    return (
      <div className="main">
        <NavigationBar />
        <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
      </div>
    );
  }
}


