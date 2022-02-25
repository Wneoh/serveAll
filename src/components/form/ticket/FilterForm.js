import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import "./filterform.style.css";
export const FilterForm = () => {
  return (
      <Container>
      <Row className="filter">
          <Col sm={12}>
                <Form>
                    <Form.Group as={Row}>
                    <Col sm={4}>
                        <Row>
                            <Form.Label column sm={4} >Client: </Form.Label>
                            <Col sm={8}>
                                <Form.Select name="client" aria-label="All">
                                    <option value="-1">All</option>
                                    <option value="1">Client 1</option>
                                    <option value="2">Client 2</option>
                                    <option value="3">Client 3</option>
                                </Form.Select>
                            </Col>  
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Row>
                            <Form.Label column sm={4} >HandleBy: </Form.Label>
                            <Col sm={8}>
                                <Form.Select name="client" aria-label="All">
                                    <option value="-1">All</option>
                                    <option value="1">User 1</option>
                                    <option value="2">User 2</option>
                                    <option value="3">User 3</option>
                                </Form.Select>
                            </Col>  
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Row>
                            <Form.Label column sm={4} >Status: </Form.Label>
                            <Col sm={8}>
                                <Form.Select name="client" aria-label="All">
                                    <option value="-1">All</option>
                                    <option value="1">Closed</option>
                                    <option value="2">Pending</option>
                                    <option value="3">New</option>
                                </Form.Select>
                            </Col>  
                        </Row>
                    </Col>
                    <Col sm={8} className="pt-4">
                        <Form.Group as={Row}>
                            <Form.Label column sm={2} >Start Date: </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                />
                            </Col>  
                            <Form.Label column sm={2} >End Date: </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                />
                            </Col>  
                        </Form.Group>
                    </Col>

                    </Form.Group>
                    <Form.Group style={{float:'right'}}>
                        <Button className='btn-sm m-1'>
                                Reset
                        </Button>
                        <Button className='btn-sm m-1'>
                                Filter
                        </Button>
                    </Form.Group>
                </Form>
          </Col>
      </Row>
      </Container>
  )
}
