import React from 'react'
import { Container, Row, Table,Button,Col,Form } from 'react-bootstrap'
import "./notetable.style.css"

export const NoteTable = ({data,handleOnChangeSearch}) => {
  return (
    <Container>
    <Row className="note-table">
      <Col sm={12} className="text-center pb-4" style={{position:"relative"}}>
        <Button href="/newNote">Add a New Note</Button>
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
            <th>Handled By</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.length ? data.map((row,i) => (
            <tr key={i}>
                <td>{row.id}</td>
                <td>{row.handledBy}</td>
                <td>{row.subject}</td>
                <td>{row.date}</td>
                <td><Button href={"/noteDetail/"+row.id}>Detail</Button></td>
            </tr>
        )): 
            <tr>
                <td> No Notes ...</td>
            </tr>
        }
          </tbody>
        </Table>
      </Col>
    </Row>
    </Container>
  )
}