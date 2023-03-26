

import React, { useEffect, useState } from 'react'
import { db } from './firebase-config/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import CheckBackend from './CheckBackend';


let itemref, basketFire, fireDat = [];
/*
//export default Firebasedata
//export const cartData = fireData.splice()
const Firebasedata = ()=>{
  const [fireData, setFireData] = useState([]);
  const getValue = async (username)=>{
    itemref = collection(db, `${username}`);
    basketFire = await getDocs(itemref);
    fireDat = basketFire.docs.map((doc)=>({
        ...doc.data(),
        id : doc.id,
    }))
    setFireData(fireDat)
    console.log(fireData)
    return fireData;
  }
  useEffect(()=>{getValue('mahe')}, []);
  return (
    <CheckBackend cartData = {fireData} msg = "for check"/>
  )

}
export default Firebasedata;*/

let fireData = [];

 
  const getValue = async (username)=>{
    itemref = collection(db, `${username}`);
    basketFire = await getDocs(itemref);
    fireDat = basketFire.docs.map((doc)=>({
        ...doc.data(),
        id : doc.id,
    }))
    //setFireData(fireDat)
    fireData = fireDat;
    console.log(fireData)
   // return fireData;
  }
  getValue('mahe')

export const cartData = fireData.splice(0, fireData.length);
