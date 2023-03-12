//import logo from './logo.svg';
import ContactEle from './ContactEle';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import FirstPage from './FirstPage/FirstPage.js';
import SecondPage from './SecondPage';
import ErrorPage from './ErrorPage';
import Account from './LoginLogout/Account';
import Cart from './Cart';
import RegisterForm from './LoginLogout/RegisterForm';
import PrdtDetailPage from './PrdtDetailPage';
function App() {

	const router = createBrowserRouter([
		{path:'/', element : <FirstPage/>,errorElement:<ErrorPage/>}, 
		/*{path : '/products', element : <SecondPage/>, children :[
			{path:'/products/:prdtid', element:<PrdtDetailPage/>},
		],
		},*/
		{path : '/products', element : <SecondPage/>, errorElement : <ErrorPage/>},
		{path : '/login', element : <Account/>},
		{path : '/cart', element : <Cart/>},
		{path : '/products/:prdtid', element : <PrdtDetailPage/>, errorElement:<ErrorPage/>},			
		{path:'/register', element : <RegisterForm/>},
		{path : '/contact', element : <ContactEle/>, errorElement : <ErrorPage/>},
	]);

  

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
