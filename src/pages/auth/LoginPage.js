import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/form/auth/LoginForm';
import ResetPasswordForm from '../../components/form/auth/ResetPasswordForm';
import "./login.style.css";
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../api/UserApi';
import {loginPending,loginSuccess,loginFail } from "../../slices/loginSlice";

const LoginPage = () => {

    const {isLoading,isAuth,error} = useSelector(state=>state.auth)
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

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
        dispatch(loginFail(""));
        setForm(form);
    }
    
    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(loginPending());

        if (!email) {
            dispatch(loginFail("Please enter email"));
            return;
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                dispatch(loginFail("Please enter a valid email"));
                return;
            }
        }

        if (form !== 'forgetPassword') {
            if (!password) {
                dispatch(loginFail("Please enter password"));
                return;
            }
        }

            if (form == 'forgetPassword') {
                alert("Email has been sent to reset Password!");
            } 
            if (form == 'login') {
                const status = await login(email,password);

                if (status) {
                    dispatch(loginSuccess(""));
                    navigate("/");
                } else {
                    dispatch(loginFail("Wrong Email/Password"));
                }
            }
        
    }

    return (
        <div className='login-page'>
            <div className='login-content'>
                {form == 'login' && <LoginForm isLoading={isLoading} handleSubmit={handleSubmit} handleOnChange={handleOnChange} error={error} email={email} password={password} changeView={handleForm}/>}
                    
                {form == 'forgetPassword' && <ResetPasswordForm handleSubmit={handleSubmit} handleOnChange={handleOnChange} error={error} email={email} changeView={handleForm}/> }
            </div>
        </div>
    )
}

export default (LoginPage)