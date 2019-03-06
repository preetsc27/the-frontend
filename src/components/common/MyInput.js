import React, { Component } from 'react'

export default class MyInput extends Component {
  render() {
    let isRequired = true
    const { required } = this.props
    if(required === "false"){
      isRequired = false
    }
    return (
        <div className="form-group">
            <label htmlFor={this.props.id}>{this.props.title}:</label>
            <input 
            type={this.props.type} 
            value={this.props.value} 
            onChange={this.props.onChange} 
            className="form-control"
            name={this.props.name}
            min={this.props.min}
            max={this.props.max}
            id={this.props.id}
            required={isRequired}/>
        </div>
    )
  }
}
