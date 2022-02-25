import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import "./chatHistory.style.css";

const ChatHistory = ({histories}) =>{
    console.log(histories);
    if (!histories) {
        return null;
    }
    return (
    <Container>
        <Row>
            <Col sm={12}>
                <h5>Chat History</h5>
            </Col>
        {
             histories.map((row,i) => (
                <div key={i} className={ "response-row mt-2 " + (row.responseBy == "staff" ? "flex-row-reverse" : " ")} >
                    <div className="send">
                        <div className="sender"><strong>{row.responseBy}</strong></div>
                        <div className="date"><strong>{row.date}</strong></div>
                    </div>
                    <div className="response">{row.response}</div>
                </div>
            ))
        }
        </Row>
    </Container>
    )
   
}

export default ChatHistory