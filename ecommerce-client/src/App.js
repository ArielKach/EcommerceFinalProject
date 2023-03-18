import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Fragment, useState } from 'react';
import Register from './components/Register/Register';
import { UserContext } from './context/TokenContext';
import { ToastContainer } from 'react-toastify';
import CategoryProducts from './pages/CategoryProducts/CategoryProducts';

function App() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const updateUser = (value) => setUser(value);

	return (
		<Fragment>
			<ToastContainer />

			<UserContext.Provider value={{ user, updateUser }}>
				<Navbar />
				<Routes>
					<Route path='/product/:productId' element={<Product />} />
					<Route path='/category/:categoryName' element={<CategoryProducts />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/login' element={<Register isRegister={false} updateUser={updateUser} />} />
					<Route path='/register' element={<Register updateUser={updateUser} />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
