import React, { Component } from 'react'

export default class MySubmitButton extends Component {
    render() {
        let submitBtnText = "Submit"
        let submitBtnDisabled = false
        let btnType = "submit"

        const {
            loading,
            type,
            btnText
        } = this.props

        if(btnText){
            submitBtnText = btnText
        }

        if(loading){
            submitBtnDisabled = true
            submitBtnText = "Loading..."
        }

        if(type !== ""){
            btnType = type
        }



        return (
            <button 
            type={btnType}
            onClick={this.props.onClick}
            className="btn btn-primary"
            disabled={submitBtnDisabled}>{submitBtnText}</button>
        )
    }
}
