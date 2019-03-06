import React, { Component } from 'react'
import MyInput from '../common/MyInput';
import Axios from 'axios';
import MySubmitButton from '../common/MySubmitButton';


export default class RegisterStudent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            errorMsg: "",
            loading: false,
            successMsg: ""
        }

        this.onInputChange =  this.onInputChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }

    onInputChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            errorMsg: ""
        })
    }

    formSubmit(e){
        // prevent form from submit
        e.preventDefault()

        // getting the data
        const { name, email, password, rePassword } = this.state
        if(name.trim() === ""){
            this.setState({
                errorMsg: "Enter email."
            })
            return
        }
        if(email.trim() === ""){
            this.setState({
                errorMsg: "Enter email."
            })
            return
        }

        if(password.trim() === ""){
            this.setState({
                errorMsg: "Enter password"
            })
            return
        }

        if(rePassword.trim() === ""){
            this.setState({
                errorMsg: "Enter Re-password"
            })
            return
        }

        if(password.trim() !== rePassword.trim()){
            this.setState({
                errorMsg: "Password and Re-password do not match"
            })
            return
        }

        // starting the server request
        this.setState({
            loading: true
        })

        const data = {
            name,
            email,
            password,
        }

        Axios.post(`/register_student.php`, data)
            .then((result) => {
                const data = result.data
                console.log(data)
                if(data.success){
                    this.setState({
                        successMsg: "Successfully registered",
                        name: "",
                        email: "",
                        password: "",
                        rePassword: ""
                    })
                }else{
                    this.setState({
                        errorMsg: e.message
                    })
                }
                this.setState({
                    loading: false
                })
            })
            .catch(e => {
                console.log(e)
                this.setState({
                    loading: false,
                    errorMsg: e
                })
            })
    }

    render() {
        return (
        <div className="container">
            <h1 className="text-center">Student Registration</h1>
            <form className="register-form" onSubmit={this.formSubmit}>
                <MyInput
                name="name"
                type="text"
                title="Name"
                value={this.state.name}
                onChange={this.onInputChange} />
                
                <MyInput
                name="email"
                type="email"
                title="Email"
                value={this.state.email}
                onChange={this.onInputChange} />

                <MyInput
                name="password"
                type="password"
                title="Password"
                value={this.state.password}
                onChange={this.onInputChange} />

                <MyInput
                name="rePassword"
                type="password"
                title="Re-Password"
                value={this.state.rePassword}
                onChange={this.onInputChange} />
                <p className="text-danger">{this.state.errorMsg}</p>
                <p className="text-success">{this.state.successMsg}</p>
                <MySubmitButton
                loading={this.state.loading}/>
            </form>
        </div>
        )
    }
}
