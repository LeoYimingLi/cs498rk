import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

// // Include your new Components here
import Search from './components/Search/Search.js';
import Gallery from  './components/Gallery/Gallery.js';
import Detail from './components/Details/Details.js';

class App extends Component {
  render() {
    return (
      <Router basename="/cs498rk-mp2">
        <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/gallery" component={Gallery}/>
          <Route exact path="/detail/:id" component={Detail}/>
          {/*
            Add routes for new pages here!
            Here's an example. To view this route, just go to http://localhost:3000/
          */}
        </Switch>
      </Router>
    );
  }
}
export default App;
