import React,{useState,useEffect} from 'react'
import { AddContactForm } from '../../components/form/contact/AddContactForm';
import { Spinner,Container,Row } from 'react-bootstrap';
import { addContact, getContact, updateContact } from '../../api/ContactApi';

export const AddContactPage = ({id,changeViewToList}) => {

    const isAddMode = !id;
    const [isLoading, setLoading] = useState(true);
    const [buttonLoad, setButtonLoad] = useState(false);
    const [number,setNumber] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [error,setError] = useState("");

    const handleOnChange = e => {
        const {name,value} = e.target;
        switch (name) {
            case "number":
                setNumber(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "name":
                setName(value);
                break; 
            default:
                break;
        }
    }

    const fetchData = async (id) => {
        try {
            const resp = await getContact(id);
            if (resp.length != 0) {
                setNumber(resp.data[0].phone);
                setEmail(resp.data[0].email);
                setName(resp.data[0].name);
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
    },[]);

    const handleSubmit = async e => {
        e.preventDefault();
        setButtonLoad(true);
        setError('');
        if (!email) {
            setError("Please enter email");
            setButtonLoad(false);
            return;
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                setError("Please enter a valid email");
                setButtonLoad(false);
                return;
            }
        }
        if (!name) {
            setError("Please enter name");
            setButtonLoad(false);
            return;
        }
        if (!number) {
            setError("Please enter your phone");
            setButtonLoad(false);
            return;
        }

        if (!error) {
            if (isAddMode) {
                const response = await addContact(email,name,number);

                if (response) {
                    alert("Contact has been added");
                    window.location.href = "/contact";
                } else {
                    alert("Contact could not be added...");
                }

                setNumber('');
                setName('');
                setEmail('');
            } else {
                if (!id) {
                    setLoading(true);
                }else {
                    const response = await updateContact(id,email,name,number)
    
                    if (response) {
                        alert("Contact has been updated");
                        window.location.href = "/contact";
                    } else {
                        alert("Contact could not be added...");
                    }
                }
            }
            setButtonLoad(false);
        }
        
    }

    return (
    <div className='addNote-page'>
            <div className='addNote-content'>{
                isLoading ?
                    <Container>
                        <Row className="justify-content-center" style={{bottom:"50%"}}>
                            <Spinner size="bg" variant="primary" animation="border" />
                        </Row>
                    </Container>
                :
                <AddContactForm isLoading={buttonLoad} changeViewToList={changeViewToList} isAddMode={isAddMode} id={id} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} number={number} email={email} name={name}/>
                }
            </div>
        </div>
    )
}