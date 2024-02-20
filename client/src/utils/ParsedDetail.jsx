

const productoOrden1 = (data)=>{
    
let prod= data.Product1s.find(producto => producto.order === 1);
return prod;
}

export default productoOrden1