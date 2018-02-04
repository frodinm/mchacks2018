import React, { Component } from 'react';
import triangle from '../assets/triangle.png'
import {TweenLite} from 'gsap'

export class ChatBotComponent extends Component {
  constructor(){
    super();
    this.state={
      chatIsShowing: false
    }
    this.handleAnimation = this.handleAnimation.bind(this);
  }


  componentDidMount(){
      var widgetEl = document.getElementById('myWidget');
      window.ciscospark.widget(widgetEl).spaceWidget({
        accessToken: 'YzU2MzlkZjgtZDJiZi00MDIxLWFiNzMtNzZiYzA1ODRmZmNmYTk5MDUyOGItYmE3',
        spaceId: 'Y2lzY29zcGFyazovL3VzL1JPT00vN2NkZTQ3M2UtNmFkZi0zODkxLWFhODYtNzdkMDUyYTM3ZGZm'
      });
  }
 
  handleAnimation(){
    if(this.state.chatIsShowing === false){
      this.setState({
        chatIsShowing: true
      })
      TweenLite.to(document.getElementById('myWidget'),1,{opacity:1})
      TweenLite.to(document.getElementById('triangle'),1,{opacity:1})
    }else{
      this.setState({
        chatIsShowing: false
      })
      TweenLite.to(document.getElementById('myWidget'),1,{opacity:0})
      TweenLite.to(document.getElementById('triangle'),1,{opacity:0})
    }
  }


  render() {
    const content = (
      <div>
        
      </div>
    );
    
    return (
        <div >  
            <div  onClick={()=>this.handleAnimation()} className="fab-button">
              <img src='https://c74213ddaf67eb02dabb-04de5163e3f90393a9f7bb6f7f0967f1.ssl.cf1.rackcdn.com/V1~23492bc83a3b3af41cb55d4b8923b534~SJ6QIupfTSm6Hh1CsuKwFQ==~110'/>
            </div>
            <div id="myWidget" style={{height:400,width:350}}/>
            <svg id="triangle" viewBox = "0 0 500 500">   
              <polygon points="195,140 245,210 140,210" style={{fill:'white'}}></polygon>

          </svg>
        </div>
    );
  }
}


