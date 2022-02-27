import React,{useState,useEffect} from 'react';
import { AddNoteForm } from '../../components/form/note/AddNoteForm';
import "./addNotePage.style.css";
import { addNote, getNote, updateNote } from '../../api/NoteApi';
import { Container,Row,Spinner } from 'react-bootstrap';
import moment from 'moment';

export const AddNotePage = ({id,changeViewToList}) => {

    const isAddMode = !id;
    const [isLoading, setLoading] = useState(true);
    const [buttonLoad, setButtonLoad] = useState(false);    
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
            const resp = await getNote(id);
            if (resp.length != 0) {
                setSubject(resp.data[0].subject);
                setDetail(resp.data[0].detail);
                setHandledBy(resp.data[0].handledBy);
                setDate(moment(resp.data[0].date).format('YYYY-MM-DD'));
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
        } 
    }
    

    useEffect(() => {
        if (!isAddMode) {
           fetchData(id);
        } else {
            setLoading(false)
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setButtonLoad(true);
        setError('');
        if (!detail) {
            setError("Please enter details");
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
        if (!handledBy) {
            setError("Please enter who this note was taken by");
            setButtonLoad(false);
            return;
        }

        if (!error) {
            if (isAddMode) {
                const response = await addNote(detail,subject,date,handledBy);

                if (response) {
                    alert("Note has been added");
                    window.location.href = "/note";
                } else {
                    alert("Note could not be added...");
                }

                setDetail('');
                setSubject('');
                setHandledBy('');
                setDate('');
            } else {
                if (!id) {
                    setLoading(true);
                }else {
                    const response = await updateNote(id,detail,subject,date,handledBy)
    
                    if (response) {
                        alert("Note has been updated");
                        window.location.href = "/note";
                    } else {
                        alert("Note could not be added...");
                    }
                }
                setButtonLoad(false);
            }
        }
        
    }

    return (
    <div className='addNote-page'>
            <div className='addNote-content'>
            { isLoading ?
                    <Container>
                        <Row className="justify-content-center" style={{bottom:"50%"}}>
                            <Spinner size="bg" variant="primary" animation="border" />
                        </Row>
                    </Container>
                :
                <AddNoteForm isLoading={buttonLoad} changeViewToList={changeViewToList} isAddMode={isAddMode} id={id} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} detail={detail} subject={subject} handledBy={handledBy} date={date}/>
            }
            </div>
        </div>
    )
}
