import classes from '../HomePage.module.css';
import { Link } from 'react-router-dom';
const Premium = ()=>{
    return (
        <div className={classes.offer}>
            <div className={classes.small_container}>
                <div className={classes.row}>
                    <div className={classes.col_2}>
                        <img src="images/ultra.png" class="offer-img"/>
                    </div>
                    <div className={classes.col_2}>
                        <p>Exclusively Available on RedStore</p>
                        <h1>Apple Watch Ultra</h1>
                        <small>The most rugged and capable Apple Watch ever, designed for exploration, adventure, and endurance.With a 49mm aerospace-grade titanium case extra-long battery life.</small>
                        <br></br>
                        <Link to = "/products/premium" className={classes.btn}>Buy Now &#8594;</Link>
                    </div>
                </div>
            </div>
	    </div>
    )
}
export default Premium;