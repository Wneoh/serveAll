import React,{useState,useEffect} from 'react'
import { AddContactForm } from '../../components/form/contact/AddContactForm';
import axios from 'axios'
import { BASE_URL } from '../../config';

export const AddContactPage = ({id,changeViewToList}) => {

    const isAddMode = !id;
    const [isLoading, setLoading] = useState(true);
    const [loadingMsg,setLoadingMsg] = useState("loading");
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
            const response = await axios.get(`${BASE_URL}/contact`,{
                params: {
                    id: id,
                },
            });
            if (response.data.success == 1) {
                setNumber(response.data.data[0].phone);
                setEmail(response.data.data[0].email);
                setName(response.data.data[0].name);
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
    },[]);

    if (isLoading) {
        return <div className="App">{loadingMsg}</div>;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setError('');
        if (!email) {
            setError("Please enter email");
            return;
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                setError("Please enter a valid email");
                return;
            }
        }
        if (!name) {
            setError("Please enter name");
            return;
        }
        if (!number) {
            setError("Please enter your phone");
            return;
        }

        if (!error) {
            if (isAddMode) {
                const response = await axios.post(`${BASE_URL}/contact/add`, {
                    email: email,
                    name: name,
                    phone: number
                });

                if (response.data.success == 1) {
                    alert("Contact has been added");
                    window.location.href = "/contact";
                }

                setNumber('');
                setName('');
                setEmail('');
            } else {
                if (!id) {
                    setLoadingMsg("No Id Found");
                    setLoading(true);
                }else {
                    const response = await axios.post(`${BASE_URL}/contact/update`, {
                        id:id,
                        email: email,
                        name: name,
                        phone: number
                    });
    
                    if (response.data.success == 1) {
                        alert("Contact has been updated");
                        window.location.href = "/contact";
                    }
                }
            }
        }
        
    }

    return (
    <div className='addNote-page'>
            <div className='addNote-content'>
                <AddContactForm changeViewToList={changeViewToList} isAddMode={isAddMode} id={id} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} number={number} email={email} name={name}/>
            </div>
        </div>
    )
}