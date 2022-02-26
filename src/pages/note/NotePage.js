import React,{useEffect, useState} from "react";
import { NoteTable } from "../../components/table/note/NoteTable";
import notes from '../../assets/data/note.json'
import { FilterForm } from "../../components/form/note/FilterForm";
import Page from "../../components/Page";
import { AddNotePage } from "./AddNotePage";

const NotePage = () => {

    const [data,setData] = useState(notes);
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
        setPage('detail');
        setId(id);
    }

    const changeViewToAdd = () => {
        setPage("add");
    }

    const changeViewToList = () => {
        setPage("list");
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
        <div>
        {(() => {
            if (page == "list") {
            return (
                <Page title="Notes">
                    <FilterForm/>
                    <NoteTable data={data} handleOnChangeSearch={handleOnChangeSearch} fetchDetail={fetchDetail} changeViewToAdd={changeViewToAdd}/>
                </Page>          
            )
            } else if (page == "detail") {
            return (
                <AddNotePage id={id} changeViewToList={changeViewToList}/>            
            )
            } else if (page == "add"){
            return (
                <AddNotePage changeViewToList={changeViewToList}/>            
            )
            }
        })()}
        </div>
    )  
};

export default NotePage;