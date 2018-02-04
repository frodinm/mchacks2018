import React, { Component } from 'react';


export class NewsCard extends Component {
  render() {
    const {currentItem} = this.props;
    return (
        <div className="news-card" onClick={()=>{window.open(currentItem.url,"_blank")}} >
         <img alt={currentItem.name} className="news-image" src={currentItem.urlToImage}/>
         <div className="text-wrapper">
          <span className="news-title">{currentItem.title}</span>
         </div>
         <div className="divider"/>
         <div className="text-wrapper">
            <span>{currentItem.description}</span>
         </div>
         
        </div>                          
    );
  }
}
