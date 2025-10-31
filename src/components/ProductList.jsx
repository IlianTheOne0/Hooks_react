import { useContext, useMemo, useState } from 'react';

import productsData from '../assets/data/products.json';

import { CartContext } from '../context/CartContext';

import '../styles/list.css';

function ProductList()
{
	const { cart, addToCart } = useContext(CartContext);
	
	const [showInStock, setShowInStock] = useState(false);
    const [search, setSearch] = useState('');

	const productsToDisplay = useMemo
	(
		() => 
		{
			return productsData.products
				.filter(product => { return showInStock ? product.inStock : true; })
				.filter(product => { return product.name.toLowerCase().includes(search.toLowerCase()); })
				.filter(product => !cart.some(cartItem => cartItem.id === product.id));
		}, [cart, showInStock, search]
	)

	const onAddToCart = (productId) =>
	{
		const product = productsData.products.find(product => product.id === productId);
		if (product) { if (!product.inStock) { alert("Product is out of stock"); return; } addToCart(product); }
	};

	const handleClearFilter = () => { setShowInStock(false); setSearch(''); }

	return (
		<div className='list-container'>
			<h2 className="list-title">Product List</h2>

			<div className="filter-controls">
				<label><input type="checkbox" id="in-stock-filter" checked={showInStock} onChange={event => setShowInStock(event.target.checked)} />Show In-Stock Only</label>
				<label><input type="search" id="search-bar" placeholder="Search Products..." value={search} onChange={event => setSearch(event.target.value)} /></label>

				<button className='filter-clear' onClick={handleClearFilter}>Clear Filter</button>
			</div>

			<ul className="list">
				{
					productsToDisplay.map
					(
						product =>
						(
							<li key={product.id} className={`list-item ${product.inStock ? '' : 'out-of-stock'}`}>
								{product.name}
								<div>${product.price}</div>
								<button className="item-button add-to-cart" onClick={() => onAddToCart(product.id)}>Add to Cart</button>
							</li>
						)
					)
				}
			</ul>
		</div>
	);
}

export default ProductList;