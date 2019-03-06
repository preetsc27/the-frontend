import React, { Component } from 'react'
import { ContextApi } from '../../helpers/ContextApi';
import Resource from '../../helpers/Resource';
import TableList from '../common/TableList';
import StudentNavbar from '../common/StudentNavbar';
import { Redirect } from 'react-router-dom'

export default class StudentBookings extends Component {
    constructor(props){
        super(props)
        this.state = {
          pageNumber: 1
        }
      }
      render() {
        return (
            <React.Fragment>
                <StudentNavbar />
                <div className="container">
                    <h2>Your Bookings</h2>
                    <Resource
                    url="/get_bookings_student.php"
                    data={this.state}>
                    <StudentBookingContent/>
                    </Resource>
                </div>
            </React.Fragment>
        )
      }
}

class StudentBookingContent extends Component {
    constructor(props){
      super(props)
      this.renderMainContent = this.renderMainContent.bind(this)
      this.pagNumberView = this.pagNumberView.bind(this)
    }
    static contextType = ContextApi
  
    pagNumberView(pn){
      return(
        <li className="page-item" key={pn}>
              <button className="page-link" onClick={() => {
                this.context.getData(pn)
            }}>{pn}</button>
        </li>
      )
    }
  
    renderMainContent(){
      const { 
        loading,
        errorMsg,
        data,
        loggedIn
      } = this.context.state
      if(loggedIn === false){
        return <Redirect to="/" />
      }
      if(loading){
        return(
          <p>Loading...</p>
        )
      }
      else if(errorMsg !== ""){
        return(
          <p className="text-danger">{errorMsg}</p>
        )
      }
      else if(data.data){
        const theadArray = ["S.No", "Booking Id",  "Expert Name", "Student Name", "Expert Rating", 
          "Date", "Start Time", "End Time"]
        const thead = theadArray.map((th, i)=>{
          return(
            <td key={i}>{th}</td>
          )
        })
  
        const tbody = data.data.map((tb, i)=>{
          return(
            <tr key={tb.bookingId || i}>
              <td>{i+1}</td>
              <td>{tb.bookingId}</td>
              <td>{tb.expertName}</td>
              <td>{tb.studentName}</td>
              <td>{tb.expertRating}</td>
              <td>{tb.date}</td>
              <td>{tb.startTime}</td>
              <td>{tb.endTime}</td>
            </tr>
          )
        })
  
        let pageNumbers = []
        if(data.pageNumber > 1)
          for (let i = 1; i <= data.pageNumbers; i++) {
            pageNumbers.push(this.pagNumberView(i))        
          }
  
        return(
          <TableList
          tableHeadings={thead}
          tableBody={tbody}
          pageNumbers={pageNumbers}
          />
        )
      }
    }
    render() {
      return (
        <div>
          {this.renderMainContent()}
          <button className="btn btn-primary" onClick={()=>{
            this.context.getData(1)
          }}>Refresh</button>
        </div>
      )
    }
  }
