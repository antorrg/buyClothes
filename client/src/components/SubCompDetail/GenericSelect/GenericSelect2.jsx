import { useState, useEffect } from "react";

const GenericSelect = ({ items, itemText, isMultiple = false, selected, onSelect }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Si se proporciona un valor seleccionado, actualiza el estado interno
    if (selected !== undefined) {
      setSelectedItems(isMultiple ? selected : [selected]);
    }
  }, [selected, isMultiple]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedItems((prevSelectedItems) => {
      if (isMultiple) {
        // Si es múltiple, toggle el valor en el array
        return prevSelectedItems.includes(selectedValue)
          ? prevSelectedItems.filter((item) => item !== selectedValue)
          : [...prevSelectedItems, selectedValue];
      } else {
        // Si no es múltiple, selecciona solo el nuevo valor
        return [selectedValue];
      }
    });

    // Llama a la función de devolución de llamada onSelect si se proporciona
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  return (
    <div>
      <select
        onChange={handleSelectChange}
        value={isMultiple ? selectedItems : selectedItems[0]}
        multiple={isMultiple}
      >
        <option value="" disabled>
          {itemText}
        </option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenericSelect;

// import style from '../styles/SubNavs.module.css'
// import {useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllGenres, getGamesForGenre } from "../../Redux/actions";


//* export default function OrderByGenre() {
//*   const dispatch = useDispatch();
// *  const genres = useSelector((state) => state.allGenres);
//*   const onFilterGen = (event) => {
//*     dispatch(getGamesForGenre(event.target.value));
//*   };

//?   useEffect(() => {
//?     dispatch(getAllGenres());
//?   }, [dispatch]);
  

//   return (
//     <div>
//      <select className={style.stylSelect} onChange={(event) => onFilterGen(event)}>
//        <option value="All">
//           {''}
//          Filter by Genre{" "}
//       </option>
//         {genres.map((gen) => (
//          <option key={gen.name} value={gen.name}>
//           {gen.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
