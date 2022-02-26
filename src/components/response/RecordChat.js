import React from 'react'
import { Container,Row,Col,Form,Button} from 'react-bootstrap'
const RecordChat =({changeViewToList}) => {
  return (
    <Container>
        <Row className="pt-4">
            <Col sm={12}>
                <h5>Record Reply</h5>
            </Col>
            <Form>
                <Form.Control style={{minHeight:"150px"}}
                as="textarea"
                row="5"
                name="reply"
                />
                    <Form.Group as={Row}  >
                        <Form.Label>Date: </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="date"
                                name="recordDate"
                            />
                        </Col>
                        <Col sm={3}>
                            <Form.Check inline
                                type="Checkbox"
                                label="Sensitive Information"
                                name="sensitive"
                                id="sensitve"
                            />
                        </Col>
                        <Col sm={5} style={{textAlign:"right"}}>
                            <Button className='btn-sm m-1'>
                                    Record as Client
                            </Button>
                            <Button className='btn-sm m-1'>
                                Record as Staff
                            </Button>
                        </Col>  
                    </Form.Group>
            </Form>
            <Col sm={12} >
                        <a style={{cursor:"pointer"}} onClick={changeViewToList} className="pt-2">
                            <small>Back</small>
                        </a>
                    </Col>
        </Row>
    </Container>
  )
}

export default RecordChat