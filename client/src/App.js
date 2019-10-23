import React, { Component } from 'react'
import { BrowserRouter as Router, Route  } from "react-router-dom";

import Home from './components/Home';
import Upload from './components/Upload';
import Navbar from './components/layouts/Navbar';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
            <Navbar />
              <Route path="/" exact component={Home} />
              <Route path="/upload" component={Upload} />
              <Route path="/gallery" component={Album} />
        </React.Fragment>
      </Router>
    )
  }
}


export default App;