import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import NavBar from './components/navbar'
import Footer from './components/footer'
class App extends Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));



  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className='flyout'>
          <NavBar />
          {collapseID && overlay}
          <Routes />
          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
