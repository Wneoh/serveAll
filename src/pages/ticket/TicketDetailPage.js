import React from 'react'
import Page from '../../components/Page'
import { Container,Row,Col } from 'react-bootstrap'
import InfoBox from '../../components/form/ticket/InfoBox'
import ChatHistory from '../../components/response/ChatHistory'
import tickets from '../../assets/data/dummy-ticket.json'
import RecordChat from '../../components/response/RecordChat'

function TicketDetailPage({changeViewToList}) {

  const fetchDetails = (id) => {
    // fetch detail on one id
  };

  const handleCloseTicket = (id) => {
    // call api to close 
  }

  return (
    <Page title="Ticket Detail">
      <InfoBox/>
      <ChatHistory histories={tickets[0].history}/>
      <RecordChat changeViewToList={changeViewToList}/>
    </Page>
  )
}

export default TicketDetailPage