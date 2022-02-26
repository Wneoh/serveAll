import React,{useEffect, useState} from "react";
import { TicketTable } from "../../components/table/ticket/TicketTable";
import { FilterForm } from "../../components/form/ticket/FilterForm";
import Page from "../../components/Page";
import { AddTicketPage } from "./AddTicketPage";
import TicketDetailPage from "./TicketDetailPage";
import axios from 'axios'
import { BASE_URL } from '../../config';
import { Breadcrumb } from "react-bootstrap";

const TicketPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState('');
    const [filteredData,setfilteredData] = useState('');
    const [searchStr,setSearchStr] = useState('');
    const [id,setId] = useState('');
    const [page,setPage] = useState('list');

    //filterInformation
    const [endDate,setEndDate] = useState('');
    const [startDate,setStartDate]  = useState('');
    const [status,setStatus]  = useState(0);

    useEffect(() => {
        getAllTickets();
    },[searchStr]);

    const handleOnChangeSearch = e => {
        const {name,value} = e.target;
        if (name == 'search'){
            setSearchStr(value);
            searchWithFilter(value);
        }
    }

    const resetFilter = () => {
        setStartDate("");
        setEndDate("");
        setStatus(0);
        setfilteredData(data);
    }

    const submitFilter = e => {
        e.preventDefault();
        var newFilteredData = [];
        if (startDate!='' && endDate!='') {
            if(new Date(startDate).getTime()>new Date(endDate).getTime()){
                alert("StartDate cannot be later than endDate")
                return;
            }
            const filteredDateData = data.filter((row) => {
                return new Date(row.openDate).getTime() >= new Date(startDate).getTime() &&
                       new Date(row.openDate).getTime() <= new Date(endDate).getTime();
            });

            console.log(filteredDateData);
            newFilteredData = filteredDateData;
        }

        if (status!=0) {
            var filteredStatusData = [];
            if (newFilteredData.length == 0) {
                filteredStatusData = data.filter((row) => {
                    return row.status  == status;
                });
            } else {
                console.log(newFilteredData);
                filteredStatusData = newFilteredData.filter((row) => {
                    return row.status  == status;
                });
            }
            newFilteredData = filteredStatusData
        }

        if (status == 0 && endDate == '' && startDate == '') {
            setfilteredData(data);
            return;
        }

        const processedData = newFilteredData.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)


        setfilteredData(processedData);
    }

    const handleOnChangeFilter = e => {
        const {name,value} = e.target;

        if(name=="startDate") {
            setStartDate(value);
        }

        if(name=="endDate"){
            setEndDate(value);
        }

        if(name=="status"){
            setStatus(value);
        }
    }
    const fetchDetail = (id) => {
        setPage('detail');
        setId(id);
    }

    const changeViewToAdd = () => {
        setPage("add");
    }

    const changeViewToList = async () => {
        await getAllTickets();
        setPage("list");
    }

    const searchWithFilter = (value) => {

        if (value != '') {
            const filteredClientTickets = data.filter(row=>row.client.toLowerCase().includes(value.toLowerCase()));
            const filteredIDTickets = data.filter(row=>row.id.toLowerCase().includes(value.toLowerCase()));
            const filteredHandledByTickets = data.filter(row=>row.handledBy.toLowerCase().includes(value.toLowerCase()));
            const filteredSubjectTickets = data.filter(row=>row.subject.toLowerCase().includes(value.toLowerCase()));
            const filteredIssueTickets = data.filter(row=>row.issue.toLowerCase().includes(value.toLowerCase()));
            const filteredData = [...filteredClientTickets,...filteredIDTickets,...filteredHandledByTickets,...filteredIssueTickets,...filteredSubjectTickets];

            const processedData = filteredData.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

            setfilteredData(processedData);
        } else {
            setfilteredData(data);
        }
    }

    const getAllTickets = async () => {
        try {
            if (searchStr == '') {
                const response = await axios.get(`${BASE_URL}/tickets`);
                setData(response.data.data);
                setfilteredData(response.data.data);
                setLoading(false);
            } else {
                searchWithFilter(searchStr);
            }
        } catch (error) {
            setData("");
        } 
    }
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div>
        {(() => {
            if (page == "list") {
            return (
                <Page title="Tickets">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Tickets</Breadcrumb.Item>
                    </Breadcrumb>
                    <FilterForm startDate={startDate} endDate={endDate} status={status} resetFilter={resetFilter} submitFilter={submitFilter} handleOnChangeFilter={handleOnChangeFilter}/>
                    <TicketTable data={filteredData} handleOnChangeSearch={handleOnChangeSearch} fetchDetail={fetchDetail} changeViewToAdd={changeViewToAdd}/>
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