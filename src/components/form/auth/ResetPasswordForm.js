import React from 'react'
import { Col, Container, Form, Row,Button } from 'react-bootstrap';

const ResetPasswordForm = ({handleOnChange,handleSubmit,error,email,changeView}) => {
  return (
      <Container>
          <Row>
              <Col sm={12} className="text-center pb-3">
                  <h2>Reset Password</h2>
              </Col>
              {error !== ''? <span className="pb-2" style={{color:"red",textAlign:"center"}}>{error}</span>: ""}
              <Col sm={12}>
                <Form>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        type="email" 
                        name="email" 
                        value={email}
                        placeholder="Enter email" 
                        onChange={handleOnChange}
                        required
                        />
                    </Form.Group>
                    <Row>
                        <Col sm={12} className="text-center pt-4">
                            <Button variant="primary" onClick={handleSubmit} type="submit">
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
                </Col>
                <Col sm={12} >
                    <a href="#!" className="pt-2" onClick={()=>changeView("login")}>
                        <small>Have account? Login now!</small>
                    </a>
                </Col>
          </Row>
      </Container>
  )
}


export default ResetPasswordForm;