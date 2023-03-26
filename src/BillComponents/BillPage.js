import React from 'react'
import Header from '../Header.js'
import Footer from '../Footer.js'
import MainBill from './MainBill'
import classes from '../HomePage.module.css';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const BillPage = ()=>{
  const username = useSelector((state)=>state.auth.username);
  const billamount = useSelector((state)=>state.bill.billamount);
  /*USE REF VARIABLE TO HOLD THE CONTENT TO BE PRINTED */
  let billcomponent = useRef();
  const navigate = useNavigate();
  const traverseback = ()=>{
    navigate('/cart');
  }
  return (
    <>
        <Header/>

        {/*THIS DIV SHOULD BE PRINTED */}
        <div ref = {el=>(billcomponent = el)}>
          <div className={classes.hold_p}>
            <h2 id = "price_print" style={{color:"#ff004f"}}>Total Amount : {billamount}</h2>
            <h2 id = "price_print" style={{color:"#ff004f"}}>Username : {username.toUpperCase()}</h2>
            <button id = "ok" className={classes.okc} onClick = {traverseback}
            style={{cursor:"pointer", background:"red", marginRight:"20px"}}>Back to Cart</button>
            <ReactToPrint trigger={()=>{
              return <button id = "ok" className={classes.okc} style={{cursor:"pointer"}}>Generate Bill</button>
            }}
            
            pageStyle = "print"
            documentTitle ='Bill for Clothing'
            
            content={()=>billcomponent}
            />
          </div>
          
          <MainBill/>
        </div>
        <Footer/>
    </>
  )
}

export default BillPage