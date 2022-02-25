import React,{useState} from 'react';
import { Container, Row } from 'react-bootstrap';
import LoginForm from '../../components/form/auth/LoginForm';
import ResetPasswordForm from '../../components/form/auth/ResetPasswordForm';
import "./login.style.css";

const LoginPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const [form, setForm] = useState('login');

    const handleOnChange = e => {
        const {name,value}  = e.target;
        if (name == 'email') {
            setEmail(value);
        } else if (name == 'password'){
            setPassword(value);
        }
    }

    const handleForm = (form) => {
        setError('');
        setForm(form);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        if ( !email) {
            setError("Please enter email");
            return;
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                setError("Please enter a valid email");
                return;
            }
        }

        if (form !== 'forgetPassword') {
            if (!password) {
                setError("Please enter password");
                return;
            }
        }

        if (!error) {
            if (form == 'forgetPassword') {
                alert("Email has been sent to reset Password!");
            } 
            if (form == 'login') {
                alert("Login!");
            }
            // call api to login

            setForm('login');
            setEmail('');
            setPassword('');
            setEmail('');
        }
        
    }

    return (
        <div className='login-page'>
            <div className='login-content'>
                {form == 'login' && <LoginForm handleSubmit={handleSubmit} handleOnChange={handleOnChange} error={error} email={email} password={password} changeView={handleForm}/>}
                    
                {form == 'forgetPassword' && <ResetPasswordForm handleSubmit={handleSubmit} handleOnChange={handleOnChange} error={error} email={email} changeView={handleForm}/> }
            </div>
        </div>
    )
}

export default LoginPage;