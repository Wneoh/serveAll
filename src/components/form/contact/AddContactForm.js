import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
export const AddContactForm = ({ changeViewToList,isAddMode, id, name, error, number, email, handleOnChange, handleSubmit }) => {
    return (
        <Container>
            <Row>
                <Col sm={12} className="text-center pb-3">
                    <h2>{isAddMode ? "Add Contact" : "Edit Contact #" + id}</h2>
                </Col>
                {error !== '' ? <Col sm={12} className="text-center pb-2"><span style={{ color: "red", textAlign: "center" }}>{error}</span> </Col> : ""}
                <Col sm={12}>
                    <Form>
                        <Form.Group as={Row} className="pb-4">
                            <Form.Label column sm={3} >Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Enter Name"
                                    onChange={handleOnChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="pb-4">
                            <Form.Label column sm={3} >Phone</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="number"
                                    value={number}
                                    placeholder="Enter Phone Number"
                                    onChange={handleOnChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="pb-4">
                            <Form.Label column sm={3} >Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="Enter Email"
                                    onChange={handleOnChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={12} className="text-center">
                                {
                                    isAddMode == true ?
                                        <Button variant="primary" type="submit" onClick={handleSubmit} type="submit"> Add New Contact</Button>
                                        :
                                        <Button variant="primary" type="submit" onClick={handleSubmit} type="submit"> Edit</Button>
                                }
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col sm={12} >
                    <a style={{cursor:"pointer"}} onClick={changeViewToList} className="pt-2">
                        <small>Back</small>
                    </a>
                </Col>
            </Row>
        </Container>
    )
}
