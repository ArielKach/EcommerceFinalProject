import {Route, Routes} from "react-router-dom";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import {Fragment} from "react";

function App() {
    return (
        <Fragment>
            <Navbar/>
            <Routes>
                <Route path="/product/:productId" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Fragment>
    );
}

export default App;
