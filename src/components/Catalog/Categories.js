import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../../api/catalogApi';
import { setActiveCategory } from './Slices/catalogCategoriesSlice';

function Categories() {
  const { status, active, categories } = useSelector(state => state.catalogCategories);
  const dispatch = useDispatch();

  //при первом обращении загружаем список услуг через API
  useEffect(() => { dispatch(loadCategories()); }, []);

  return (
    <>
      {
        status == "pending" &&
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
      {
        status == "error" &&
        <>Произошла ошибка!</>
      }
      {
        status == "success" && categories &&
        <ul className="catalog-categories nav justify-content-center">
          {
            categories.map(o => (
              <li className="nav-item" key={o.id}>
                <a
                  className={o.id === active ? "nav-link active" : "nav-link"}
                  onClick={(evt) => { evt.preventDefault(); dispatch(setActiveCategory(o.id)); }} href="#"
                >{o.title}</a>
              </li>
            ))
          }
        </ul>
      }
    </>
  )
}

export default Categories;



