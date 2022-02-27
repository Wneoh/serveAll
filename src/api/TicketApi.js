import axios from "axios"
import { BASE_URL } from '../config';

export const fetchTickets = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/tickets`,{
        headers:{
            Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
        }});
        if (response.data.success == 1) {
            if (response.data.data) {
                const sortedData = response.data.data.sort(function (a, b) {
                    return new Date(b.openDate) - new Date(a.openDate);
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

export const getTicket = async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/ticket`, {
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

export const addTicket = async(client,subject,handledBy,openDate,issue,status) => {
    try{
        const response = await axios.post(`${BASE_URL}/ticket/add`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            client: client,
            subject: subject,
            handledBy: handledBy,
            openDate: openDate,
            issue: issue,
            status: status 
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

export const addHistory = async(id,responseBy,responseDate,reply,sensitive) => {
    try{
        const response = await axios.post(`${BASE_URL}/ticket/history/add`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            id: id,
            responseBy: responseBy,
            date: responseDate,
            response: reply,
            sensitive:sensitive
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

export const closeTicket = async(id) => {
    try{
        const response = await axios.post(`${BASE_URL}/ticket/close`, {
            headers:{
                Authorization : "Bearer " + sessionStorage.getItem('accessToken'),
            },
            id: id
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