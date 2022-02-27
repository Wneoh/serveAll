import React, { useEffect, useState } from "react";
import { Container,Row,Col,Button,Spinner } from "react-bootstrap";
import { generateReport } from "../../api/UserApi";
import "./dashboard.style.css";

const DashboardPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [username,setUsername] = useState("");
    const [data,setData] = useState("");

    const print= () => {
        window.print();
    }

    const getReport = async () => {
        const response = await generateReport();
        setData(response.data);
        setLoading(false);
        console.log(data);
    }
    useEffect(() => {
        getReport();     
        const userObject = JSON.parse(sessionStorage.getItem('allServeUser'));
        if (userObject != null) setUsername(userObject.name);   
    }, [])
    
    return (
        <Container>
            {
                isLoading ? 
                    <Row className="justify-content-center pt-5" style={{bottom:"50%"}}>
                        <Spinner size="bg" variant="primary" animation="border" />
                    </Row>
                :
                <div>
                    <Row className="justify-content-center pt-5">
                        <Col sm ={3}>
                            <Button onClick={print}>
                                Generate Report
                            </Button>
                        </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col sm={12}>
                            {`Welcome ${username.toUpperCase()}, following are stats regrading issues...`}
                        </Col>
                        <Col sm={12} className="pt-4">
                            {`There are ${data.totalNotes} recorded meetings notes`}
                        </Col>
                        <Col sm={12} className="pt-4">
                            {`There are ${data.totalContact} recorded contacts`}
                        </Col>

                        <Col sm={12} className="pt-4">
                            {`There are ${data.totalUser} Users on serveAll`}
                        </Col>

                        <Col sm={12} className="pt-4">
                            {`There are ${data.totalTicket} tickets in total`}
                        </Col>
                        <Col sm={12} className="pt-4">
                            {`There are ${data.totalCloseTicket} closed tickets`}
                        </Col>
                        <Col sm={12} className="pt-4">
                            {`There are ${data.totalNewTicket} new tickets`}
                        </Col>
                        
                        
                    </Row>
                </div>
            }
        </Container>
    )  
};

export default DashboardPage;