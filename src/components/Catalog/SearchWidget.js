import { useSelector, useDispatch } from 'react-redux';
import { setQuickSearch, setSearchDisplay, } from '../../store/slices/catalogSearchSlice';
import { useNavigate } from 'react-router-dom';

function SearchWidget() {
  const { quickSearch, display } = useSelector(state => state.catalogSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(setQuickSearch(value));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    if (display === false) {
      dispatch(setQuickSearch(''));
      dispatch(setSearchDisplay(true));
    }
    else {
      if (quickSearch) {
        dispatch(setQuickSearch(''));
        navigate("/catalog.html?search=" + quickSearch);
      }

      dispatch(setSearchDisplay(false));
    }
  }

  return (
    <>
      <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleSubmit}></div>
      <form data-id="search-form" className={
        display ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible"
      } onSubmit={handleSubmit} >
        <input name="search" className="form-control" placeholder="Поиск" onChange={handleChange} value={quickSearch} />
      </form>
    </>
  )
}

export default SearchWidget;



