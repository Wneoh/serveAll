import React from "react";
import { Header } from "./partial/Header";
import { Footer } from "./partial/Footer";

export const DefaultLayout = ({children}) => {
  return (
    <div className="default-layout">
        <div className='header'>
            <Header/>
        </div>
        <div className='main'>{children}</div>
        <div className='footer'>
            <Footer/>
        </div>
    </div>
  )
}
