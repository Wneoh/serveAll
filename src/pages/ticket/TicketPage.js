import React,{useEffect, useState} from "react";
import { Button,Row,Col, Container } from "react-bootstrap";
import { TicketTable } from "../../components/table/TicketTable";
import tickets from '../../assets/data/dummy-ticket.json'
import { FilterForm } from "../../components/form/ticket/FilterForm";
import Page from "../../components/Page";

const TicketPage = () => {

    const [data,setData] = useState(tickets);
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
        <Page title="Tickets">
                <FilterForm/>
                <TicketTable data={data} handleOnChangeSearch={handleOnChangeSearch} />
        </Page>
    )  
};

export default TicketPage;