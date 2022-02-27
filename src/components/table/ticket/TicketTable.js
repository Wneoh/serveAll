import React from 'react'
import { Container, Row, Table,Button,Col,Form } from 'react-bootstrap'
import "./tickettable.style.css"
import moment from 'moment'

export const TicketTable = ({data,handleOnChangeSearch,fetchDetail,changeViewToAdd,searchSensitive,searchStr}) => {
  return (
    <Container>
    <Row className="ticket-table">
      <Col sm={12} className="text-center pb-5" style={{position:"relative"}}>
      <Button onClick={changeViewToAdd}>Add a New Ticket</Button>
        <Col style={{position:"absolute",top:0,right:10}}>
          <Form.Control 
          placeholder='Search ...'
          type="text" 
          name="search"
          onChange={handleOnChangeSearch}
          value={searchStr}
          />
          </Col>
      </Col>
      <Col sm={12}>
        <Table responsive striped bordered hover variant="white" style={{backgroundColor:"#ffffff",textAlign:"center"}} >
        <thead>
          <tr>
            <th>Ticket #</th>
            <th>Client</th>
            <th>Handled By</th>
            <th>Subject</th>
            <th>Opened Date</th>
            <th>Closed Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data ? data.map((row,i) => (
            <tr key={i}>
                <td>{row.id}</td>
                <td>{row.client}</td>
                <td>{row.handledBy}</td>
                <td>{row.subject}</td>
                <td>{ ( row.openDate == null || row.openDate == "")  ? "-" : moment(row.openDate).format('YYYY-MM-DD')}</td>
                <td>{ ( row.closeDate == null || row.closeDate == "")  ? "-" : moment(row.closeDate).format('YYYY-MM-DD')}</td>
                <td>{(() => {
                  if( row.status == 1) {
                    return(<span>New</span>);
                  } else if (row.status == 2) {
                    return(<span>Processing</span>);
                  } else {
                    return(<span>Closed</span>);
                  }
                })()}
                </td>
                <td><Button value={row.id} onClick={ () => fetchDetail(row.id)}>Detail</Button></td>
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