import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { changeCartField } from './Slices/catalogCartSlice';
import { removeFromCart, sendOrder } from '../../api/catalogApi';

function Cart() {
  const { status, items, phone, address, accepted } = useSelector(state => state.catalogCart);
  const dispatch = useDispatch();

  let hasItems = Object.values(items).length > 0;
  let totalPrice = 0;
  let row = 0;

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(changeCartField({ name, value }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(sendOrder());
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {
          hasItems &&
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(items).map((itemData) => {
                  let item = itemData[1];
                  let key = itemData[0];
                  totalPrice += item.price * item.quantity;
                  row++;
                  return (
                    <tr key={key}>
                      <td scope="row">{row}</td>
                      <td><Link to={"/catalog/" + item.id + ".html"}>{item.title}</Link></td>
                      <td>{item.size}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.quantity}</td>
                      <td><button className="btn btn-outline-danger btn-sm" onClick={() => { dispatch(removeFromCart(key)) }}>Удалить</button></td>
                    </tr>
                  )
                })
              }
              <tr>
                <td colSpan="5" className="text-right">Общая стоимость</td>
                <td>{totalPrice} руб.</td>
              </tr>
            </tbody>
          </table>
        }
        {
          status === "pending" &&
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        }
        {
          status !== "success" && !hasItems &&
          <p>В Вашей корзине пока нет товаров!</p>
        }
        {
          status === "success" && !hasItems &&
          <p>Спасибо за Ваш заказ!</p>
        }
        {
          status === "error" &&
          <p>Произошла ошибка при оформлении заказа!</p>
        }

      </section>
      {
        hasItems &&
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card card-cart">
            <form className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control" id="phone" placeholder="Ваш телефон"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control" id="address" placeholder="Адрес доставки"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group form-check">

                <input
                  type="checkbox" className="form-check-input" id="agreement"
                  name="accepted"
                  value={accepted}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              {
                phone && address && accepted &&
                <button type="submit" className="btn btn-outline-secondary"
                  onClick={handleSubmit}
                >Оформить</button>
              }
              {
                (!phone || !address || !accepted) &&
                <button type="submit" className="btn btn-outline-secondary" disabled>Оформить</button>
              }
            </form>
          </div>
        </section>
      }
    </>


  )
}

export default Cart;



