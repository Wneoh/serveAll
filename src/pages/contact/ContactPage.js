import React,{useEffect, useState} from "react";
import { ContactTable } from "../../components/table/contact/ContactTable";
import contact from '../../assets/data/contact.json'
import Page from "../../components/Page";
import { AddContactPage } from "./AddContactPage";

const ContactPage = () => {

    const [data,setData] = useState(contact);
    const [id,setId] = useState('');
    const [searchStr,setSearchStr] = useState();
    const [page,setPage] = useState('list');

    useEffect(() => {},[searchStr,data]);

    const handleOnChangeSearch = e => {
        const {name,value} = e.target;
        if (name == 'search'){
            setSearchStr(value);
            searchWithFilter(value);
        }
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
        const filteredEmail= contact.filter(row=>row.email.toLowerCase().includes(value.toLowerCase()));
        const filteredNumber = contact.filter(row=>row.number.toLowerCase().includes(value.toLowerCase()));
        const filteredName = contact.filter(row=>row.name.toLowerCase().includes(value.toLowerCase()));
        const filteredData = [...filteredEmail,...filteredNumber,...filteredName];

        const processedData = filteredData.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

        setData(processedData);
    }

    const fetchData = () => {
        console.log("Fetch Data"); // fetch all data 
    }

    return (
        <div>
        {(() => {
            if (page == "list") {
            return (
                <Page title="Contact">
                        <ContactTable data={data} handleOnChangeSearch={handleOnChangeSearch} fetchDetail={fetchDetail} changeViewToAdd={changeViewToAdd}/>
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