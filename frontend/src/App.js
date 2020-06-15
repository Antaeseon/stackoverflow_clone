import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./Navigation";
import { SignInModalWindow } from "./modalwindows";

import { HashRouter, Route } from "react-router-dom";
import About from "./About";
import Board from "./Board";
import cookie from "js-cookie";

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = cookie.getJSON("user") || { loggedin: false };
    this.state = {
      user: user,
      showSignInModal: false,
    };
    this.handleSignedIn = this.handleSignedIn.bind(this);
    this.handleSignedOut = this.handleSignedOut.bind(this);
    this.showSignInModalWindow = this.showSignInModalWindow.bind(this);
    this.toggleSignInModalWindow = this.toggleSignInModalWindow.bind(this);
  }

  handleSignedIn(user) {
    console.log("Sign in happening...");
    const state = this.state;
    const newState = Object.assign({}, state, {
      user: user,
      showSignInModal: false,
    });
    this.setState(newState);
  }

  handleSignedOut() {
    console.log("Call app signed out...");
    const state = this.state;
    const newState = Object.assign({}, state, { user: { loggedin: false } });
    this.setState(newState);
    cookie.set("user", { loggedin: false });
  }

  showSignInModalWindow() {
    const state = this.state;
    const newState = Object.assign({}, state, { showSignInModal: true });
    this.setState(newState);
  }

  toggleSignInModalWindow() {
    const state = this.state;
    const newState = Object.assign({}, state, {
      showSignInModal: !state.showSignInModal,
    });
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Nav
            user={this.state.user}
            handleSignedOut={this.handleSignedOut}
            showModalWindow={this.showSignInModalWindow}
          />
          <Route path="/" exact={true} component={Board} />
          <Route path="/about" component={About} />
          <Route path="/movie-detail" component={About} />
          <SignInModalWindow
            handleSignedIn={this.handleSignedIn}
            showModal={this.state.showSignInModal}
            toggle={this.toggleSignInModalWindow}
          />
        </HashRouter>
      </div>
    );
  }
}

export default App;
