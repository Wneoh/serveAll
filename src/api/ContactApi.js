import axios from "axios"
import { BASE_URL } from '../config';

export const fetchContacts = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/contacts`,{
        headers:{
            Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
        }});
        if (response.data.success == 1) {
            if (response.data.data) {
                const sortedData = response.data.data.sort(function (a, b) {
                    return new Date(b.updated) - new Date(a.updated);
                  });
                return sortedData;
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
    }
}

export const deleteContact = async(id) => {
    try{
        const response = await axios.post(`${BASE_URL}/contact/delete`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            id : id
        });

        if (response.data.success == 1) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


export const getContact = async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/contact`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            params: {
                id : id
            }
        });

        if (response.data.success == 1) {
            if (response.data.length != 0) {
                return (response.data);
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const addContact = async(email,name,number) => {
    try{
        const response = await axios.post(`${BASE_URL}/contact/add`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            email: email,
            name: name,
            phone: number
        });

        if (response.data.success == 1) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const updateContact = async(id,email,name,number) => {
    try{
        const response = await axios.post(`${BASE_URL}/contact/update`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            email: email,
            name: name,
            phone: number,
            id:id
        });

        if (response.data.success == 1) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}