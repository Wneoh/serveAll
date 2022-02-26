import React from 'react'
import { Col,Row,Container, Button,Form } from 'react-bootstrap'
import "./filterform.style.css";
import moment from "moment";

function InfoBox({client,subject,openDate,closeDate,issue,status,handleCloseTicket}) {
  return (
    <Container>
        <Row className='filter'>
            <Col sm={12} className="pb-4">
                <h5>Overview</h5>
            </Col>
            <Col sm={4}>
                <strong>Subject</strong> : {subject}
            </Col>
            <Col sm={4}>
                <strong>Client</strong> : {client}
            </Col>
            <Col sm={4}>
                <strong>Ticket Opened Date</strong> : {moment(openDate).format('YYYY-MM-DD')}
            </Col>
            <Col sm={4} className="pt-3">
                <strong>Status</strong> : {(() => {
                  if( status == 1) {
                    return(<span>New</span>);
                  } else if (status == 2) {
                    return(<span>Processing</span>);
                  } else {
                    return(<span>Closed</span>);
                  }
                })()}
            </Col>
            <Col sm={6} className="pt-3">
                <strong>Issue</strong> : {issue}
            </Col>
            {
                status !== 3 ?
                <Form.Group style={{textAlign:'right'}}>
                <Button className='btn-danger' onClick={handleCloseTicket}>Close Ticket</Button>
                </Form.Group>
                : 
                <Col sm={12} className="pt-3">
                    <strong>Ticket Closed Date</strong> : {moment(closeDate).format('YYYY-MM-DD')}  
                </Col>
            }
            
        </Row>
      </Container>
  )
}

export default InfoBox