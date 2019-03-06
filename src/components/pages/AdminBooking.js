import React, { Component } from 'react'
import { ContextApi } from '../../helpers/ContextApi';
import Resource from '../../helpers/Resource';
import TableList from '../common/TableList';

export default class AdminBooking extends Component {
    constructor(props){
      super(props)

      this.state = {
        pageNumber: 1
      }
    }
    render() {
      return (
        <div className="container">
          <Resource
          url="/get_bookings_admin.php"
          data={this.state}>
            <AdminBookingContent/>
          </Resource>
        </div>
      )
    }
}



class AdminBookingContent extends Component {
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
    console.log(this.context.state)
    const { 
      loading,
      errorMsg,
      data
    } = this.context.state

    if(loading){
      return(
        <p>Loading...</p>
      )
    }
    else if(errorMsg){
      return(
        <p className="text-danger">{errorMsg}</p>
      )
    }
    else if(data.length === 0){
      return(
        <p className="text-danger">No Data Found</p>
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
