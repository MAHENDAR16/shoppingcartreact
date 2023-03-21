import React, { useEffect } from 'react'
import { db } from "../firebase-config/firebase";
import { addDoc, doc, collection, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import { useSelector } from 'react-redux';
import classes from '../HomePage.module.css';
import { prdtDataWithPremium } from "../ProductsData";
import basket from '../basketitem';
//let itemref, basketFire, cartData = [];
function MainBill() {
    let prdtData = prdtDataWithPremium;
    const username = useSelector((state)=>state.auth.username);
    /*itemref = collection(db, `${username}`);
    basketFire = await getDocs(itemref);
    cartData = basketFire.docs.map((doc)=>({
        ...doc.data(),
        id : doc.id,
    }))
    cartData = cartData.filter((x)=>x.quantity!==0);
    cartData = cartData.filter((x)=>x.itemid!=="tamount");
 // useEffect(()=>{getValue()}, []);
  console.log(cartData);*/
  let basketdata = basket;
   basketdata = basketdata.filter((x)=>x.item!==0);
  return (
    <>
        {basketdata.map((doc)=>{

            const search = prdtData.find((x)=>x.id === doc.id);
            return (
                <section id = "d-12"  className={classes.cart_hold} style={{marginTop:"20px"}}>
                    <div className = {classes.cart_hold_1}>
                        <img width = "100px" src={search.imagesrc}/>
                    </div>
                    <div className = {classes.cart_hold_2}>
                        <h4>{search.name}</h4>
                        <p>$ {doc.item*search.price}</p>
                        <div className={classes.btng}>
                            <div class="quantity">{doc.item}</div>
                        </div>
                    </div>
                </section>
        )
        })}
    </>
  )
}

export default MainBill