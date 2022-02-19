import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { setSearch, setSearchField } from '../../store/slices/catalogSearchSlice';
import {
  useSearchParams,
  useNavigate
} from "react-router-dom";


function Search() {
  const { searchField } = useSelector(state => state.catalogSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  useEffect(() => {
    let search = searchParams.get("search");
    if (search) {
      dispatch(setSearchField(search));
      dispatch(setSearch(search));
    }
  }, [searchParams]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(setSearchField(value));
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchField === "") {
      searchParams.delete("search");
      navigate('/catalog.html');
      return;
    }

    let search = searchParams.get("search");
    if (!search) {
      searchParams.append("search", searchField);
    }
    else searchParams.set("search", searchField);

    navigate('/catalog.html?' + searchParams.toString());
  }

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input name="searchField" className="form-control" placeholder="Поиск"
        onChange={handleChange}
        value={searchField}
      />
    </form>

  )
}

export default Search;



