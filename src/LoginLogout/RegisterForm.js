import classes from '../HomePage.module.css';
import Header from '../Header';
import Footer from '../Footer';
import { db } from '../firebase-config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useRef } from 'react';
import emailjs from 'emailjs-com';
const RegisterForm = ()=>{
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const form = useRef();
    const registerHandler = async(e)=>{
        e.preventDefault();
        const userRef = collection(db, "userDetails");
        await addDoc(userRef, {
            username : name,
            password : pass, 
            email : email,
        })
        
        /*TO SEND AUTH MAIL USING EMAILJS */
        /*e.targer indicates the values to be copied to that template */
        emailjs.sendForm('service_r2a4oer', 'template_761box9', e.target, 'PLCDI4M9Ima-03GRL')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            e.target.reset();
        });


        setName('');
        setEmail('');
        setPass('');
    }
    return (
        <div className={classes.mainaccount}>
        <Header/>
        <div className={classes.account_page}>
            <div className={classes.container}>
                <div className={classes.row}>
                    <div className={classes.col_2}>
                        <img src="images/image1.png" width="100%"/>
                    </div>	
                    <div className={classes.col_2}>
                        <div className={classes.form_container}>
                            <span>Register</span>

                            <form ref={form} onSubmit = {registerHandler}>
                                <input type="text"  placeholder="Enter your name" value={name} 
                                name = "to_name"
                                onChange={(e)=>setName(e.target.value)}/>

                                <input type="email" name="to_mail" placeholder="Enter your email" value={email}
                                onChange = {(e)=>setEmail(e.target.value)}/>

                                <input type="password" name="" placeholder="Enter your password" value={pass}
                                onChange={(e)=>setPass(e.target.value)}/>
                                <button type="submit" className={classes.btnf}>Register</button>
                                
                                <Link to = '/login'><button className={classes.btnf}>Login</button></Link>
                                
                            </form>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>   
    </div>
    
    
    )
}
export default RegisterForm;