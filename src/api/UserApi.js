import axios from "axios"
import { BASE_URL } from '../config';

export const login = async(email,password) => {
    try{
        const status = await axios.post(`${BASE_URL}/user/login`, {
            email :email,
            password : password
        }).then(function (response) {
            if (response.data.success == 1) {
                sessionStorage.setItem('accessToken',response.data.accessToken)
                localStorage.setItem('allServe',JSON.stringify( { accessToken : response.data.accessToken }))
                sessionStorage.setItem('allServeUser',JSON.stringify(response.data.user))
                return true;
            } else {
                return false;                
            }
        })
        .catch(function (error) {
            if(error.response.status==401){
                return false;                
            };
            return false;                
        })
        return status;
    } catch (err) {
        console.log(err);
    }
}

export const logout = async() => {
    try{
        const userObject = JSON.parse(sessionStorage.getItem('allServeUser'));
        await axios.post(`${BASE_URL}/user/logout`,{
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            id : userObject.id
        })
    } catch (err) {
        console.log(err);
    }
}

export const generateReport = async() => {
    try{
        const resp = await axios.get(`${BASE_URL}/data/report`,{
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
        });

        if (resp.data.success == 1) { 
            return resp.data;
        } else {
            return null;
        }
    } catch (err) {
        return null;
        console.log(err);
    }
}