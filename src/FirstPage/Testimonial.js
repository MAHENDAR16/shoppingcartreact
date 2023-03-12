import React from 'react';
import classes from '../HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
const Testimonial = ()=>{
    return (
        <div className={classes.testimonial}>
		<div className={classes.small_container}>
			<div className={classes.row}>
				<div className={classes.col_3}>
                    <FontAwesomeIcon icon={faQuoteLeft} className = {classes.quoteLeft}/>
					<p>When potential customers are researching you online, they're getting to know you through the content on your website. So understandably, many of them might be skeptical or hesitant to trust you right away.</p>
					<div className = {classes.rating}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfStroke}/>
                    </div>

					<img src="images/user-1.png"/>
					<h3>Alyah</h3>
				</div>

				<div className={classes.col_3}>
                    <FontAwesomeIcon icon={faQuoteLeft} className = {classes.quoteLeft}/>
					<p>When potential customers are researching you online, they're getting to know you through the content on your website. So understandably, many of them might be skeptical or hesitant to trust you right away.</p>
                    <div className = {classes.rating}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
					<img src="images/user-2.png"/>
					<h3>Roman Reigns</h3>
				</div>

				<div className={classes.col_3}>
                    <FontAwesomeIcon icon={faQuoteLeft} className = {classes.quoteLeft}/>
					<p>When potential customers are researching you online, they're getting to know you through the content on your website. So understandably, many of them might be skeptical or hesitant to trust you right away.</p>
					<div className = {classes.rating}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfStroke}/>
                    </div>
					<img src="images/user-3.png"/>
					<h3>Jennie</h3>
				</div>
			</div>
		</div>
	</div>
    )
}
export default Testimonial;