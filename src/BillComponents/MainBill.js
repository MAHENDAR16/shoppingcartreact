import React, { useEffect, useState } from 'react'
import { db } from "../firebase-config/firebase";
import { addDoc, doc, collection, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import { useSelector } from 'react-redux';
import classes from '../HomePage.module.css';
import { prdtDataWithPremium } from "../ProductsData";
import basket from '../basketitem';

function MainBill() {
    let itemref, basketFire, cartData = [];
    let prdtData = prdtDataWithPremium;
    const username = useSelector((state)=>state.auth.username);

    let [basketdata, setBasketData] = useState([]);
    const getValue = async ()=>{
        itemref = collection(db, `${username}`);
        basketFire = await getDocs(itemref);
        cartData = basketFire.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id,
        }))
        cartData = cartData.filter((x)=>x.quantity!==0);
        cartData = cartData.filter((x)=>x.itemid!=="tamount");
        /*WE SHOULD SET THE DATA INSIDE USEEFFECT FN ITSELF OTHERWISE THE DATA WOULD BE LOST
        , BCOZ CARTDATA HERE IS NOT GLOBAL */
        setBasketData(cartData);
    }
    useEffect(()=>{getValue()}, []);
    
   
  return (
    <>
        {basketdata.map((doc)=>{

            const search = prdtData.find((x)=>x.id === doc.itemid);
            return (
                <section id = "d-12"  key = {doc.id} className={classes.cart_hold} style={{marginTop:"20px"}}>
                    <div className = {classes.cart_hold_1}>
                        <img width = "100px" src={search.imagesrc}/>
                    </div>
                    <div className = {classes.cart_hold_2}>
                        <h4>{search.name}</h4>
                        <p>$ {doc.quantity*search.price}</p>
                        <div className={classes.btng}>
                            <div class="quantity">{doc.quantity}</div>
                        </div>
                    </div>
                </section>
        )
        })}
    </>
  )
}

export default MainBill