import React from 'react'
import { Container, Row, Table,Button,Col,Form } from 'react-bootstrap'
import "./contactTable.style.css"

export const ContactTable = ({data,handleOnChangeSearch}) => {
  return (
    <Container>
    <Row className="contact-table">
      <Col sm={12} className="text-center pb-4" style={{position:"relative"}}>
        <Button href="/newContact">Add a New Contact</Button>
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
            <th>ID #</th>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.length ? data.map((row,i) => (
            <tr key={i}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.number}</td>
                <td>{row.email}</td>
                <td><Button href={"/contactDetail/"+row.id}>Detail</Button></td>
            </tr>
        )): 
            <tr>
                <td> No Contacts ...</td>
            </tr>
        }
          </tbody>
        </Table>
      </Col>
    </Row>
    </Container>
  )
}