
import React, { useState } from "react";
//import images from './images';
import classes from '../HomePage.module.css';
import {Link, useNavigate, NavLink} from 'react-router-dom';
import store from '../storefiles/globalstore';
import { authActions } from '../storefiles/authenticated';
import { useSelector, useDispatch } from 'react-redux';
import cartSlice from '../storefiles/cartItems';
import { cartItemActions } from '../storefiles/cartItems';
const HomePage = ()=>{
	const isLogin = useSelector((state)=>state.auth.isLogin);
	const username = useSelector((state)=>state.auth.username);
	const itemCount = useSelector((state)=>state.cartItem.totalCartItem);
	const navigate = useNavigate();
	const navigateToNextPage = ()=>{
		navigate('/products');
	}
	const [toggleMenu, setToggleMenu] = useState(false);
	const toggleHandler = ()=>{
		setToggleMenu((prev) => !prev);
	}

	
	const cartHandler = ()=>{
		navigate('/cart');
	}

	const logoutUser = (e)=>{
		e.preventDefault();
		authActions.logout();
		window.location.reload();
		console.log(isLogin);
		console.log("logged out");
	}
	
    return (
        <div className={classes.header}>
		<div className = {classes.container}>
			<div className={classes.navbar}>
				<div className = {classes.logo}>
					<img src="images/logo.png" width="125px"/>
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
					<img src={require('../images/cart.png')} onClick = {cartHandler} width="45px" height="45px" style = {{cursor:'pointer'}}/>
					<div className={classes.carth} id = "cartTotal">{itemCount}</div>
				</div>
				<img src="images/menu.png" className = {classes.menu_icon} onClick = {toggleHandler}></img>

				
			</div>

			<div className={classes.row}>
				<div className={classes.col_2}>
					<h1>Give Your Workout A New Style!</h1>
					<p>Success isn't always about greatness.It's about consistency and perseverance.
					</p>
					<a href="" className={classes.btn} onClick = {navigateToNextPage}>Explore Now &#8594;</a>
				</div>
				<div className={classes.col_2}>
					<img src="images/image1.png"/>
				</div>
			</div>
		</div>
	</div>
    )
}

export default HomePage;