import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { loadCategories } from '../../api/catalogApi';
import { setActiveCategory } from '../../store/slices/catalogCategoriesSlice';
import { setSearch, setSearchField } from '../../store/slices/catalogSearchSlice';

function Categories() {
  const { status, active, categories } = useSelector(state => state.catalogCategories);
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let location = useLocation();

  //при первом обращении загружаем список услуг через API
  useEffect(() => {
    dispatch(loadCategories());
  }, []);


  useEffect(() => {
    let category = searchParams.get("category");
    dispatch(setActiveCategory(category ? category : 0));

    let search = searchParams.get("search");
    if (!search) {
      dispatch(setSearchField(""));
      dispatch(setSearch(""));
    }
  }, [searchParams]);

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
                <Link
                  className={active == o.id ? "nav-link active" : "nav-link"}
                  to={`${location.pathname}?category=${o.id}`}
                >
                  {o.title}
                </Link>
              </li>
            ))
          }
        </ul>
      }
    </>
  )
}

export default Categories;



