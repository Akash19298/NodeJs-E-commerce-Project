const collection = require('./connection');

let product = {}

product.addProduct = async (productDetails)=>{
    let productModel = await collection.getProductCollection();
    let addProduct = await productModel.create(productDetails);
    if(addProduct){
        return addProduct;
    }else{
        let err = new Error("Something went wrong!! We will be back.");
        err.status=500;
        throw err;
    }
}

product.getAllProducts = async ()=>{
    let productModel = await collection.getProductCollection();
    let productList = await productModel.find();
    if(productList){
        return productList
    }else{
        let err = new Error("Something went wrong!! We will be back.");
        err.status=500;
        throw err; 
    }
}
module.exports = product;
