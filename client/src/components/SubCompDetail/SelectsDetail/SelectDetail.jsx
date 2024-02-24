import style from '../styles/SubNavs.module.css'
import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getGamesForGenre } from "../../Redux/actions";


export default function SelectDetail({data}) {
  
  const onFilterGen = (event) => {
    dispatch(getGamesForGenre(event.target.value));
  };

 
  

  return (
    <div>
      <select  onChange={(event) => onFilterdata(event)}>
        <option value="All">
          {''}
          Filter by Genre{" "}
        </option>
        {genres.map((gen) => (
          <option key={gen.name} value={gen.name}>
            {gen.name}
          </option>
        ))}
      </select>
    </div>
  );
}