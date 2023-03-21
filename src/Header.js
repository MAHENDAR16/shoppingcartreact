import classes from './HomePage.module.css';
import {Link, Navigate, NavLink, useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';
import store from './storefiles/globalstore';
import { authActions } from './storefiles/authenticated';
import { useSelector, useDispatch } from 'react-redux';
import cartSlice from './storefiles/cartItems';
import { cartItemActions } from './storefiles/cartItems';


const Header = ()=>{
	const itemCount = useSelector((state)=>state.cartItem.totalCartItem);
	let isLogin = useSelector((state)=>state.auth.isLogin);
	const dispatch = useDispatch();
	const username = useSelector((state)=>state.auth.username);
	
	
	const [toggleMenu, setToggleMenu] = useState(false);
	const toggleHandler = ()=>{
		setToggleMenu((prev) => !prev);
	}
	const s = useNavigate();
	const cartHandler = ()=>{
		s('/cart');
	}

	const logoutUser = ()=>{
		dispatch(authActions.logout());
		dispatch(cartItemActions.makeZero());
		console.log(isLogin);
		s('/');
	}
    return (
        <div className={classes.container}>
			<div className={classes.navbar}>
				<div className={classes.logo}>
					<img src={require('./images/logo.png')} width="125px" alt='some'/>
				</div>
				<nav>
					{!toggleMenu &&
					<ul id = "menuitems">
						<li><NavLink to="/" className={({isActive})=>isActive?classes.active:undefined}>Home</NavLink></li>
						<li><NavLink to="/products" className={({isActive})=>isActive?classes.active:undefined}>Products</NavLink></li>
						
						<li><NavLink to="/contact" className={({isActive})=>isActive?classes.active:undefined}>Contact</NavLink></li>
						{ isLogin && <li><a>{username}</a></li>}

						{ isLogin && <li onClick={logoutUser}>Logout</li>}
						
						{ !isLogin && <li><NavLink to="/login" className={({isActive})=>isActive?classes.active:undefined}>Login</NavLink></li>}
					</ul>
					}
					{toggleMenu && 
						<ul id = "menuitems" className={classes.active}>
							<li><NavLink to="/" className={({isActive})=>isActive?classes.active:undefined}>Home</NavLink></li>
							<li><NavLink to="/products" className={({isActive})=>isActive?classes.active:undefined}>Products</NavLink></li>
							
							<li><NavLink to="/contact" className={({isActive})=>isActive?classes.active:undefined}>Contact</NavLink></li>
							{ isLogin && <li><a>{username}</a></li>}
							{ isLogin && <li onClick={logoutUser}>Logout</li>}
						
							{ !isLogin && <li><NavLink to="/login" className={({isActive})=>isActive?classes.active:undefined}>Login</NavLink></li>}
						</ul>
					}
				</nav>
				<div className = {classes.cart}>
					<img src={require('./images/cart.png')} onClick = {cartHandler} width="45px" height="45px" style = {{cursor:'pointer'}}/>
					<div className={classes.carth} id = "cartTotal">{itemCount}</div>
				</div>
				<img src={require('./images/menu.png')} className = {classes.menu_icon} onClick = {toggleHandler}></img>
				
				</div>	
			</div>	
    )
}
export default Header;
