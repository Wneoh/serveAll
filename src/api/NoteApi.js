import axios from "axios"
import { BASE_URL } from '../config';

export const fetchNotes = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/notes`,{
        headers:{
            Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
        }});
        if (response.data.success == 1) {
            if (response.data.data) {
                const sortedData = response.data.data.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
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

export const deleteNote = async(id) => {
    try{
        const response = await axios.post(`${BASE_URL}/note/delete`, {
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


export const getNote = async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/note`, {
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

export const addNote = async(detail,subject,date,handledBy) => {
    try{
        const response = await axios.post(`${BASE_URL}/note/add`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            detail: detail,
            subject: subject,
            date: date,
            handledBy:handledBy
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

export const updateNote = async(id,detail,subject,date,handledBy) => {
    try{
        const response = await axios.post(`${BASE_URL}/note/update`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            detail: detail,
            subject: subject,
            date: date,
            handledBy:handledBy,
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