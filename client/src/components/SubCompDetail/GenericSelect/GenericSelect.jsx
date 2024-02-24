import {useDispatch}from 'react-redux'

const GenericSelect = ({ items, functionProp, name, itemText }) => {
 const dispatch = useDispatch()

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(functionProp(selectedValue));
   
  };

  return (
    <div>
      <select onChange={(event) => handleSelectChange(event)}>
        <option value="All">
          {itemText}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenericSelect;
