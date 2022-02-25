import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { AddNoteForm } from '../../components/form/note/AddNoteForm';
import notes from '../../assets/data/note.json'
import "./addNotePage.style.css";
import { useParams } from "react-router-dom";

export const AddNotePage = () => {

    const { id } = useParams();

    const isAddMode = !id;
    const [detail,setDetail] = useState("");
    const [handledBy,setHandledBy] = useState("");
    const [subject,setSubject] = useState("");
    const [date,setDate] = useState("");
    const [error,setError] = useState("");
    const [found,setFound] = useState(true);

    const handleOnChange = e => {
        const {name,value} = e.target;
        switch (name) {
            case "detail":
                setDetail(value);
                break;
            case "subject":
                setSubject(value);
                break;
            case "handledBy":
                setHandledBy(value);
                break; 
            case "date":
                setDate(value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!isAddMode) {
           fetchData(id);
        }
    }, [found]);

    const fetchData = async (id) => {
        setFound(false);
        notes.forEach(row => {
            if (row.id == id) {
                setDetail(row.detail);
                setSubject(row.subject);
                setHandledBy(row.handledBy);
                setDate(row.date);
                setFound(true);
            }
        });
        /* Need to show error page
        if (!found) {
            var message = "Details Not found..."
            await axios
            .get("/error/" + message);
        }*/
    }

    const handleSubmit = e => {
        e.preventDefault();

        setError('');
        if (!detail) {
            setError("Please enter details");
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
        if (!handledBy) {
            setError("Please select who this note was taken by");
            return;
        }

        if (!error) {
           alert("Good to go!")
            // call api to login
            setDetail('');
            setDate('');
            setHandledBy('');
            setSubject('');
        }
        
    }

    return (
    <div className='addNote-page'>
            <div className='addNote-content'>
                <AddNoteForm isAddMode={isAddMode} id={id} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} detail={detail} subject={subject} handledBy={handledBy} date={date}/>
            </div>
        </div>
    )
}
