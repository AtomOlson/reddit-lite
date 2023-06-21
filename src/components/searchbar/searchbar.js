import React from "react";
import { isActive, setActive, getSearchTerm, setSearchTerm } from "./searchbarSlice";
import { useSelector, useDispatch } from "react-redux";
import icon from '../../assets/search-icon.png';

export default function Searchbar() {
  const active = useSelector(isActive);
  const searchTerm = useSelector(getSearchTerm);
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  function handleFocus(e) {
    dispatch(setActive('search_active'))
  }

  function handleBlur(e) {
    dispatch(setActive('search_inactive'))
  }
  
  return (
    <div className={'searchOutline ' + active}>
      <img className={'searchIcon ' + active}
          src={icon} 
          alt=""
          />
      <input className={'searchBar ' + active}
            type="text"
            placeholder="Search Reddit"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={searchTerm} 
            />
    </div>
  )
}