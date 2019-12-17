import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navbar";
import Routes from "./Routes";
import Footer from "./components/footer";

const adminUrlPattern = /\/admin.*/ 

class App extends Component {
  conditionalRenderOfNavbarAndFooter() {
    if(! adminUrlPattern.test(document.URL)) {
      return (
      <>
        <NavBar/>
        <Routes />
        <Footer/>
      </>);
    } else {
      return (<Routes />);
    }
  }

  render() {
    return (
      <Router>
        <div className="flyout">
          {this.conditionalRenderOfNavbarAndFooter()}
        </div>
      </Router>
    );
  }
}

export default App;
