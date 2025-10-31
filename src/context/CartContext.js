import { createContext, useState } from 'react';

const CartContext = createContext(null);

function ContextProvider({ children })
{
	const [cart, setCart] = useState([]);

	function addToCart(product) { setCart((prevCart) => [...prevCart, product]); }
	function removeFromCart(productId) { setCart((prevCart) => prevCart.filter((item) => item.id !== productId)); }
	function clearCart() { setCart([]); }
	
	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
			{children}
		</CartContext.Provider>
	);
}

export { CartContext, ContextProvider };