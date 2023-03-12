import React from 'react'
import classes from './HomePage.module.css'
import { prdtDataWithPremium } from './ProductsData';
import { useRef } from 'react';
import basket from './basketitem';
import cartSlice from './storefiles/cartItems';
import { cartItemActions } from './storefiles/cartItems';
import { useDispatch } from 'react-redux';
export default function PrdtDetailDesc(props){

    let search = basket.find((x)=>x.id === props.id2);
	const dispatch = useDispatch();
	let prdtData = prdtDataWithPremium;
	let currPrdt = prdtData.find((x)=>x.id === props.id2);
	console.log(currPrdt)
	let itemNeed ;
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
				<h4>$ {currPrdt.price}</h4>
				<select>
					<option>Select Size</option>
					<option>XXL</option>
					<option>XL</option>
					<option>Large</option>
					<option>Medium</option>
					<option>Small</option>
				</select>
				<input type="number" min = "1" placeholder='1' ref = {itemRef} onChange = {itemHandler} />
				<a href="/" className={classes.btn} onClick = {addToCart}>Add To Cart</a>
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
