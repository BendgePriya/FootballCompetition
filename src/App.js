import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import FootballMatchesData from './components/football-data/index.js';
import { Provider } from 'react-redux';
import store from '../src/store/store';
const title = "Football Comptetions";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="app-header layout-row align-items-center justify-content-center">
          <div className="layout-row align-items-center">
            <img alt="" src={logo} className="logo"/>
            <h4 id="app-title" data-testid="app-title" className="app-title">{title}</h4>
          </div>
        </nav>
        <Provider store={store}><FootballMatchesData/></Provider>
      </div>
    );
  }
}

export default App;
