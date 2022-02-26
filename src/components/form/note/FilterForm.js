import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import "./filterform.style.css";
export const FilterForm = ({startDate,endDate,submitFilter,resetFilter,handleOnChange}) => {

    return (
        <Container>
        <Row className="filter">
            <Col sm={12}>
                <Form>
                    <Form.Group as={Row}>
                    <Col sm={8}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2} >Start Date: </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={handleOnChange}
                                />
                            </Col>  
                            <Form.Label column sm={2} >End Date: </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={handleOnChange}
                                />
                            </Col>  
                        </Form.Group>
                    </Col>

                    </Form.Group>
                    <Form.Group style={{float:'right',paddingTop:'20px'}}>
                        <Button className='btn-sm m-1' onClick={resetFilter}>
                                Reset
                        </Button>
                        <Button className='btn-sm m-1' onClick={submitFilter}>
                                Filter
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        </Container>
    )
}
