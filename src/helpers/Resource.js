import React, { Component } from 'react'
import { ContextApi } from './ContextApi';
import MyAxios from './MyAxios';


export default class Resource extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            loading: false,
            errorMsg: "", 
            loggedIn: true
        }

        this.getData = this.getData.bind(this)
    }

    getData(pageNumber){
        if(!pageNumber){
            pageNumber = 1
        }
        const { url, data } = this.props
        data.pageNumber = pageNumber
        this.setState({
            errorMsg: "",
            loading: true,
            data: []
        })
        MyAxios.post(url, data)
            .then(response => {
                const data = response.data
                console.log("RESOURCE", data)
                if(data.success){
                    this.setState({
                        data: data.data,
                        loading: false
                    })
                }else{
                    this.setState({
                        errorMsg: data.message,
                        loading: false
                    })
                }
                if(data.loggedIn !== null){
                    this.setState({
                        loggedIn: data.loggedIn,
                        loading: false
                    })
                }
            })
            .catch(e => {
                this.setState({
                    errorMsg: e,
                    loading: false
                })
            })
    }

    componentDidMount(){
        this.getData(1)
    }

    render() {
        return (
            <ContextApi.Provider value={{
                state: this.state,
                getData: (pageNumber)=>{
                    this.getData(pageNumber)
                }
                }}>
                {this.props.children}
            </ContextApi.Provider>
        )
    }
}
