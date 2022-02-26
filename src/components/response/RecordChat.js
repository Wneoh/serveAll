import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
const RecordChat = ({ error,reply,responseDate,sensitive,submitAsClient,submitAsStaff, handleOnChange }) => {
    return (
        <Container>
            <Row className="pt-4">
                <Col sm={12}>
                    <h5>Record Reply</h5>
                </Col>
                { error != "" && <Col sm={12}><p style={{color:"red"}}>{error}</p></Col>}
                <Form>
                    <Form.Control style={{ minHeight: "150px" }}
                        as="textarea"
                        row="5"
                        name="reply"
                        value={reply}
                        onChange={handleOnChange}
                        required
                    />
                    <Form.Group as={Row} className="pt-4">
                        <Col sm={4}>
                            <Row>
                                <Form.Label column sm={4}>Date: </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        type="date"
                                        name="recordDate"
                                        value={responseDate}
                                        onChange={handleOnChange}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Form.Check inline
                                type="Checkbox"
                                label="Sensitive Information"
                                name="sensitive"
                                id="sensitve"
                                checked={sensitive}
                                onChange={handleOnChange}
                            />
                        </Col>
                        <Col sm={4} style={{ textAlign: "right" }}>
                            <Button type="submit" onClick={submitAsClient} className='btn-sm m-1'>
                                Record as Client
                            </Button>
                            <Button type="submit" onClick={submitAsStaff} className='btn-sm m-1'>
                                Record as Staff
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}

export default RecordChat