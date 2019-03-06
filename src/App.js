import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import RegisterExpert from './components/pages/RegisterExpert';
import StudentHome from './components/pages/StudentHome';
import AdminBooking from './components/pages/AdminBooking';
import StudentBookings from './components/pages/StudentBookings';
import Login from './components/pages/Login'
import Logout from './components/pages/Logout';
import AdminLogin from './components/pages/AdminLogin';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register-expert' component={RegisterExpert}/>
        <Route exact path='/student-home' component={StudentHome}/>
        <Route exact path='/admin-login' component={AdminLogin}/>
        <Route exact path='/admin-home' component={RegisterExpert}/>
        <Route exact path='/admin-booking' component={AdminBooking}/>
        <Route exact path='/student-booking' component={StudentBookings}/>
        <Route exact path='/logout' component={Logout}/>
      </Switch>
    );
  }
}

export default App;
