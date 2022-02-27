import React, { useState, useEffect } from 'react'
import Page from '../../components/Page'
import InfoBox from '../../components/form/ticket/InfoBox'
import ChatHistory from '../../components/response/ChatHistory'
import RecordChat from '../../components/response/RecordChat'
import { Breadcrumb } from 'react-bootstrap'
import { addHistory, closeTicket, getTicket } from '../../api/TicketApi'
import { Spinner, Container, Row } from 'react-bootstrap';

function TicketDetailPage({ id, changeViewToList }) {

  const [buttonLoad, setButtonLoad] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [client, setClient] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [history, setHistory] = useState("");
  const [issue, setIssue] = useState("");
  const [error, setError] = useState("");

  // response
  const [reply, setReply] = useState("");
  const [sensitive, setSensitive] = useState(false);
  const [responseDate, setResponseDate] = useState("");


  const fetchTicketDetail = async (id) => {
    try {
      const resp = await getTicket(id);
      if (resp.length != 0) {
        setSubject(resp.data[0].subject);
        setClient(resp.data[0].client);
        setOpenDate(resp.data[0].openDate);
        setCloseDate(resp.data[0].closeDate);
        setStatus(resp.data[0].status);
        setIssue(resp.data[0].issue);

        const sortedHistory = resp.data[0].history.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });

        setHistory(sortedHistory);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const submitRecord = async (type, e) => {
    e.preventDefault();
    setError('');
    if (reply == "") {
      setError("Response is required.");
      return;
    }
    if (responseDate == "") {
      setError("Date is required.");
      return;
    }


    const response = await addHistory(id, type, responseDate, reply, sensitive);

    if (response) {
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

  const handleCloseTicket = async () => {
    setButtonLoad(true);
    const response = await closeTicket(id);
    if (response) {
      alert("Ticket has been closed");
      window.location.href = "/ticket";
    } else {
      alert("Ticket could not be closed...");
    }
    setButtonLoad(false);

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
      {
        isLoading ?
          <Container>
            <Row className="justify-content-center" style={{ bottom: "50%" }}>
              <Spinner size="bg" variant="primary" animation="border" />
            </Row>
          </Container> :
          <div>
            <InfoBox isLoading={buttonLoad} subject={subject} handleCloseTicket={handleCloseTicket} client={client} issue={issue} openDate={openDate} closeDate={closeDate} status={status} />
            <ChatHistory status={status} histories={history} />
            {
              status !== 3 && <RecordChat isLoading={buttonLoad} error={error} reply={reply} responseDate={responseDate} sensitive={sensitive} status={status} submitRecord={submitRecord} handleOnChange={handleOnChange} changeViewToList={changeViewToList} />
            }
          </div>
      }


    </Page>
  )
}

export default TicketDetailPage