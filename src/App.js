import { ContextProvider } from "./context/CartContext";

import './styles/App.css';

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App()
{
	return (
		<div className="App">
			<ContextProvider>
				<ProductList/>
				<Cart/>
			</ContextProvider>
		</div>
	);
}

export default App;