import React from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import "./dashboard.style.css";

const DashboardPage = () => {
    return (
        <Container>
            <Row className="actions">
                <Col sm ={3}>
                    <Button href="/ticket">
                        Client's Ticket
                    </Button>
                </Col>
                <Col sm ={3}>
                    <Button href="/note">
                        Meeting Note
                    </Button>
                </Col>
                <Col sm ={3}>
                    <Button href="/contact">
                        Contact
                    </Button>
                </Col>
                <Col sm ={3}>
                    <Button href="/report">
                        Generate Report
                    </Button>
                </Col>
            </Row>
        </Container>
    )  
};

export default DashboardPage;