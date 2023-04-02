import React from 'react'
import classes from './HomePage.module.css'
import { prdtDataWithPremium } from './ProductsData';
import { useRef, useEffect, useState } from 'react';
import basket from './basketitem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinus, faPlus, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import cartSlice from './storefiles/cartItems';
import { cartItemActions } from './storefiles/cartItems';
import { useDispatch, useSelector } from 'react-redux';
import { db } from './firebase-config/firebase';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, queryEqual } from 'firebase/firestore';

import { billActions } from './storefiles/billamount';
import { useNavigate } from 'react-router-dom';
let currcount = 0;
export default function PrdtDetailDesc(props){

   // let search = basket.find((x)=>x.id === props.id2);
	const dispatch = useDispatch();
	let prdtData = prdtDataWithPremium;
	let currPrdt = prdtData.find((x)=>x.id === props.id2);
	//console.log(currPrdt)
	
	//let itemNeed ;
	/*
	const itemRef = useRef();
	const itemHandler = ()=>{
		itemNeed = parseInt(itemRef.current.value);
	}
	
	const addToCart = (event)=>{
		event.preventDefault();
		if(itemNeed > 0){
			let search = basket.find((x)=>x.id === props.id2);
			if(search ===  undefined){
				basket.push({
					id:currPrdt.id,
					item:itemNeed,
				})
				//props.helpfn();
			}
			else{
				search.item += itemNeed;
			}
		}
		while(itemNeed > 0){
			dispatch(cartItemActions.add());
			itemNeed -= 1;
		}
		console.log(basket);
	}*/

	let itemref, basketFire, cartDat, basketo = [], search;
    //let search;
    const username = useSelector((state)=>state.auth.username);
	const loggedin = useSelector((state)=>state.auth.isLogin);
    const [cartData, setCartData] = useState([]);
    const [quantity, setQuantity] = useState(0);
	const [currSize, setCurrSize] = useState(null);
	const sizeRef = useRef(currSize);
	const [itemFromFire, setitemFromFire] = useState(0);
	const [basket, setBasket] = useState([]);
	
	/*IF USER IS LOGGED IN THEN CREATE A COLLECTION WITH HIS NAME IN FIRESTORE AND STORE HIS CART ITEMS */
    const getValue = async()=>{
        if(loggedin){
            itemref = collection(db, `${username}`);
            basketFire = await getDocs(itemref);
            cartDat = basketFire.docs.map((doc)=>({
                ...doc.data(),
                id : doc.id,
            }))
            for(let i of cartDat){
				/*WHEN MY ITEM IS ALREADY PRESENT GETTING THAT DOC INFO */
				if(i.itemid === props.id2){
					setQuantity(i.quantity);
					setitemFromFire(i.quantity);
			
					setCurrSize(i.size);
				}
				if(i.itemid !== 'tamount'){
					basketo.push({
                        id:i.itemid,
                        item:i.quantity,
                    })
				}
            }
            setCartData(cartDat);
            search = basketo.find((d)=>d.id === props.id2);
			setBasket(basketo)
            setQuantity((search!==undefined)?search.item : 0);
        }
    }

    useEffect(()=>{getValue()}, [currcount]);
	//init_quantity = quantity;
	console.log(basket)
	const navigate = useNavigate();

	/*const updateDocInFireIncrement = async ()=>{
        let f = 0;
		if(docId === null){
			//itemref = collection(db, `${username}`);
			await setDoc(doc(db, `${username}`, `${props.prdtname}`), {
                itemid : props.id2,
                quantity : 1,
				size : sizeRef.current.value,
            });
        }
        else{
			const currItem = doc(itemref, docId);
			const currDoc = doc(db, `${username}`, `${props.prdtname}`);
			console.log(currDoc)
			//currDoc.quantity += 1;
			//console.log("currdocquantity")
			//console.log(currDoc.quantity);
            await updateDoc(currItem, {
                quantity : quantity+1,
				size : sizeRef.current.value,
            })
            console.log("UPDATE IN FIREBASE");
        }
    }

	const increment = ()=>{
       // event.preventDefault();
        if(loggedin === false)
        {
            navigate('/login');
            console.log("not logged in");
            return;
        }
		let search = basket.find((y)=>y.id === props.id2);
		if(search ===  undefined)
		{
			basket.push({
				id:props.id2,
				item:1,
			})
			setQuantity(1);
		}
		else{
			search.item += 1;
			setQuantity(search.item);
		
		}
		dispatch(cartItemActions.add());
        updateDocInFireIncrement();
        
       // update();
    }
	const updateDocInFireDecrement = async ()=>{
		//itemref = collection(db, `${username}`);
		//const currItem = doc(, docId);
        await updateDoc(doc(db, `${username}`, `${props.prdtname}`), {
            quantity : quantity-1,
			size : sizeRef.current.value,
        })
    }
	const filterDataInFire = async()=>{
		if(quantity === 1)
			await deleteDoc(doc(db, `${username}`, `${props.prdtname}`)).then(()=>console.log("deleted in fireabse")).catch((err)=>console.log("error occured"))
	    console.log("filterdatainfire");
		console.log(quantity);
	}
    const decrement = (event)=>{
		console.log("in dec")
        if(loggedin === false)
        {
            navigate('/login');
            console.log("not logge in");
            return;
        }
        let search = basket.find((y)=>y.id === props.id2);
        
		let flag = 0;
        if(search!== undefined && search.item !== 0){
            search.item -= 1;
			console.log("prdt detail decrement")
			console.log("item value");
			console.log(search.item)
			/*QUANTITY IS SET TO VALUE-1 ONLY AFTER CALLING CARTDECREMENT FROM FIREBASE 
			setQuantity((prev) => prev - 1);
			console.log(quantity)
			updateDocInFireDecrement();
			filterDataInFire();
            dispatch(cartItemActions.subtract());
            setBasket((prev) => prev.filter((x)=>x.item!==0));
        }
        else    return;
        //update();
    }    */
	
	
	const addToCart = async ()=>{
		console.log("printquu");
		console.log(quantity)
		/*ONLY WHEN THE QUANTITY IS >0 CHANGE IS DONE IN BACKEND */
		console.log("sizref");
		console.log(sizeRef.current.value)
		setCurrSize(sizeRef.current.value)
		if(quantity == 0){
			console.log("in quantity zero")
			await deleteDoc(doc(db, `${username}`, `${props.prdtname}`)).then(()=>console.log("itemdeleted"));
		}
		else if(quantity > 0){
			console.log(">0")
			
			await setDoc(doc(db, `${username}`, `${props.prdtname}`), {
				itemid : props.id2,
				quantity:quantity,
				size : sizeRef.current.value,
			})
		}
		currcount = quantity-itemFromFire;
		console.log("currcounf");
		console.log(currcount)
		if(currcount > 0){
			for(let i  = 0;i<currcount;i++)
				dispatch(cartItemActions.add());
		}
		else{
			currcount *= -1;
			for(let i  = currcount;i>0;i--)
				dispatch(cartItemActions.subtract());
		}
		let search = basket.find((x)=>x.id === props.id2);
		search.item = quantity;
	}

    return (
        <div className={classes.single_product}>
		    <div className={classes.row}>
			<div className={classes.col_2}>
				<img src = {require(`./${currPrdt.imagesrc}`)} alt='image not seen' key = {currPrdt.id}/>
            </div>
			<div className={classes.col_2}>
				<p>Home / {currPrdt.name}</p>
				<h1>{currPrdt.name}</h1>
				<h4>$ {((quantity!==0)?quantity:1) * currPrdt.price}</h4>
				<select ref = {sizeRef}>
					<option>Select-Size</option>
					<option>XXL</option>
					<option>XL</option>
					<option>Large</option>
					<option>Medium</option>
					<option>Small</option>
				</select>
				{currSize !== null && <p className={classes.sizeSelect}>Size Selected : {currSize}</p>}
				
				{/*
				<input type="number" min = "1" placeholder='1' ref = {itemRef} onChange = {itemHandler} />
				<a href="/" className={classes.btn} onClick = {addToCart}>Add To Cart</a>
				*/}
				<div className={classes.detailData}>
					{/*<FontAwesomeIcon icon={faMinus} style = {{color:"red"}} onClick = {decrement}/>
					<div className={classes.quantity} style={{fontSize:"1.2rem"}}>{quantity}</div>
					<FontAwesomeIcon icon={faPlus} style = {{color:"green"}} onClick = {increment}/>*/}
					<label>Enter quantity : </label>

					<input type = "number" placeholder='' value = {quantity} min = "0"
					onChange={(e)=>setQuantity(e.target.value)}></input>

					<button className={classes.btn} style = {{border:"none", margin:"15px 0px"}}
					onClick = {addToCart}>Add To Cart</button>
				</div>
				<h3>Product Details </h3>
				<br/>
				<p>The bigger display provides more room for workout metrics and detail packed watch faces. 
                    The Wayfinder face lets you rotate the Digital Crown to activate Night Mode for better 
                    viewing in low light situations.</p>
			</div>
		</div>
	</div>
    )
}
