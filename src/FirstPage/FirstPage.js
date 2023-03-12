import Features from './Features';
import Products from './Products';
import HomePage from './HomePage';
import Premium from './Premium';
import { Outlet } from 'react-router-dom';
import Testimonial from './Testimonial';
import Footer from '../Footer';
const FirstPage = ()=>{
    let prdtData = [
		{
			id : 'p1',
			imagesrc : 'images/product-1.jpg',
			name : 'Red Shirt',
			price : 50, 
		},

		{
			id : 'p2',
			imagesrc : 'images/product-2.jpg',
			name : 'Sparx Sports Shoe',
			price : 56, 
		},

		{
			id : 'p3',
			imagesrc : 'images/product-3.jpg',
			name : 'Black Track',
			price : 30, 
		},

		{
			id : 'p4',
			imagesrc : 'images/product-4.jpg',
			name : 'Puma blue T-shirt',
			price : 43, 
		},

		{
			id : 'p5',
			imagesrc : 'images/product-5.jpg',
			name : 'Nike sneakers',
			price : 150, 
		},

		{
			id : 'p6',
			imagesrc : 'images/product-6.jpg',
			name : 'Puma Black T-shirt',
			price : 34,
		},

		{
			id : 'p7',
			imagesrc : 'images/product-7.jpg',
			name : 'HRX socks',
			price : 12,
		},

		{
			id : 'p8',
			imagesrc : 'images/product-8.jpg',
			name : "Fossil Men's wrist watch",
			price : 135,
		},

		{
			id : 'p9',
			imagesrc : 'images/product-9.jpg',
			name : 'Chamba wrist watch',
			price : 70,
		},

		{
			id : 'p10',
			imagesrc : 'images/product-10.jpg',
			name : 'Sparx football boot',
			price : 90,
		},

		{
			id : 'p11',
			imagesrc : 'images/product-11.jpg',
			name : 'Jampa Sneakers',
			price : 40,
		},

		{
			id : 'p12',
			imagesrc : 'images/product-12.jpg',
			name : 'Black track',
			price : 20,
		}
	];
    return (
        <>
          <HomePage></HomePage>
          <Features></Features>
          <Products prdt = {prdtData.slice(0, 8)}></Products>
          <Premium></Premium>
		  <Testimonial/>
		  <Footer/>
		  
        </>
    )
}
export default FirstPage