import React, { Component } from 'react'

export default class TableList extends Component {
    render() {
        const { 
            tableHeadings,
            tableBody,
            pageNumbers
        } = this.props
        return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        {tableHeadings}
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
            <ul className="pagination justify-content-center">
                {pageNumbers}
            </ul>
        </div>
        )
    }
}
