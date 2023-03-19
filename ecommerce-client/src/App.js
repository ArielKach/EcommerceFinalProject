import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Fragment, useEffect, useState } from 'react';
import Register from './components/Register/Register';
import { UserContext } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import CategoryProducts from './pages/CategoryProducts/CategoryProducts';
import Admin from "./pages/Admin/Admin";
import Order from './pages/Order/Order';
import { getCategories } from './utils/api';
import { CircularProgress } from '@mui/material';


function App() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const updateUser = (value) => setUser(value);
	const [categories, setCategories] = useState([])
	const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)

	const fetchCategories = async () => {
		setIsCategoriesLoading(true);
		const categories = await getCategories();
		setCategories(categories.data.map(category => category.categoryName));
		setIsCategoriesLoading(false);
	}
	useEffect(() => {
		fetchCategories();
	}, [])
	return (
		<Fragment>
			<ToastContainer />

			<UserContext.Provider value={{ user, updateUser }}>
				{!isCategoriesLoading ?
					<Fragment>
						<Navbar categories={categories} />
						<Routes>
							<Route path='/product/:productId' element={<Product />} />
							<Route path='/category/:categoryName' element={<CategoryProducts />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/login' element={<Register isRegister={false} updateUser={updateUser} />} />
							<Route path='/register' element={<Register updateUser={updateUser} />} />
							<Route path='/admin' element={<Admin />}></Route>
							<Route path='/order' element={<Order />}></Route>

							<Route path='/' element={<Home />} />
						</Routes>
					</Fragment>
					: <CircularProgress size={100} />}
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
