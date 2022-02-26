import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./chatHistory.style.css";
import moment from 'moment';
import * as Icon from 'react-bootstrap-icons';

const ChatHistory = ({ status,histories }) => {
    return (
        <Container>
            {
                (histories.length == 0 || !histories) ?
                    <Row className='text-center'>
                        <Col sm={12}>
                            <strong>There is no Chat History..</strong>
                        </Col>
                    </Row>
                    :
                    <Row className="chat-con">
                        <Col sm={12} className="chat-box text-center">
                            <h5>Chat History</h5>
                        </Col>
                        {
                            histories.map((row, i) => (
                                <div key={i} className={"response-row mt-2 " + (row.responseBy.toLowerCase() == "staff" ? "flex-row-reverse" : "")} >
                                    <div className="send">
                                        <div className="sender"><strong>{row.responseBy}</strong></div>
                                        <div className="date"><strong>{moment(row.date).format('YYYY-MM-DD')}</strong></div>
                                        {
                                            row.sensitive && <Icon.ExclamationCircleFill color="darkred" size={20}/>
                                        }
                                    </div>
                                    <div className="response">        
                                        {row.response}         
                                    </div>
                                </div>
                            ))
                        }
                        {
                            status == 3 && 
                            <Col sm={12} className="text-center">
                                <h4>Case Closed</h4>
                            </Col>
                        }
                        
                    </Row>
            }

        </Container>
    )

}

export default ChatHistory