import React,{useState} from 'react';
import { AddTicketForm } from '../../components/form/ticket/AddTicketForm';
import "./addTicketPage.style.css";
import { BASE_URL } from '../../config';
import axios from 'axios';

export const AddTicketPage = ({changeViewToList}) => {

    const [issue,setIssue] = useState("");
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

        setError('');
        if (!client) {
            setError("Please enter client");
            return;
        }
        if (!subject) {
            setError("Please enter subject");
            return;
        }
        if (!date) {
            setError("Please select a date");
            return;
        }
        if (!issue) {
            setError("Please describe issue");
            return;
        }

        if (!error) {
            //            const {client,subject,handledBy,issue,openDate,status} = req.body;
            const response = await axios.post(`${BASE_URL}/ticket/add`, {
                client: client,
                subject: subject,
                handledBy: "James",
                openDate: date,
                issue: issue,
                status: status // 1 - new, 2 - processing, 3 - closed
            });

            if (response.data.success == 1) {
                alert("Ticket has been added");
                window.location.href = "/ticket";
            }

            setClient('');
            setSubject('');
            setDate('');
            setIssue('');
        
        }
        
    }

    return (
    <div className='addTicket-page'>
            <div className='addTicket-content'>
                <AddTicketForm changeViewToList={changeViewToList} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} issue={issue} subject={subject} client={client} date={date}/>
            </div>
        </div>
    )
}
