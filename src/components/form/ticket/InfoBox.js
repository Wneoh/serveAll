import React from 'react'
import { Col,Row,Container, Button,Form } from 'react-bootstrap'
import "./filterform.style.css";

function InfoBox({client,subject,date,issue,status,handleCloseTicket}) {
  return (
    <Container>
        <Row className='filter'>
            <Col sm={12} className="pb-4">
                <h5>Overview</h5>
            </Col>
            <Col sm={3}>
                <strong>Subject</strong> : Something is wrong...
            </Col>
            <Col sm={3}>
                <strong>Client</strong> : James
            </Col>
            <Col sm={3}>
                <strong>Date</strong> : 2020-02-13
            </Col>
            <Col sm={3}>
                <strong>Status</strong> : New
            </Col>
            <Col sm={6} className="pt-3">
                <strong>Issue</strong> : I need some help with me account, it has been blocked...
            </Col>
            <Form.Group style={{textAlign:'right'}}>
                <Button className='btn-danger'>Close Ticket</Button>
            </Form.Group>
        </Row>
          <Col></Col>
      </Container>
  )
}

export default InfoBox