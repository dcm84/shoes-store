import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadItems } from '../../api/catalogApi';
import { Link, useLocation } from "react-router-dom";
import { cleanItems } from '../../store/slices/catalogItemsSlice';

function Items() {
  const { status, noMoreItems, items } = useSelector(state => state.catalogItems);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    //обновляем товары, если сменился url 
    dispatch(cleanItems());
    dispatch(loadItems());
  }, [location]);

  return (
    <>
      {
        status === "success" && items &&
        <div className="row">
          {
            items.map(o => (
              <div className="col-4" key={o.id}>
                <div className="card catalog-item-card">
                  <div className="crop">
                    <img src={o.images[0]}
                      className="card-img-top img-fluid" alt={o.title} />
                  </div>
                  <div className="card-body">
                    <p className="card-text">{o.title}</p>
                    <p className="card-text">{o.price} руб.</p>
                    <Link to={"/catalog/" + o.id + ".html"} className="btn btn-outline-primary">Заказать</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      }
      {
        status === "success" && !items.length &&
        <p>К сожалению, такой обуви у нас нет!</p>
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
        status === "error" &&
        <> Ошибка загрузки товаров! </>
      }
      {
        !noMoreItems &&
        <div className="text-center">
          <button className="btn btn-outline-primary" disabled={status == "pending" ? "disabled" : ""}
            onClick={() => { dispatch(loadItems()) }}>Загрузить ещё</button>
        </div>
      }

    </>
  )
}

export default Items;



