import React, { useEffect, useState } from 'react'
import { db } from './firebase-config/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import CheckBackend from './CheckBackend';



let basket = []
let itemref, basketFire, fireDat = [];
const getValue = async (username)=>{
    itemref = collection(db, `${username}`);
    basketFire = await getDocs(itemref);
    fireDat = basketFire.docs.map((doc)=>({
        ...doc.data(),
        id : doc.id,
    }))
    //setFireData(fireDat)
    basket = fireDat;
    basket = basket.filter((x)=>x.itemid!=='tamount')
    
   // return fireData;
  }
  getValue('mahe')
  console.log(basket)
export default basket;