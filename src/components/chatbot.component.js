import React, { Component } from 'react';

export class ChatBotComponent extends Component {


  componentDidMount(){
      var widgetEl = document.getElementById('myWidget');
      window.ciscospark.widget(widgetEl).spaceWidget({
        accessToken: 'YzU2MzlkZjgtZDJiZi00MDIxLWFiNzMtNzZiYzA1ODRmZmNmYTk5MDUyOGItYmE3',
        spaceId: 'Y2lzY29zcGFyazovL3VzL1JPT00vN2NkZTQ3M2UtNmFkZi0zODkxLWFhODYtNzdkMDUyYTM3ZGZm'
      });
  }


  render() {
    return (
        <div>  
            <div id="myWidget" style={{height:500,width:400}}/>
        </div>
    );
  }
}


