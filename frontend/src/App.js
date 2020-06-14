import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Navigation';
import {HashRouter, Route} from 'react-router-dom';
import About from './About'
import Board from './Board'

class App extends React.Component{
  render(){
    return (
      <div className="App">
      <HashRouter>
      <Nav/>
        <Route path = "/" exact = {true} component ={Board}/>
        <Route path = "/about" component = {About}/>
        <Route path = "/movie-detail" component = {About} />
      </HashRouter>  
      </div>
  
    )
  }
}

export default App;
