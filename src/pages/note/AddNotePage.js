import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { AddNoteForm } from '../../components/form/note/AddNoteForm';
import "./addNotePage.style.css";
import { BASE_URL } from '../../config';
import { Breadcrumb } from 'react-bootstrap';

export const AddNotePage = ({id,changeViewToList}) => {

    const isAddMode = !id;
    const [isLoading, setLoading] = useState(true);
    const [loadingMsg,setLoadingMsg] = useState("loading");
    const [detail,setDetail] = useState("");
    const [handledBy,setHandledBy] = useState("");
    const [subject,setSubject] = useState("");
    const [date,setDate] = useState("");
    const [error,setError] = useState("");

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

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/note`,{
                params: {
                    id: id,
                },
            });
            if (response.data.success == 1) {
                setSubject(response.data.data[0].subject);
                setDetail(response.data.data[0].detail);
                setHandledBy(response.data.data[0].handledBy);
                setDate(response.data.data[0].date);
                setLoading(false);
            }
        } catch (error) {
            setLoadingMsg("Something is wrong, please try again later..")
        } 
    }
    

    useEffect(() => {
        if (!isAddMode) {
           fetchData(id);
        } else {
            setLoading(false)
        }
    }, []);

    if (isLoading) {
        return <div className="App">{loadingMsg}</div>;
    }

    const handleSubmit = async e => {
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
            setError("Please enter who this note was taken by");
            return;
        }

        if (!error) {
            if (isAddMode) {
                const response = await axios.post(`${BASE_URL}/note/add`, {
                    detail: detail,
                    subject: subject,
                    date: date,
                    handledBy: handledBy
                });

                if (response.data.success == 1) {
                    alert("Note has been added");
                    window.location.href = "/note";
                }

                setDetail('');
                setSubject('');
                setHandledBy('');
                setDate('');
            } else {
                if (!id) {
                    setLoadingMsg("No Id Found");
                    setLoading(true);
                }else {
                    const response = await axios.post(`${BASE_URL}/note/update`, {
                        id:id,
                        detail: detail,
                        subject: subject,
                        date: date,
                        handledBy: handledBy
                    });
    
                    if (response.data.success == 1) {
                        alert("Note has been updated");
                        window.location.href = "/note";
                    }
                }
            }
        }
        
    }

    return (
    <div className='addNote-page'>
            <div className='addNote-content'>
                <AddNoteForm changeViewToList={changeViewToList} isAddMode={isAddMode} id={id} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} detail={detail} subject={subject} handledBy={handledBy} date={date}/>
            </div>
        </div>
    )
}
