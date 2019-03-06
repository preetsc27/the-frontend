import React, { Component } from 'react'
import LoginForm from '../LoginForm';
import RegisterStudent from './RegisterStudent';
import { Link, Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor(props){
    super(props)
    const token = localStorage.getItem("token")
    console.log(token)
    this.state ={
      token
    }
  }
  render() {
    if(this.state.token !== null){
      return <Redirect to="student-home" />
    }
    return (
        <div className="container">
            <h1 className="text-center"><i>Kraftshala</i></h1>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <LoginForm
                nextPageUrl="/student-home"
                url="/login_student.php"
                formName="Student Login"/>
              </div>
              <div className="col-sm-12 col-md-6">
                <RegisterStudent/>
              </div>
            </div>
            <hr/>
            <h2>This is the admin section</h2>
            <div className="table-responsive">
              <table className="table">
                  <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Link</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>1</td>
                        <td>Admin Login</td>
                        <td><Link to="admin-login" className="btn btn-primary">Admin Login</Link></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Admin Add Expert</td>
                        <td><Link to="register-expert" className="btn btn-primary">Admin Add Expert</Link></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Admin See Bookings</td>
                        <td><Link to="admin-booking" className="btn btn-primary">Admin See Bookings</Link></td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
    )
  }
}
