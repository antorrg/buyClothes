
export const parserBoolean = (info)=>{
    if(info === true || info === 'true'){
        return true;
    }else if(info === false || info === 'false'){
        return false;
    }else{return null}
};
export const parserInteger = (info) => {
    if (typeof info === 'number' && Number.isInteger(info)) {
        return info; // Es un número entero válido
    } else if (typeof info === 'string' && /^\d+$/.test(info)) {
        return parseInt(info, 10); // Es un string que representa un número entero
    } else {
        return null; // No es un número entero válido
    }
};
export function filterData (data, isAdmin, emptyData=null){
    
    const item = isAdmin? data : data.filter(item =>item.enable===true);
    if(item.length===0 && emptyData){
        return emptyData()
    }
    return item;
  }