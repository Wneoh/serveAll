import React,{useEffect, useState} from "react";
import { ContactTable } from "../../components/table/contact/ContactTable";
import Page from "../../components/Page";
import { AddContactPage } from "./AddContactPage";
import axios from 'axios'
import { BASE_URL } from '../../config';

const ContactPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [filteredData,setfilterData] = useState('');
    const [data,setData] = useState('');
    const [id,setId] = useState('');
    const [searchStr,setSearchStr] = useState('');
    const [page,setPage] = useState('list');
      
    const remove = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this contact')) {
                if (searchStr == '') {
                    const response = await axios.post(`${BASE_URL}/contact/delete`, {
                        id : id
                    });

                    if (response.data.success == 1) {
                        alert("Successfully remove contact #"+id);
                        await getAllContacts();
                    } else {
                        alert("Failed to remove contact #"+id);
                    }
                }
            }
        } catch (error) {
            alert("Failed to remove note #"+id);
        } 
    }

    const getAllContacts = async () => {
        if (searchStr == '') {
            const response = await axios.get(`${BASE_URL}/contacts`);
            setfilterData(response.data.data);
            setData(response.data.data);
            setLoading(false);
        } else {
            await searchWithFilter(searchStr);
        }
    }

    useEffect(() => {
        getAllContacts();
    },[searchStr]);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    const handleOnChangeSearch = e => {
        const {value} = e.target;
            setSearchStr(value);
            searchWithFilter(value);
    }

    const fetchDetail = (id) => {
        setId(id);
        setPage('detail');
    }

    const changeViewToAdd = () => {
        setPage("add");
    }

    const changeViewToList = () => {
        setPage("list");
    }

    const searchWithFilter = (value) => {
        if (value != '') {
            const filteredEmail= data.filter(row=>row.email.toLowerCase().includes(value.toLowerCase()));
            const filteredNumber = data.filter(row=>row.phone.toLowerCase().includes(value.toLowerCase()));
            const filteredName = data.filter(row=>row.name.toLowerCase().includes(value.toLowerCase()));
            const filteredData = [...filteredEmail,...filteredNumber,...filteredName];
    
            const processedData = filteredData.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)
    
            setfilterData(processedData);
        } else {
            setfilterData(data);
        }
       
    }

    return (
        <div>
        {(() => {
            if (page == "list") {
            return (
                <Page title="Contact">
                        <ContactTable searchStr={searchStr} remove={remove} data={filteredData} handleOnChangeSearch={handleOnChangeSearch} fetchDetail={fetchDetail} changeViewToAdd={changeViewToAdd}/>
                </Page>            
            )
            } else if (page == "detail") {
            return (
                <AddContactPage id={id} changeViewToList={changeViewToList}/>            
            )
            } else if (page == "add"){
            return (
                <AddContactPage changeViewToList={changeViewToList}/>            
            )
            }
        })()}
        </div>
        
    )  
};

export default ContactPage