import React, { Component } from 'react'
import MyInput from '../common/MyInput';
import MySubmitButton from '../common/MySubmitButton';
import StudentNavbar from '../common/StudentNavbar';
import moment from 'moment'
import MyModal from '../common/MyModal';
import  { Redirect } from 'react-router-dom'
import MyAxios from '../../helpers/MyAxios';

export default class StudentHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: "",
            startTime: "",
            loading: false,
            errorMsg: "",
            successMsg: "",
            data: [],
            modalShow: false,
            selectedRating: 0,
            bookingLoading: false,
            modalErrorMsg: ""
        }
        this.onInputChange =  this.onInputChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
        this.getData = this.getData.bind(this)
        this.dataOrError = this.dataOrError.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.bookSession = this.bookSession.bind(this)
    }

    add1Hour(t){
        const a = moment(t, "HH:mm")
        console.log(a)
        const b = a.add(1, 'hours').format("HH:mm")
        console.log(b)
        return b
    }

    handleClose(){
        this.setState({
            modalShow: false
        })
    }

    bookSessionModal(rating){
        console.log(rating)
        this.setState({
            modalShow: true,
            selectedRating: rating,
            modalErrorMsg: ""
        })
    }

    getData(){
        this.setState({
            data: [],
            errorMsg: "",
            successMsg: "",
            modalErrorMsg: "",
            loading: true
        })
        const { startTime, date } = this.state
        const endTime = this.add1Hour(startTime)
        
        console.log(endTime)
        this.setState({
            endTime
        })
        const data = {
            startTime,
            endTime,
            date
        }
        MyAxios.post("/get_free_expert.php", data)
            .then(response => {
                const data = response.data
                console.log(data)
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
            })
            .catch(e => {
                this.setState({
                    errorMsg: e,
                    loading: false
                })
            })
    }

    // this is to book session
    bookSession(){
        this.setState({
            bookingLoading: true,
            successMsg: "",
            modalErrorMsg: ""
        })
        const {
            selectedRating,
            endTime,
            startTime,
            date
        } = this.state

        const data = {
            date,
            startTime,
            endTime,
            selectedRating
        }
        
        MyAxios.post('/booking_session.php', data)
            .then(response => {
                const data = response.data
                console.log(data)
                if(data.success){
                    this.setState({
                        modalShow: false,
                        data: [],
                        successMsg: data.message
                    })
                }else{
                    this.setState({
                        modalErrorMsg: data.message
                    })
                }
                this.setState({
                    bookingLoading: false
                })
            })
            .catch(e => {
                console.log(e)
                this.setState({
                    bookingLoading: false
                })
            })
    }

    onInputChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
            errorMsg: "",
            successMsg: ""
        })
    }

    formSubmit(e){
        // prevent form from submit
        e.preventDefault()

        console.log("Dhan grd")
        this.getData()
        // getting the data
    }

    dataOrError(){
        const {
            errorMsg, 
            data, 
            loading,
            startTime,
            endTime,
            bookingLoading,
            successMsg,
            modalErrorMsg
        } = this.state
        if(errorMsg !== "" || data.length < 0){
            return(
                <p className="text-danger">{errorMsg}</p>
            )
        }
        else if(successMsg !== ""){
            return(
                <p className="text-success">{successMsg}</p>
            )
        }
        else if(loading){
            return(
                <p className="text-warning">Loading...</p>
            )
        }
        else if(data.length > 0){
            const categories = data.map((d, i) => {
                let price = 600
                if(d.rating == 4){
                    price = 800
                }else if(d.rating > 4){
                    price = 1000
                }
                return(
                    <tr key={d.id}>
                        <td>{i+1}</td>
                        <td>Category {d.rating}</td>
                        <td>{price}</td>
                        <td><button 
                        className="btn btn-success"
                        onClick={() => {
                            this.bookSessionModal(d.rating)
                        }}>
                            Book
                        </button></td>
                    </tr>
                )
            })
            return(
                <React.Fragment>
                    <MyModal 
                    show={this.state.modalShow}
                    handleClose={this.handleClose}
                    heading="Book Session"
                    negativeBtnText="Close"
                    positiveBtnText="Book"
                    positiveBtnClick={this.bookSession}
                    loading={bookingLoading}
                    >
                        Do you want to book for Category
                        {this.state.selectedRating} from {startTime} to {endTime}?
                        <p className="text-danger">{modalErrorMsg}</p>
                    </MyModal>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Category Avilable</th>
                                    <th>Price</th>
                                    <th>Book</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            )
        }else{
            return null
        }
    }
    render() {
        // login check
        const token = localStorage.getItem("token")
        if(!token){
            return <Redirect to="/" />
        }
        const minDate = moment().format("YYYY-MM-DD")
        let minTime
        if(!moment(minDate).isAfter(this.state.date)){
            minTime = "00:00"
        }
        if(moment(minDate).isSame(this.state.date)){
            minTime = moment().format("HH:mm")
        }
        return (
            <React.Fragment>
                <StudentNavbar />
                <div className="container">
                    <h2>Book Session</h2>
                    <form className="form-inline" onSubmit={this.formSubmit}>
                        <MyInput
                        name="date"
                        type="date"
                        title="Date"
                        min={minDate}
                        value={this.state.date}
                        onChange={this.onInputChange}
                        />
                        <MyInput
                        name="startTime"
                        type="time"
                        title="Start Time"
                        min={minTime}
                        value={this.state.startTime}
                        onChange={this.onInputChange} 
                        />
                        <MySubmitButton
                        loading={this.state.loading} />
                    </form>
                    <br/>
                    {this.dataOrError()}
                </div>
            </React.Fragment>
        )
    }
}
