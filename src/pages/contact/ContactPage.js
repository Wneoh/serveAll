import React,{useEffect, useState} from "react";
import { ContactTable } from "../../components/table/contact/ContactTable";
import Page from "../../components/Page";
import { AddContactPage } from "./AddContactPage";
import { deleteContact, fetchContacts } from "../../api/ContactApi";
import { Container,Row, Spinner } from "react-bootstrap";

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
                    setLoading(true);
                    const status = await deleteContact(id)
                    if (status) {
                        alert("Successfully remove contact #"+id);
                        await getAllContacts();
                    } else {
                        alert("Failed to remove contact #"+id);
                    }
                    setLoading(false);
                }
            }
        } catch (error) {
            alert("Failed to remove note #"+id);
            setLoading(false);
        } 
    }

    const getAllContacts = async () => {
            if (searchStr == '') {
                const data = await fetchContacts();
                setfilterData(data);
                setData(data);
                setLoading(false);
            } else {
                await searchWithFilter(searchStr);
            }
        
    }

    useEffect(() => {
        getAllContacts();
    },[searchStr]);

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