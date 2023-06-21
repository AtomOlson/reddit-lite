import React, { useEffect } from 'react';
import { getFilters, setFilter, isSelecting, setSelecting } from './filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Filter() {
  const filters = useSelector(getFilters);
  const selecting = useSelector(isSelecting);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSelecting(e) {
    if(selecting === 'filterSelecting') {
      dispatch(setSelecting('filterNotSelecting'));
    } else {
      dispatch(setSelecting('filterSelecting'));
    }
  }

  // Sets the filter to the button's HTML
  function handleSelect(e) {
    dispatch(setFilter(e.target.innerHTML))
    dispatch(setSelecting('filterNotSelecting'))
  }

  // Navigates to the new filter when the filter changes
  useEffect(() => {
    navigate(`/${filters[0].toLowerCase()}`)
  }, [filters, navigate])

  return (
    <div className={'filterDropdown ' + selecting}>
      <button className={'filterButton ' + selecting}
          onClick={handleSelecting}
          >
            {filters[0]}
      </button>
      {selecting === 'filterSelecting' ? filters.slice(1, 5).map(filterType => <button className={'filterButton ' + selecting} onClick={handleSelect} key={uuidv4()}>{filterType}</button>) : ''}
    </div>
  );
}
