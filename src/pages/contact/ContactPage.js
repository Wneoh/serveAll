import React,{useEffect, useState} from "react";
import { ContactTable } from "../../components/table/contact/ContactTable";
import contact from '../../assets/data/contact.json'
import Page from "../../components/Page";

const ContactPage = () => {

    const [data,setData] = useState(contact);
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
        <Page title="Contact">
                <ContactTable data={data} handleOnChangeSearch={handleOnChangeSearch} />
        </Page>
    )  
};

export default ContactPage