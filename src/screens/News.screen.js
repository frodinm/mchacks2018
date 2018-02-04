import React, { Component } from 'react';
import {NavigationBar,NewsCard,ChatBotComponent} from '../components';
import { getEverythingNewsHeadlines } from '../api'

import '../css/newscss.css'

export class NewsScreen extends Component {
    constructor(){
        super();
        this.state={
            topNewsStories: [],
            error: null
        }
    }
    componentDidMount(){
        
        getEverythingNewsHeadlines().then((res)=>{
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
        const {topNewsStories} = this.state;
        return topNewsStories.map((current,index)=>{
            return(
                <div key={index} className="news-card-wrapper">
                    <NewsCard currentItem={current}/>
                </div>
            )
        })
    }

  render() {
    return (
      <div style={{backgroundColor:'#F0F0F0'}}>
        <NavigationBar />
        <div  className="news-wrapper">
            {this.handleNewsCard()}
        </div>
        <ChatBotComponent/>
      </div>
    );
  }
}


