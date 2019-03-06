import React, { Component } from 'react'
import MyInput from '../common/MyInput';
import Axios from 'axios';


export default class RegisterExpert extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            rating: "",
            price: "",
            startTime: "",
            endTime: "",
            errorMsg: "",
            successMsg: "",
            loading: false,
            role: 1
        }

        this.onInputChange =  this.onInputChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }

    onInputChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            errorMsg: "",
            successMsg: ""
        })
    }

    formSubmit(e){
        // prevent form from submit
        e.preventDefault()

        // getting the data
        const { 
            name, 
            email, 
            password, 
            rePassword, 
            rating, 
            price,
            startTime,
            endTime 
        } = this.state

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

        if(rating.trim() === ""){
            this.setState({
                errorMsg: "Enter Rating"
            })
            return
        }

        const intRating = parseInt(rating.trim())
        if(intRating.toString() === "NaN"){
            this.setState({
                errorMsg: "Rating should be number"
            })
            return
        }

        if(intRating < 1 || intRating > 5){
            this.setState({
                errorMsg: "Rating should be Rating should be more than 0 and less than 6"
            })
            return
        }

        if(price.trim() === ""){
            this.setState({
                errorMsg: "Enter Price"
            })
            return
        }

        const intPrice = parseInt(price.trim())
        if(intPrice.toString() === "NaN"){
            this.setState({
                errorMsg: "Rating should be number"
            })
            return
        }

        if(intPrice < 200 || intPrice > 500){
            this.setState({
                errorMsg: "Rating should be Rating should be more than 199 and less than 501"
            })
            return
        }

        if(startTime.trim() === ""){
            this.setState({
                errorMsg: "Enter start time"
            })
            return
        }

        if(endTime.trim() === ""){
            this.setState({
                errorMsg: "Enter end time"
            })
            return
        }

        // starting the server request
        this.setState({
            loading: true
        })

        // getting the role
        const data = {
            name,
            email,
            password,
            price,
            rating,
            startTime,
            endTime
        }

        Axios.post(`/register_expert.php`, data)
            .then((result) => {
                const data = result.data
                console.log(data)
                if(data.success){
                    this.setState({
                        successMsg: "Successfully registered",
                        name: "",
                        email: "",
                        password: "",
                        price: "",
                        rating: "",
                        startTime: "",
                        endTime: "",
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
        let submitBtnText = "Submit"
        let submitBtnDisabled = false

        if(this.state.loading){
            submitBtnDisabled = true
            submitBtnText = "Loading..."
        }
        
        return (
        <div className="container">
            <h1 className="text-center">Expert Registration</h1>
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

                <MyInput
                name="rating"
                type="number"
                title="Rating"
                min={1}
                max={5}
                value={this.state.rating}
                onChange={this.onInputChange} />

                <MyInput
                name="price"
                type="number"
                title="Price per hour"
                min={200}
                max={500}
                value={this.state.price}
                onChange={this.onInputChange} />

                <MyInput
                name="startTime"
                type="time"
                title="Avilabe Time (Start)"
                value={this.state.startTime}
                onChange={this.onInputChange} />

                <MyInput
                name="endTime"
                type="time"
                title="Avilabe Time (End)"
                value={this.state.endTime}
                onChange={this.onInputChange} />                

                <p className="text-danger">{this.state.errorMsg}</p>
                <p className="text-success">{this.state.successMsg}</p>
                <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitBtnDisabled}>{submitBtnText}</button>
            </form>
        </div>
        )
    }
}
