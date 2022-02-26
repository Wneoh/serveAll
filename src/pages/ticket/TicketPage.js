import React,{useEffect, useState} from "react";
import { TicketTable } from "../../components/table/ticket/TicketTable";
import tickets from '../../assets/data/dummy-ticket.json'
import { FilterForm } from "../../components/form/ticket/FilterForm";
import Page from "../../components/Page";
import { AddTicketPage } from "./AddTicketPage";
import TicketDetailPage from "./TicketDetailPage";

const TicketPage = () => {

    const [data,setData] = useState(tickets);
    const [searchStr,setSearchStr] = useState();
    const [id,setId] = useState('');
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
        const filteredSubjectTickets = tickets.filter(row=>row.subject.toLowerCase().includes(value.toLowerCase()));
        const filteredIssueTickets = tickets.filter(row=>row.issue.toLowerCase().includes(value.toLowerCase()));
        const filteredData = [...filteredIssueTickets,...filteredSubjectTickets];

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
                <Page title="Tickets">
                    <FilterForm/>
                    <TicketTable data={data} handleOnChangeSearch={handleOnChangeSearch} fetchDetail={fetchDetail} changeViewToAdd={changeViewToAdd}/>
                </Page>          
            )
            } else if (page == "detail") {
            return (
                <TicketDetailPage id={id} changeViewToList={changeViewToList}/>            
            )
            } else if (page == "add"){
            return (
                <AddTicketPage changeViewToList={changeViewToList}/>            
            )
            }
        })()}
        </div>
    )  
};

export default TicketPage;