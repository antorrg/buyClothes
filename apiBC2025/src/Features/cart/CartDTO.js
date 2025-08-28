export class CartDTO {
    static parser(d){
        return {
            id: d.id,
            productId: d.productId,
            productVariantId: d.productVariantId,
            userId: d.userId,
            quantity:d.quantity,
        }
    }
}