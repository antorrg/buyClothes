

class GeneralProductRepository {
    constructor(Model1, Model2,){
        this.Model1 = Model1;
        this.Model2 = Model2;
    }
}

const ivaTaxes = (price, taxValue)=>{
    const taxDecimal = taxValue / 100;
    const amountTax = price * taxDecimal;
    const parsedAmount = price - amountTax;
    return {
        price: parsedAmount,
        tax : amountTax,
    }

}