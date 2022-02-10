import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadHits } from '../../api/catalogApi';
import { Link } from "react-router-dom";

function Hits() {
  const { status, hits } = useSelector(state => state.catalogHits);
  const dispatch = useDispatch();

  //при первом обращении загружаем список услуг через API
  useEffect(() => { dispatch(loadHits()); }, []);

  return (
    <>
      {
        status == "pending" &&
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      }
      {
        status == "error" &&
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          Произошла ошибка!
        </section>
      }
      {
        status == "success" && hits &&
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="row">
            {
              hits.map(o => (
                <div className="col-4" key={o.id}>
                  <div className="card">
                    <img src={o.images[0]}
                      className="card-img-top img-fluid" alt={o.title} />
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
        </section>
      }
    </>
  )
}

export default Hits;



