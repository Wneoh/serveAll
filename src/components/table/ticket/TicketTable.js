import React from 'react'
import { Container, Row, Table,Button,Col,Form } from 'react-bootstrap'
import "./tickettable.style.css"

export const TicketTable = ({data,handleOnChangeSearch}) => {
  return (
    <Container>
    <Row className="ticket-table">
      <Col sm={12} className="text-center pb-4" style={{position:"relative"}}>
        <Button href="/newTicket">Add a New Ticket</Button>
        <Col style={{position:"absolute",top:0,right:10}}><Form.Control 
        placeholder='Search ...'
        type="text" 
        name="search"
        onChange={handleOnChangeSearch}
        /></Col>
      </Col>
      <Col sm={12}>
        <Table responsive striped bordered hover variant="white" style={{backgroundColor:"#ffffff",textAlign:"center"}} >
        <thead>
          <tr>
            <th>Ticket #</th>
            <th>Client</th>
            <th>Handled By</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.length ? data.map((row,i) => (
            <tr key={i}>
                <td>{row.id}</td>
                <td>{row.client}</td>
                <td>{row.handledBy}</td>
                <td>{row.subject}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
                <td><Button href="/ticketDetail">Detail</Button></td>
            </tr>
        )): 
            <tr>
                <td> No Tickets ...</td>
            </tr>
        }
          </tbody>
        </Table>
      </Col>
    </Row>
    </Container>
  )
}