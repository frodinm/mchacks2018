import React, { Component } from 'react';
import {CompareBox, NavigationBar} from '../components';

export class CompareScreen extends Component {
  render() {
    return (
      <div className="main">
        <NavigationBar />
        <div className="body">
          <CompareBox />
        </div>
      </div>
    );
  }
}


