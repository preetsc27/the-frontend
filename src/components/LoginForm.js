import React, { Component } from 'react'
import Axios from 'axios';
import MyInput from './common/MyInput';
import  { Redirect } from 'react-router-dom'

export default class LoginForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: "",
            errorMsg: "",
            loading: false,
            loggedIn: false
        }

        this.onInputChange =  this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onInputChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            errorMsg: ""
        })
    }

    onFormSubmit(e){
        // prevent form from submit
        e.preventDefault()

        // getting the data
        const { email, password } = this.state
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

        // starting the server request
        this.setState({
            loading: true
        })

        // getting the role
        const { url } = this.props

        const data = {
            email,
            password
        }

        Axios.post(url, data)
            .then(response =>{
                const data = response.data
                console.log(data)
                if(data.success){
                    if(data.token){
                        localStorage.setItem("token", data.token)
                        this.setState({
                            loggedIn: true,
                            loading: false
                        })
                    }else{
                        this.setState({
                            errorMsg: "No Token",
                            loading: false
                        })
                    }
                }else{
                    this.setState({
                        errorMsg: data.message,
                        loading: false
                    })
                }
            })
            .catch(e =>{
                this.setState({
                    errorMsg: e,
                    loading: false
                })
            })
    }

    render() {
        let submitBtnText = "Submit"
        let submitBtnDisabled = false

        if(this.state.loggedIn){
            return <Redirect to={this.props.nextPageUrl} />
        }

        if(this.state.loading){
            submitBtnDisabled = true
            submitBtnText = "Loading..."
        }
        return (
            <div className="jumbotron">
                <h2 className="text-center">{this.props.formName}</h2>
                <form onSubmit={this.onFormSubmit}>
                    <MyInput 
                    title="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                    name="email"
                    id="email"
                    />
                    <MyInput 
                    title="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                    name="password"
                    id="pwd"
                    />
                    <p className="text-danger">{this.state.errorMsg}</p>
                    <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitBtnDisabled}>{submitBtnText}</button>
                </form>
            </div>
        );
    }
}
