import React,{useState} from 'react';
import { AddTicketForm } from '../../components/form/ticket/AddTicketForm';
import "./addTicketPage.style.css";
import { Spinner,Container,Row } from 'react-bootstrap';
import { addTicket } from '../../api/TicketApi';

const AddTicketPage = ({changeViewToList}) => {

    const [issue,setIssue] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);
    const [client,setClient] = useState("");
    const [subject,setSubject] = useState("");
    const [date,setDate] = useState("");
    const [status,setStatus] = useState(1);
    const [error,setError] = useState("");

    const handleOnChange = e => {
        const {name,value} = e.target;
        switch (name) {
            case "issue":
                setIssue(value);
                break;
            case "subject":
                setSubject(value);
                break;
            case "client":
                setClient(value);
                break; 
            case "date":
                setDate(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setButtonLoad(true);
        setError('');
        if (!client) {
            setError("Please enter client");
            setButtonLoad(false);
            return;
        }
        if (!subject) {
            setError("Please enter subject");
            setButtonLoad(false);
            return;
        }
        if (!date) {
            setError("Please select a date");
            setButtonLoad(false);
            return;
        }
        if (!issue) {
            setError("Please describe issue");
            setButtonLoad(false);
            return;
        }

        if (!error) {
            const userObject = JSON.parse(sessionStorage.getItem('allServeUser'));
            const response = await addTicket(client,subject,userObject.name,date,issue,status);
            if (response) {
                alert("Ticket has been added");
                window.location.href = "/ticket";
            }

            setClient('');
            setSubject('');
            setDate('');
            setIssue('');
        
        }
        setButtonLoad(false);
    }

    return (
    <div className='addTicket-page'>
            <div className='addTicket-content'>
                {
                isLoading ?
                    <Container>
                        <Row className="justify-content-center" style={{bottom:"50%"}}>
                            <Spinner size="bg" variant="primary" animation="border" />
                        </Row>
                    </Container>
                :
                <AddTicketForm isLoading={buttonLoad} changeViewToList={changeViewToList} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} issue={issue} subject={subject} client={client} date={date}/>
                }
            </div>
        </div>
    )
}

export default AddTicketPage