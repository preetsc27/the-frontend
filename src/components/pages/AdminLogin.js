import React, { Component } from 'react'
import LoginForm from '../LoginForm';

export default class AdminLogin extends Component {
    
    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <LoginForm
                    nextPageUrl="/admin-home"
                    className="register-name"
                    url="/login_admin.php"
                    formName="Admin Login"
                    />
                </div>
            </div>
        </div>
        )
    }
}
