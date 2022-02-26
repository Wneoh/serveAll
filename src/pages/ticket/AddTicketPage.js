import React,{useState} from 'react';
import { AddTicketForm } from '../../components/form/ticket/AddTicketForm';
import "./addTicketPage.style.css";

export const AddTicketPage = ({changeViewToList}) => {

    const [issue,setIssue] = useState("");
    const [client,setClient] = useState("");
    const [subject,setSubject] = useState("");
    const [date,setDate] = useState("");
    const [status,setStatus] = useState("");
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

    const handleSubmit = e => {
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
           alert("Good to go!")
            // call api to login
            setClient('');
            setDate('');
            setIssue('');
            setSubject('');
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
