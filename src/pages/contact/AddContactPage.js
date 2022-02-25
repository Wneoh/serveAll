import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import contact from '../../assets/data/contact.json'
import { AddContactForm } from '../../components/form/contact/AddContactForm';

export const AddContactPage = () => {

    const { id } = useParams();

    const isAddMode = !id;
    const [number,setNumber] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [error,setError] = useState("");
    const [found,setFound] = useState(true);

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

    useEffect(() => {
        if (!isAddMode) {
           fetchData(id);
        }
    }, [found]);

    const fetchData = async (id) => {
        setFound(false);
        contact.forEach(row => {
            if (row.id == id) {
                setNumber(row.number);
                setName(row.name);
                setEmail(row.email);
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
        if (!email) {
            setError("Please enter email");
            return;
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
           alert("Good to go!")
            // call api to login
            setNumber('');
            setName('');
            setEmail('');
        }
        
    }

    return (
    <div className='addNote-page'>
            <div className='addNote-content'>
                <AddContactForm isAddMode={isAddMode} id={id} error={error} handleOnChange={handleOnChange} handleSubmit={handleSubmit} number={number} email={email} name={name}/>
            </div>
        </div>
    )
}