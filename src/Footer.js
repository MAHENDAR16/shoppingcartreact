import classes from './HomePage.module.css'

const Footer = ()=>{
    return (
        <div className={classes.footer}>
		<div class={classes.fcontainer}>
			<div class={classes.row}>
				<div className={classes.footer_col_1}>
					<h3>Download Our App</h3>	
					<p>Download App for Android and IOS mobile phones.</p>
					<div className={classes.app_logo}>
						<img src={require('./images/play-store.png')}/>
						<img src={require('./images/app-store.png')}/>
					</div>
				</div>
				<div className={classes.footer_col_2}>
					<img src={require('./images/logo-white.png')}/>
					<p>Our Purpose Is To Sustainably Make The Pleasure and Benefits of Sports Accessible to Many.</p>
				</div>
				<div className={classes.footer_col_3}>
					<h3>Useful Links</h3>
					<ul>
						<li>Coupons</li>
						<li>Blog Post</li>
						<li>Return Policy</li>
						<li>Join Affiliate</li>
					</ul>
				</div>

				<div className={classes.footer_col_4}>
					<h3>Follow Us</h3>
					<ul>
						<li>Facebook</li>
						<li>Twitter</li>
						<li>Instagram</li>
						<li>YouTube</li>
					</ul>
				</div>

			</div>

		</div>
	</div>
    )
}

export default Footer