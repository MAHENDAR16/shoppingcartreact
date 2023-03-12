import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ProductDisplay from './ProductDisplay';

const SecondPage = ()=>{
    
    return (
        <>
		    <Header></Header>
		    <ProductDisplay/>
			
			<Footer/>
	    </>
    )
}
export default SecondPage