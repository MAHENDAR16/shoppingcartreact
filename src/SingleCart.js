import classes from './HomePage.module.css';
import { prdtDataWithPremium } from './ProductsData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { billActions } from "./storefiles/billamount";
import { useSelector, useDispatch, Provider } from "react-redux";
import ProductDisplay from './ProductDisplay';
import classNames from 'classnames'
import cartSlice from './storefiles/cartItems';
import { db } from './firebase-config/firebase';
import { updateDoc, addDoc, doc, collection, getDocs } from 'firebase/firestore';
import { cartItemActions } from './storefiles/cartItems';
import { Link } from 'react-router-dom';

const SingleCart = (props)=>{
  //  let curritem = props.item;
    //let basket = props.basket;
    let basket = []
    
    let prdtData = prdtDataWithPremium;
    let search = prdtData.find((x)=>x.id === props.id)||[];//imp to give empty array 
  
    const [quantity, setQuantity] = useState(props.item);
    let billamount = useSelector((state)=>state.bill.billamount);
    let dispatch = useDispatch();

    const loggedin = useSelector((state)=>state.auth.isLogin);
    const username = useSelector((state)=>state.auth.username);
    let itemref, basketFire, cartData;
    const [size, setSize] = useState();
    /*IF USER IS LOGGED IN THEN CREATE A COLLECTION WITH HIS NAME IN FIRESTORE AND STORE HIS CART ITEMS */
    const getValue = async()=>{
        itemref = collection(db, `${username}`);
        basketFire = await getDocs(itemref);
        cartData = basketFire.docs.map((doc)=>({
            ...doc.data(),
            id : doc.id,
        }))
        /*COPYING THE VALUE IN CARTDATA TO BASKET */
        for(let i of cartData)
        {
            if(i.itemid !== 'tamount'){
                basket.push({
                    id:i.itemid,
                    item:i.quantity,
                })
            }
            if(i.itemid === props.id){
                setSize(i.size);
            }
        }
        console.log("to check")
        console.log(basket)
    }
    if(loggedin)
        getValue();   

  /*  const updateDocInFireIncrement = async ()=>{
        let f = 0;
        for(let i of cartData){
            if(i.itemid === props.id)
            {
                f = 1;
                const currItem = doc(itemref, i.id);
                await updateDoc(currItem, {
                    quantity : quantity+1,
                })
            }
        }
        if(f === 0){
            addDoc(itemref, {
                itemid : props.id,
                quantity : 1,
            });
        }
    }
    const updateDocInFireDecrement = async ()=>{
        for(let i of cartData){
            if(i.itemid === props.id && i.quantity !== 0)
            {
                const currItem = doc(itemref, i.id);
                await updateDoc(currItem, {
                    quantity : quantity-1,
                })
            }
        }
    }
       
    const increment = ()=>{
        console.log("CART INC");
        let searchfun = basket.find((y)=>y.id === props.id);
        if(searchfun === undefined){
            basket.push({
                id : props.id,
                item : 1,
            })
            dispatch(billActions.add(search.price));
            setQuantity(1);
        }
        else{
            searchfun.item += 1;
            dispatch(billActions.add(search.price));
            setQuantity(searchfun.item);
        }
        updateDocInFireIncrement();
        dispatch(cartItemActions.add());
    }

    const decrement = ()=>{
        console.log("CART DEC");        
        let searchfun = basket.find((y)=>y.id === props.id);
        if(searchfun!== undefined && searchfun.item !== 0){
            searchfun.item -= 1;
            updateDocInFireDecrement();
            dispatch(cartItemActions.subtract());// decrement the count of cart.

            /*THE BELOW STATEMENT WILL SET THE QUANTITY OF THE ITEM SINCE IT IS USESTATE HOOK WHEN THE CONTENT CHNAGES 
            THIS COMPONENET IS RE-RENEDERED HENCE IF QUANTITY == 0 THAT ITEM WILL NOT BE DISPLAYED.
            setQuantity(searchfun.item);
            
            dispatch(billActions.minus(search.price));//reducing the price of item from bill
            basket = basket.filter((x)=>x.item!==0);
        }
        else    return;
    }
*/
    return (
        <>
        {quantity > 0 && 
        <>
            <Link to = {`/products/${props.id}`} onClick={()=>window.scrollTo(0, 0)} id = "d-12"  
            className={classNames(classes.cart_hold, classes.cart_hold_exp)}>
                <div className = {classes.cart_hold_1}>
                    <img width = "100px" src={search.imagesrc}/>
                </div>
                <div className = {classes.cart_hold_2}>
                    <h4>{search.name}</h4>
                    <p>$ {quantity*search.price}</p>
                    <p style={{fontSize:"1rem"}}>{size}</p>
                    <div className={classes.btng}>
                        {/*<FontAwesomeIcon icon={faMinus} style = {{color:"red", cursor:"pointer"}} onClick = {decrement}/>*/}
                        <div class="quantity" style={{fontSize:"1rem"}}>Quantity : {quantity}</div>
                        {/*<FontAwesomeIcon icon={faPlus} style = {{color:"green", cursor:"pointer"}} onClick = {increment}/>*/}
                    </div>
                </div>
            </Link>
        </>
        }
        </>
    )
}

export default SingleCart;