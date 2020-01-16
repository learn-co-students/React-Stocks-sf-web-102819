import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={false} onChange={(event) => {props.handleAlphabetically(event)}}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={false} onChange={(event) => {props.handlePrice(event)}}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event)=> {props.handleFilter(event)}}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
