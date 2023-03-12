import classes from '../HomePage.module.css';
import {Link} from 'react-router-dom';

const Products = (props)=>{
    return (
        <div className = {classes.small_container}>
            <h2 className={classes.title}>Featured Products</h2>
            <div className = {classes.row}>
                {props.prdt.map((x)=>{
                    return (
                        <Link to = {`/products/${x.id}`} className={classes.col_4} >
                            <img src={x.imagesrc}/>
                            <h4>{x.name}</h4>
                            <p>$ {x.price}</p>
                        </Link>  
                    )
                })}
            </div>
        </div>
    )
}

export default Products