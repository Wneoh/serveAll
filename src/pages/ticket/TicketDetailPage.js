import React, { useState, useEffect } from 'react'
import Page from '../../components/Page'
import InfoBox from '../../components/form/ticket/InfoBox'
import ChatHistory from '../../components/response/ChatHistory'
import RecordChat from '../../components/response/RecordChat'
import { BASE_URL } from '../../config';
import axios from 'axios';
import { Breadcrumb } from 'react-bootstrap'

function TicketDetailPage({ id, changeViewToList }) {

  const [isLoading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("loading");
  const [client, setClient] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [history, setHistory] = useState("");
  const [issue, setIssue] = useState("");
  const [error,setError] = useState("");

  // response
  const [reply, setReply] = useState("");
  const [sensitive, setSensitive] = useState(false);
  const [responseDate, setResponseDate] = useState("");


  const fetchTicketDetail = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/ticket`, {
        params: {
          id: id,
        },
      });
      if (response.data.success == 1) {
        setSubject(response.data.data[0].subject);
        setClient(response.data.data[0].client);
        setOpenDate(response.data.data[0].openDate);
        setCloseDate(response.data.data[0].closeDate);
        setStatus(response.data.data[0].status);
        setIssue(response.data.data[0].issue);


        // sort History first 

        const sortedHistory = response.data.data[0].history.sort(function(a,b){
          return new Date(a.date) - new Date(b.date);
        });

        setHistory(sortedHistory);

        setLoading(false);
      }
    } catch (error) {
      setLoadingMsg("Something is wrong, please try again later..")
    }
  };

  const submitAsClient = async (e) => {
    e.preventDefault();

    if (reply == ""){
      setError("Response is required.");
      return;
    }
    if (responseDate == "") {
      setError("Date is required.");
      return;
    }

    const response = await axios.post(`${BASE_URL}/ticket/history/add`, {
      id: id,
      responseBy: "Client",
      date: responseDate,
      response: reply,
      sensitive:sensitive
    });

    if (response.data.success == 1) {
      alert("Record has been updated");
      await fetchTicketDetail(id);
    } else {
      alert("Record could not be update. Please try it again later...");
    }

    setResponseDate("");
    setSensitive(false);
    setReply("");
    setError("");
  } 

  const submitAsStaff = async (e) => {
    e.preventDefault();
   
    if (reply == ""){
      setError("Response is required.");
      return;
    }
    if (responseDate == "") {
      setError("Date is required.");
      return;
    }

    const response = await axios.post(`${BASE_URL}/ticket/history/add`, {
      id: id,
      responseBy: "Staff",
      date: responseDate,
      response: reply,
      sensitive:sensitive
    });

    if (response.data.success == 1) {
      alert("Record has been updated");
      await fetchTicketDetail(id);
    } else {
      alert("Record could not be update. Please try it again later...");
    }
    
    setResponseDate("");
    setSensitive(false);
    setReply("");
    setError("");
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "reply":
        setReply(value);
        break;
      case "sensitive":
        const checked = e.target.checked;
        console.log("Sensitive checkbox is checked" + checked);
        setSensitive(checked);
        break;
      case "recordDate":
        setResponseDate(value);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    fetchTicketDetail(id);
  }, []);

  if (isLoading) {
    return <div className="App">{loadingMsg}</div>;
  }

  const handleCloseTicket = async () => {
    const response = await axios.post(`${BASE_URL}/ticket/close`, {
      id: id
    });

    if (response.data.success == 1) {
      alert("Ticket has been closed");
      window.location.href = "/ticket";
    }
  }

  return (
    <Page title="Ticket Detail">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/ticket">
          Ticket
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <InfoBox subject={subject} handleCloseTicket={handleCloseTicket} client={client} issue={issue} openDate={openDate} closeDate={closeDate} status={status} />
      <ChatHistory status={status} histories={history} />
      {
        status !== 3 && <RecordChat error={error} reply={reply} responseDate={responseDate} sensitive={sensitive}status={status} submitAsClient={submitAsClient} handleOnChange={handleOnChange} submitAsStaff={submitAsStaff} changeViewToList={changeViewToList} />
      }
    </Page>
  )
}

export default TicketDetailPage