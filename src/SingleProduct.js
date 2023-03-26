import {Link, useNavigate} from 'react-router-dom';
import classes from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { prdtDataWithPremium } from './ProductsData';
import { billActions } from "./storefiles/billamount";
import { useSelector, useDispatch, Provider } from "react-redux";
import basket from './basketitem';
import { cartItemActions } from './storefiles/cartItems';
import { db } from './firebase-config/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';


const SingleProduct = (props)=>{
    let x = props.data;
    const dispatch = useDispatch()   
    //let search = basket.find((d)=>d.id === x.id)
    //let basket = [];
    //const [quantity, setQuantity] = useState((search!==undefined)?search.item : 0);
    
    /*console.log("props carts")
    console.log(props.cart)
    const getValue = () =>{
        for(let i of props.cart){
            if(i.itemid !== 'tamount'){
                basket.push({
                    id:i.itemid,
                    item:i.quantity,
                })
            }
            
        }
        search = basket.find((d)=>d.id === x.id);
        setQuantity((search!==undefined)?search.item : 0)
    }
    useEffect(()=>{getValue()}, [])*/

    //const [quantity, setQuantity] = useState((search!==undefined)?search.item : 0);
    //setQuantity((search!==undefined)?search.item : 0);
    
   // let datasearch = prdtData.find((y)=>y.id == x.id);
   // const [quantity, setQuantity] = useState(0);
    const loggedin = useSelector((state)=>state.auth.isLogin);
    const username = useSelector((state)=>state.auth.username);
    let itemref, basketFire, cartDat, search, basket = [];
    //let search;
    
    const [cartData, setCartData] = useState([]);
    const [quantity, setQuantity] = useState(0);
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
                if(i.itemid !== 'tamount'){
                    basket.push({
                        id:i.itemid,
                        item:i.quantity,
                    })
                }
            }
            setCartData(cartDat);
            search = basket.find((d)=>d.id === x.id);
            setQuantity((search!==undefined)?search.item : 0)
        }
    }
    useEffect(()=>{getValue()}, );
    
    const navigate = useNavigate();

    const updateDocInFireIncrement = async ()=>{
        let f = 0;
        for(let i of cartData){
            if(i.itemid === x.id)
            {
                f = 1;
                const currItem = doc(itemref, i.id);
                await updateDoc(currItem, {
                    quantity : quantity+1,
                })
                console.log("UPDATE IN FIREBASE");
            }
        }
        if(f === 0){
            await addDoc(itemref, {
                itemid : x.id,
                quantity : 1,
            });
        }
    }

    const updateDocInFireDecrement = async ()=>{
        for(let i of cartData){
            if(i.itemid === x.id)
            {
                const currItem = await doc(itemref, i.id);
                await updateDoc(currItem, {
                    quantity : quantity-1,
                })
            }
        }
    }

    const filterDataInFire = async()=>{
        for(let i of cartData){
            const currItem = doc(itemref, i.id);
            if(i.quantity === 0) 
                await deleteDoc(currItem);
        
        }
    }
    const increment = (event)=>{
        event.preventDefault();
        if(loggedin === false)
        {
            navigate('/login');
            console.log("not logged in");
            return;
        }

       
        let search = basket.find((y)=>y.id === x.id);
       // let search = cartData.find((y)=>y.itemid === x.id);
        if(search === undefined){
            basket.push({
                id : x.id,
                item : 1,
            })
            console.log("push");
            setQuantity(1);
        }
        else{
            search.item += 1;
            console.log("add");
            setQuantity(search.item);
        }
        updateDocInFireIncrement();
        dispatch(cartItemActions.add());
       // update();
    }

    const decrement = (event)=>{
        event.preventDefault();
        if(loggedin === false)
        {
            navigate('/login');
            console.log("not logge in");
            return;
        }
        let search = basket.find((y)=>y.id === x.id);
        //let search = cartData.find((y)=>y.itemid === x.id);
        if(search!== undefined && search.item !== 0){
            search.item -= 1;

            
            updateDocInFireDecrement();
            filterDataInFire();

            dispatch(cartItemActions.subtract());
            setQuantity(search.item);
            basket = basket.filter((x)=>x.item!==0);
        }
        else    return;
        
        
        //update();
    }    
    return (
        <Link id = "d-12" to = {`/products/${x.id}`} className={classes.col_4} key = {x.id}>
			<div className = {classes.col_4_1}>
                <img src={require(`./${x.imagesrc}`)}/>
				<h4>{x.name}</h4>
				<p>$ {x.price*(quantity === 0?1 : quantity)}</p>
			</div>
			<div className = {classes.col_4_2}>
                <FontAwesomeIcon icon={faMinus} style = {{color:"red"}} onClick = {decrement}/>
                <div className={classes.quantity} style={{fontSize:"1.2rem"}}>{quantity}</div>
                <FontAwesomeIcon icon={faPlus} style = {{color:"green"}} onClick = {increment}/>
			</div>
		</Link>
    )
}

export default SingleProduct