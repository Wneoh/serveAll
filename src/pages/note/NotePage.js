import React,{useEffect, useState} from "react";
import { Button,Row,Col, Container } from "react-bootstrap";
import { NoteTable } from "../../components/table/note/NoteTable";
import notes from '../../assets/data/note.json'
import { FilterForm } from "../../components/form/note/FilterForm";
import Page from "../../components/Page";

const NotePage = () => {

    const [data,setData] = useState(notes);
    const [searchStr,setSearchStr] = useState();

    useEffect(() => {},[searchStr,data]);

    const handleOnChangeSearch = e => {
        const {name,value} = e.target;
        if (name == 'search'){
            setSearchStr(value);
            searchWithFilter(value);
        }
    }
    const searchWithFilter = (value) => {
        const filteredSubjectTickets = notes.filter(row=>row.subject.toLowerCase().includes(value.toLowerCase()));
        const filteredDetailTickets = notes.filter(row=>row.detail.toLowerCase().includes(value.toLowerCase()));
        const filteredData = [...filteredDetailTickets,...filteredSubjectTickets];

        const processedData = filteredData.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

        setData(processedData);
    }

    const fetchData = () => {
        console.log("Fetch Data"); // fetch all data 
    }

    return (
        <Page title="Notes">
                <FilterForm/>
                <NoteTable data={data} handleOnChangeSearch={handleOnChangeSearch} />
        </Page>
    )  
};

export default NotePage;