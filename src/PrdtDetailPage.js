import React from "react";
import { useParams } from "react-router-dom"
import Header from "./Header";
import PrdtDetailDesc from "./PrdtDetailDesc";
import classes from './HomePage.module.css'
import Footer from "./Footer";
import { prdtDataWithPremium } from "./ProductsData";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";
const PrdtDetailPage = ()=>{
    const params = useParams();/*THIS IS USED TO FETCH THE DATA FROM THAT LINK LIKE ID */
    let prdtData = prdtDataWithPremium.filter((x)=>x.id!=="premium");
    const currPrdt = prdtData.find((x)=>x.id === params.prdtid)
    console.log(params);
    const stdata = prdtData.slice(0, 4);
    const helper = ()=>{
        console.log("helper called");
       // window.location.reload(true);
    }
    return (
        <>
            <Header></Header>
            <PrdtDetailDesc id2 = {params.prdtid} prdtname = {currPrdt.name} helpfn = {helper}/>
            <div className={classes.small_container}>
                <div className={classes.row_2}>
                    <h2>Related Products</h2>
                    <Link to = "/products" className={classes.btn}>View More &#8594;</Link>
                </div>
	        </div>
            <div className={classes.row} id="itemcontainer"style={{margin:"20px"}}>
                {stdata.map((x)=>{
                    return (
                    <Link to = {`/products/${x.id}`} className={classes.col_4} >
                        <img src={require(`./${x.imagesrc}`)}/>
                        <h4>{x.name}</h4>
                        <p>$ {x.price}</p>
                    </Link>  
                    )
                })}
            </div>
			<Footer></Footer>
        </>

    )
}
export default PrdtDetailPage