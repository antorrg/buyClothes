export class JsonDTO{
    static parser = (d)=>{
        return {
            id:d.id,
            productId: d.productId,
            product: d.product
        }
    }
}