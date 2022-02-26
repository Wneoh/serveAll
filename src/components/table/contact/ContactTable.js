import React from 'react'
import { Container, Row, Table,Button,Col,Form } from 'react-bootstrap'
import "./contactTable.style.css"
import moment from 'moment'


export const ContactTable = ({searchStr,remove,data,handleOnChangeSearch,fetchDetail,changeViewToAdd}) => {
  return (
    <Container>
    <Row className="contact-table">
      <Col sm={12} className="text-center pb-4" style={{position:"relative"}}>
        <Button onClick={changeViewToAdd}>Add a New Contact</Button>
        <Col style={{position:"absolute",top:0,right:10}}><Form.Control 
        placeholder='Search ...'
        type="text" 
        name="search"
        value={searchStr}
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
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.length ? data.map((row,i) => (
            <tr key={i}>
                <td>{i+1}</td>
                <td>{(row.name != null || row.name != undefined ) ? row.name : '-'}</td>
                <td>{(row.phone != null || row.phone != undefined ) ? row.phone : '-'}</td>
                <td>{(row.email != null || row.email != undefined) ? row.email : '-'}</td>
                <td>{moment(row.updated).format('YYYY-MM-DD')}</td>
                <td>
                  <Button className="m-1" value={row.id} onClick={ () => fetchDetail(row.id)}>Detail</Button>
                  <Button className="m-1" variant="danger" value={row.id} onClick={ () => remove(row.id)}>Delete</Button>
                </td>         
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