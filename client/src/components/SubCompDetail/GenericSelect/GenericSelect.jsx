

const GenericSelect = ({ items, functionProp, name, itemText }) => {

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    console.log('soy el valor ',selectedValue)
    functionProp(selectedValue)
   
  };

  return (
    <div>
      <select onChange={(event) => handleSelectChange(event)}>
        <option value=''>
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
