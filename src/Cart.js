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
import { cartItemActions } from "./storefiles/cartItems";
import { useNavigate } from "react-router-dom";
let billIdFirebase = "";
let flag = "";
console.log("check for relaod");
const Cart = ()=>{  
  
    let prdtData = prdtDataWithPremium;
   // let [cartData, setCartData] = useState([]);
    let billamount = useSelector((state)=>state.bill.billamount);
    let dispatch = useDispatch();
    console.log("cart page");

    const isLoggedIn = useSelector((state)=>state.auth.isLogin);
    const username = useSelector((state)=>state.auth.username);
    let itemref, basketFire, cartData = [], pcartData = [];
    const [printcartData, setprintcartdata] = useState([]);
    
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

    //const [cartData, setCartData] = useState([]);
    //const [itemPrintData, setItemPrintData] = useState([]);
    const getValue = async()=>{
        dispatch(billActions.makeZero());
       
        itemref = collection(db, `${username}`);
        basketFire = await getDocs(itemref);
        cartData = basketFire.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id,
        }))
        pcartData = cartData.filter((x)=>x.itemid!=='tamount')
        setprintcartdata(pcartData);
        console.log("printcartdata");

        console.log(printcartData)
       // setCartData(cartDat);
        //setItemPrintData(cartDat);
        console.log("FIREBASE DATA");
        console.log(cartData);
        sumCart();
        console.log(billIdFirebase);
    }
    useEffect(()=>{getValue()}, []);
    console.log(cartData);
    /*IF USER IS LOGGED IN THEN CREATE A COLLECTION WITH HIS NAME IN FIRESTORE AND STORE HIS CART ITEMS */
    const navigate = useNavigate();
    const addBill = async()=>{
        itemref = collection(db, `${username}`);
        basketFire = await getDocs(itemref);
        cartData = basketFire.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id,
        }))
       // setCartData(cartDat)
        let f = 0;
        for(let i of cartData){
            if(i.itemid === "tamount"){
                f = 1;
                billIdFirebase = i.id;
                break;
            }
        }
        if(f === 0){
            await addDoc(itemref, {
                TotalAmount : billamount,
                itemid : "tamount",
            })
        }
        else{
            const bill = doc(itemref, billIdFirebase);
            await updateDoc(bill, {TotalAmount : billamount});
        }

      //  setItemPrintData(cartDat.filter((x)=>x.itemid !== 'tamount'));
        //console.log(itemPrintData)
        navigate('/bill');
        console.log("buy clicked");
    }

    const deleteDataFromFirestore = async()=>{
        itemref = collection(db, `${username}`);
        basketFire = await getDocs(itemref);
        cartData = basketFire.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id,
        }))
        //setCartData(cartDat);
        //setItemPrintData(cartDat);
        for(let i of cartData){
            const item = doc(itemref, i.id);
            if(i.itemid === "tamount"){
                await updateDoc(item , {
                    TotalAmount : 0,
                })
            }
            else{
                await updateDoc(item, {
                    quantity : 0,
                })
            }
            console.log("vlear item firebase");
        }
    }
    const clearCart = ()=>{
        dispatch(billActions.makeZero());
        dispatch(cartItemActions.makeZero())
        deleteDataFromFirestore();
        console.log(cartData);
    }
 //   console.log(itemPrintData);
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
                        {printcartData.map((x)=>{
                            return <SingleCart key = {x.itemid} id = {x.itemid} item = {x.quantity} basket = {basket} />
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
