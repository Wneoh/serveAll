import React from 'react'
import { Container, Row } from 'react-bootstrap'

const Page = ({title,children}) => {
  return (
      <div style={{backgroundColor:"#f6f6f6", minHeight:"100vh"}}>
          <Container style={{padding:'25px'}}>
                <h2 >{title}</h2>
                {children}
          </Container>
      </div>
  )
}

export default Page