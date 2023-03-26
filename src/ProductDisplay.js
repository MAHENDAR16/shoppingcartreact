import { useState, useEffect } from 'react';
import classes from './HomePage.module.css';
import Products from './FirstPage/Products';
import SingleProduct from './SingleProduct';
import { prdtDataWithPremium } from './ProductsData';
import { useSelector, useDispatch } from 'react-redux';
import { db } from './firebase-config/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
const ProductDisplay = ()=>{
    let type, s_type;

    let prdtData = prdtDataWithPremium.filter((x)=>x.id!=="premium");

    const [stdata, setstdata] = useState(prdtData.slice());
    /*SHOULD USE USESTATE TO CHANGE THE VALUE OF A VARIABLE SO THAT WHEN IT CHANGES THE ENTIRE REACT COMPONENT 
    RELOADES */

    const loggedin = useSelector((state)=>state.auth.isLogin);
    const username = useSelector((state)=>state.auth.username);
   

    function changeContent(){
        s_type = document.getElementById('select');
	    type = s_type.value;
        setstdata(prdtData.slice());
        if(type === 'd2'){
            setstdata((stdata)=>stdata.sort((a, b)=>{
                return a.price-b.price;
            }))
        }
        
        console.log(stdata);
    }
    let itemref, basketFire, cartDat = [];
    const [cartData, setCartData] = useState([]);
    /*IF USER IS LOGGED IN THEN CREATE A COLLECTION WITH HIS NAME IN FIRESTORE AND STORE HIS CART ITEMS */
    const getValue = async()=>{
        if(loggedin){
            itemref = collection(db, `${username}`);
            basketFire = await getDocs(itemref);
            cartDat = basketFire.docs.map((doc)=>({
                ...doc.data(),
                id : doc.id,
            }))
            /*WE SHOULD SET THE DATA INSIDE USEEFFECT FN ITSELF OTHERWISE THE DATA WOULD BE LOST
        , BCOZ CARTDATA HERE IS NOT GLOBAL */
            setCartData(cartDat);   
        }
        
    }
    console.log("cart data")
    console.log(cartData)
    useEffect(()=>{getValue()}, []);

    return (
        <div className={classes.small_container}>
            <div className={classes.row_2} >
                <h2>All Products</h2> 
                <select id = "select" name = "select_type" onChange={changeContent}>
                    <option value="">Default Sorting</option>
                    <option value="d2">Sort by Price</option>
                    <option value="d3">Sort by Popularity</option>
                    <option value="d4">Sort by Rating</option>
                    <option value="d5">Sort by Sale</option>
                </select>

            </div>
            <div className={classes.row} id="itemcontainer">
                {stdata.map((x)=>{
                    return <SingleProduct data = {x} key = {x.id} cart = {cartData}></SingleProduct>
                })}
            </div>

            <div className={classes.page_btn}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>&#8594;</span>
            </div>
	    </div>
    )
}

export default ProductDisplay