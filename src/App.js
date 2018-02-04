import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {CompareScreen,NewsScreen} from './screens/'
import './css/App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={CompareScreen}/>
          <Route path="/news" component={NewsScreen}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
