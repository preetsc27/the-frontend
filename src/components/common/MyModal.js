import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import MySubmitButton from './MySubmitButton';

export default class MyModal extends Component {
    render() {
        return (
        <React.Fragment>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={this.props.handleClose}>
                        {this.props.negativeBtnText}
                    </button>
                    <MySubmitButton
                    btnText="Book"
                    type="button"
                    onClick={this.props.positiveBtnClick}
                    loading={this.props.loading}/>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
        )
    }
}
