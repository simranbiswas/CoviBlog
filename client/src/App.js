import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {Container} from 'semantic-ui-react';
import './App.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import SinglePost from './pages/SinglePost';
import ViewProfile from './pages/ViewProfile';
import Explore from './pages/Explore';
import Gallery from './pages/Gallery';

function App() {
  return (
    <AlertProvider template={AlertTemplate}>
    <AuthProvider>
      <Router>
      <Container>
        <MenuBar/>
        <Route exact path = '/' component={Home}/>
        <AuthRoute exact path='/login' component={Login}/>
        <AuthRoute exact path='/register' component={Register}/>
        <Route exact path='/posts/:postId' component={SinglePost}/>
        <Route exact path='/viewprofile/:username' component={ViewProfile}/>
        <Route exact path='/covidlive' component={Explore}/>
        <Route exact path="/chat/:username" component={Gallery} />
      </Container>
      
    </Router>
    </AuthProvider>
    </AlertProvider>

  );
}

export default App;
