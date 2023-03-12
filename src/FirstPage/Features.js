import classes from '../HomePage.module.css';
const Features = ()=>{
    return (
    <div className = {classes.categories}>
		<div className = {classes.small_container}>
			<div className = {classes.row}>
                <div className = {classes.col_3}>
                    <img src="images/category-1.jpg"/>
                </div>
                <div className = {classes.col_3}>
                    <img src="images/category-2.jpg"/>
                </div>
                <div className = {classes.col_3}>
                    <img src="images/category-3.jpg"/>
                </div>
		    </div>
		</div>
	</div>
    )
}

export default Features;