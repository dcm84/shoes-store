import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CartWidget() {
  const items = useSelector(state => state.catalogCart.items);

  let itemsCount = 0;
  for (let value of Object.values(items)) {
    itemsCount += value.quantity;
  }

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const navigate = useNavigate();

  return (
    <div className="header-controls-pic header-controls-cart" onClick={() => { navigate("/cart.html"); }}>
      {
        itemsCount > 0 &&
        <>
          <div className="header-controls-cart-full">{itemsCount}</div>
          <div className="header-controls-cart-menu"></div>
        </>
      }
    </div>
  )
}

export default CartWidget;



