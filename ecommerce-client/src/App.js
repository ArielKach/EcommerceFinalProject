import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Fragment } from 'react';
import Register from './components/Register/Register';
import { TokenContext, UserContext } from './context/TokenContext';
import { ToastContainer } from 'react-toastify';
import CategoryProducts from './pages/CategoryProducts/CategoryProducts';
import Admin from "./pages/Admin/Admin";
import Order from './pages/Order/Order';


function App() {
	return (
		<Fragment>
			<ToastContainer />

			<UserContext.Provider value={{ name: 'default' }}>
				<TokenContext.Provider value={() => {}}>
					<Navbar />
					<Routes>
						<Route path='/product/:productId' element={<Product />} />
						<Route path='/category/:categoryName' element={<CategoryProducts />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/login' element={<Register isRegister={false} />} />
						<Route path='/register' element={<Register />} />
						<Route path='/' element={<Home />} />
                        <Route path='/admin' element={<Admin/>}></Route>
						<Route path='/order' element={<Order/>}></Route>
					</Routes>
				</TokenContext.Provider>
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
