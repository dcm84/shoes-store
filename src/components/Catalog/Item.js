import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { setLessItem, setMoreItem, setItemSelectedSize, cleanItemState } from '../../store/slices/catalogItemSlice';
import { useEffect } from 'react';
import { loadItem } from '../../api/catalogApi';
import { addCartItems, setCartStatus } from '../../store/slices/catalogCartSlice';

import Page404 from '../StaticPages/Page404';

function Item() {
  const { status, item, quantity, selectedSize } = useSelector(state => state.catalogItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  let itemId = Number(params.id.replace(/[^0-9]+/, ''));
  let avaibleSizes = item ? item.sizes.filter(sizeObj => sizeObj.avalible) : [];


  useEffect(() => {
    dispatch(cleanItemState());
    dispatch(loadItem(itemId));
  }, []);

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(addCartItems({
      id: itemId,
      title: item.title,
      size: selectedSize,
      price: item.price,
      quantity: quantity
    }));
    dispatch(setCartStatus("idle"));

    navigate("/cart.html");
  }

  return (
    <>
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
        status === "error" &&
        <Page404 />
      }
      {
        status === "success" &&
        <section className="catalog-item">
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item.images[0]}
                className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              {
                avaibleSizes &&
                <>
                  <div className="text-center">
                    <p>Размеры в наличии:
                      {
                        avaibleSizes.map(sizeObj => (
                          <span
                            className={sizeObj.size === selectedSize ? "catalog-item-size selected" : "catalog-item-size"}
                            key={sizeObj.size}
                            onClick={() => dispatch(setItemSelectedSize(sizeObj.size))}
                          >{sizeObj.size}</span>
                        ))
                      }
                    </p>
                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={() => dispatch(setLessItem())}>-</button>
                      <span className="btn btn-outline-primary">{quantity}</span>
                      <button className="btn btn-secondary" onClick={() => dispatch(setMoreItem())}>+</button>
                    </span>
                    </p>
                  </div>
                  {
                    selectedSize &&
                    <button className="btn btn-danger btn-block btn-lg" onClick={handleSubmit}>В корзину</button>
                  }
                  {
                    !selectedSize &&
                    <button className="btn btn-danger btn-block btn-lg" disabled>В корзину</button>
                  }
                </>


              }
            </div>
          </div>
        </section>

      }
    </>
  )
}

export default Item;



