import CartContextProvider from './store/shopping_cart.jsx';
import Product from './components/Product.jsx'
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';



function App() {


  return (
    <CartContextProvider> 
      <Header
        // cart={shoppingCart}
        // onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />  {/* component compostion avoid prop drilling*/}
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
