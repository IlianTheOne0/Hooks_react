import { useContext, useMemo } from 'react';

import { CartContext } from '../context/CartContext';

import '../styles/list.css';

function Cart()
{
	const { cart: cartItems, removeFromCart, clearCart: clearCartContext } = useContext(CartContext);

	const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price, 0), [cartItems]);

	const clearCart = () =>
	{
		clearCartContext();
	}

	return (
		<div className='list-container'>
			<h2 className="list-title">Shopping Cart</h2>
			<ul className="list">
				{
					cartItems.map
					(
						product =>
						(
							<li key={product.id} className="list-item">
								{product.name}
								<div>${product.price}</div>
								<button className="item-button remove-from-cart" onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
							</li>
						)
					)
				}
			</ul>

			<hr/>

			<div className="cart-summary">
				<div className="cart-info">
					<h3>Total: ${total}</h3>
					<p>Items in cart: {cartItems.length}</p>
				</div>

				<div className="button-group">
					<button className="pay" onClick={() => alert("Not implemented yet")}>Pay</button>
					<button className="clear-cart" onClick={clearCartContext}>Clear Cart</button>
				</div>
			</div>
		</div>
	);
}

export default Cart;