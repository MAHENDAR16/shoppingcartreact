import Header from "./Header";
import Footer from './Footer';
import classes from './HomePage.module.css';
import { prdtDataWithPremium } from "./ProductsData";
import SingleCart from "./SingleCart";
import { billActions } from "./storefiles/billamount";
import { useSelector, useDispatch, Provider } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "./firebase-config/firebase";
import { addDoc, doc, collection, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import basket from './basketitem.js';
let billIdFirebase = "";
const Cart = ()=>{  
  
    let prdtData = prdtDataWithPremium;
    
    let billamount = useSelector((state)=>state.bill.billamount);
    let dispatch = useDispatch();
    console.log("cart page");

    const isLoggedIn = useSelector((state)=>state.auth.isLogin);
    const username = useSelector((state)=>state.auth.username);
    let itemref, basketFire, cartData;

    const sumCart = ()=>{
        for(let i of cartData){
            if(i.itemid !== "tamount"){
                let prdtsearch = prdtData.find((y)=>y.id == i.itemid);
                dispatch(billActions.add(prdtsearch.price * i.quantity));
                console.log(prdtsearch.price * i.quantity);
                console.log("infun");
            }
            else
                billIdFirebase = i.id;
        }
    }
    const getValue = async()=>{
        dispatch(billActions.makeZero());
        itemref = collection(db, `${username}`);
        basketFire = await getDocs(itemref);
        cartData = basketFire.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id,
        }))
        console.log("FIREBASE DATA");
        console.log(cartData);
        sumCart();
        console.log(billIdFirebase);
    }
    useEffect(()=>{getValue()}, []);
    /*IF USER IS LOGGED IN THEN CREATE A COLLECTION WITH HIS NAME IN FIRESTORE AND STORE HIS CART ITEMS */
    const addBill = async()=>{
        itemref = collection(db, `${username}`);
        if(billIdFirebase === ""){
            await addDoc(itemref, {
                TotalAmount : billamount,
                itemid : "tamount",
            })
        }
        else{
            const bill = doc(itemref, billIdFirebase);
            await updateDoc(bill, {TotalAmount : billamount});
        }
        console.log("buy clicked");
    }

    const deleteDataFromFirestore = async()=>{
        itemref = collection(db, `${username}`);
        for(let i of cartData){
            const item = doc(itemref, i.id);
            await deleteDoc(item);
        }
    }
    const clearCart = ()=>{
        dispatch(billActions.makeZero());
        deleteDataFromFirestore();
    }
    return(
        <>
            <Header/>
            <div className={classes.cart_page}>
                <div className={classes.hold_p}>
                    <h2 id = "price_print">Total Price : {billamount}</h2>
                    <button id = "ok" className={classes.okc} onClick = {addBill}>Buy</button>
                    <button className={classes.clearc} onClick = {clearCart}>Clear Cart</button>
                </div>

                {billamount > 0 && 
                    <div id = "carti" className={classes.cartic}>
                        {basket.map((x)=>{
                            return <SingleCart id = {x.id} item = {x.item} basket = {basket} />
                        })}
                    </div>
                }

                {billamount === 0 &&
                    <h1 style ={{textAlign:"center"}}>No item added yet</h1>
                }
            </div>
            <Footer/>
        </>
    )
}
export default Cart;