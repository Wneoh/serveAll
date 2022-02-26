import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import "./filterform.style.css";
export const FilterForm = ({status,endDate,startDate,handleOnChangeFilter,resetFilter,submitFilter}) => {
  return (
      <Container>
      <Row className="filter">
          <Col sm={12}>
                <Form>
                    <Form.Group as={Row}>
                    <Col sm={8} >
                        <Form.Group as={Row}>
                            <Form.Label column sm={2} >Start Date: </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={handleOnChangeFilter}
                                />
                            </Col>  
                            <Form.Label column sm={2} >End Date: </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={handleOnChangeFilter}
                                />
                            </Col>  
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Row>
                            <Form.Label column sm={4} >Status: </Form.Label>
                            <Col sm={8}>
                                <Form.Select 
                                name="status" 
                                value={status} 
                                aria-label="All"
                                onChange={handleOnChangeFilter}>
                                    <option value="0">All</option>
                                    <option value="1">New</option>
                                    <option value="2">Processing</option>
                                    <option value="3">Closed</option>
                                </Form.Select>
                            </Col>  
                        </Row>
                    </Col>
                    </Form.Group>
                    <Form.Group style={{float:'right',paddingTop:'20px'}}>
                        <Button onClick={resetFilter} className='btn-sm m-1'>
                                Reset
                        </Button>
                        <Button onClick={submitFilter} className='btn-sm m-1'>
                                Filter
                        </Button>
                    </Form.Group>
                </Form>
          </Col>
      </Row>
      </Container>
  )
}
