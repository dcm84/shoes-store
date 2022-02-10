import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setSearchField } from './Slices/catalogSearchSlice';

function Search() {
  const { searchField } = useSelector(state => state.catalogSearch);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(setSearchField(value));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(setSearch(searchField));
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



