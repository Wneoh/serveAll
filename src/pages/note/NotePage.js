import React,{useEffect, useState} from "react";
import { NoteTable } from "../../components/table/note/NoteTable";
import { FilterForm } from "../../components/form/note/FilterForm";
import Page from "../../components/Page";
import { AddNotePage } from "./AddNotePage";
import { Breadcrumb } from "react-bootstrap";
import { deleteNote, fetchNotes } from "../../api/NoteApi";
import { Container,Row, Spinner } from "react-bootstrap";

const NotePage = () => {

    const [isLoading, setLoading] = useState(true);
    const [filteredData,setfilterData] = useState('');
    const [data,setData] = useState('');
    const [id,setId] = useState('');
    const [searchStr,setSearchStr] = useState('');
    const [page,setPage] = useState('list');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');

    
    const resetFilter = () => {
        setStartDate("");
        setEndDate("");
        setfilterData(data);
    }

    const getAllNotes = async () => {
        if (searchStr == '') {
            const data = await fetchNotes();
            setfilterData(data);
            setData(data);
            setLoading(false);
           
        } else {
            await searchWithFilter(searchStr);
        }
    }

    useEffect(() => {
        getAllNotes();
    },[searchStr]);

    const handleOnChangeFilter = e => {
        const {name,value} = e.target;

        if(name=="startDate") {
            setStartDate(value);
        }

        if(name=="endDate"){
            setEndDate(value);
        }
    }

    const submitFilter = e => {
        e.preventDefault();

        if(new Date(startDate).getTime()>new Date(endDate).getTime()){
            alert("StartDate cannot be later than endDate")
            return;
        }

        if (!startDate || !endDate) {
            alert("Please make sure there is startDate and endDate")
            return;
        }
        const newFiltereddata = data.filter((row) => {
            return new Date(row.date).getTime() >= new Date(startDate).getTime() &&
                   new Date(row.date).getTime() <= new Date(endDate).getTime();
        });

        setfilterData(newFiltereddata);
    }
    const handleOnChangeSearch = e => {
        const {value} = e.target;
        setSearchStr(value);
        searchWithFilter(value);
    }
    
    const fetchDetail = (id) => {
        setPage('detail');
        setId(id);
    }

    const changeViewToAdd = () => {
        setPage("add");
    }

    const changeViewToList = async () => {
        await getAllNotes();
        setPage("list");
    }

    const searchWithFilter = async (value) => {

        if (value != '') {
            const filteredSubjectTickets = data.filter(row=>row.subject.toLowerCase().includes(value.toLowerCase()));
            const filteredDetailTickets = data.filter(row=>row.detail.toLowerCase().includes(value.toLowerCase()));
            const filteredData = [...filteredDetailTickets,...filteredSubjectTickets];

            const processedData = filteredData.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

            setfilterData(processedData);
        } else {
            setfilterData(data);
        }
    }

    const remove = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this note')) {
                if (searchStr == '') {
                    setLoading(true);
                    const status = await deleteNote(id);
            
                    if (status) {
                        alert("Successfully remove note #"+id);
                        await getAllNotes();
                    } else {
                        alert("Failed to remove note #"+id);
                    }
                    setLoading(false);
                }
            }
        } catch (error) {
            alert("Failed to remove note #"+id);
            setLoading(false);
        } 
    }

    return (
        <div>
        {(() => {
            if (page == "list") {
                if (isLoading) { 
                    return ( 
                    <Container>
                        <Row className="justify-content-center" style={{bottom:"50%"}}>
                            <Spinner size="bg" variant="primary" animation="border" />
                        </Row>
                    </Container>
                    )
                }
            return (
                <Page title="Notes">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Notes</Breadcrumb.Item>
                    </Breadcrumb>
                    <FilterForm startDate={startDate} endDate={endDate} resetFilter={resetFilter} submitFilter={submitFilter} handleOnChange={handleOnChangeFilter}/>
                    <NoteTable remove={remove} data={filteredData} searchStr={searchStr} handleOnChangeSearch={handleOnChangeSearch} fetchDetail={fetchDetail} changeViewToAdd={changeViewToAdd}/>
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