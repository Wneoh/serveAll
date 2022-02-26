import React from 'react'
import { Container, Row, Table,Button,Col,Form } from 'react-bootstrap'
import "./notetable.style.css"
import moment from 'moment'

export const NoteTable = ({searchStr,data,handleOnChangeSearch,fetchDetail,changeViewToAdd,remove}) => {
  return (
    <Container>
    <Row className="note-table">
      <Col sm={12} className="text-center pb-4" style={{position:"relative"}}>
        <Button onClick={changeViewToAdd}>Add a New Note</Button>
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
            <th>Note #</th>
            <th>Handled By</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.length ? data.map((row,i) => (
            <tr key={i}>
                <td>{i+1}</td>
                <td>{row.handledBy}</td>
                <td>{row.subject}</td>
                <td>{moment(row.date).format('YYYY-MM-DD')}</td>
                <td>
                  <Button className="m-1" value={row.id} onClick={ () => fetchDetail(row.id)}>Detail</Button>
                  <Button className="m-1" variant="danger" value={row.id} onClick={ () => remove(row.id)}>Delete</Button>
                </td>
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