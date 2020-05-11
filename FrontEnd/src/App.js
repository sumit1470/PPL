import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Register } from './Register'; 
import { Login } from './Login';
import Timeline from './Timeline';
import { Lifecycle } from './Lifecycle';
import { Forgot } from './Forget';
import {Route, Switch} from 'react-router-dom';
import {Header} from './Header';
import {Footer} from './Footer';
import { SinglePost } from './SinglePost';
import { Home } from './Home';
import Home1 from './Home_with_Redux';

class App extends React.Component {
  constructor(props){
    super(props);

    }



  render(){
    return (
      <div>
        <Route path="/" component={Header} />
           <Switch>
             <Route exact path="/" component={Login} />
             <Route  path="/register" component={Register} />
             <Route exact path="/timeline" component={Timeline} />
             <Route path="/home/:id" component={SinglePost} />
             <Route path="/forgot" component={Forgot} />
             <Route path="/home" component={Home1} />
           </Switch>
         <Footer />
        {/* <SinglePost /> */}
      </div>
    );
  }

}
export default App;
