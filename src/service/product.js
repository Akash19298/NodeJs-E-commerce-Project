const product = require('../model/product');
const Validator = require('../utilities/validator');


let productService = {}

const throwError = (errorMessage, status) => {
    let err = new Error(errorMessage);
    err.status = status;
    throw err;
}

productService.addProduct = async (productDetails) => {
    try {
        let addedProduct = await product.addProduct(productDetails);
        if (addedProduct) {
            return { message: "Product Insertion Successfull!!", Product: addedProduct };
        } else {
            return { Message: "Product Insertion Failed" }
        }
    } catch (err) {
        throwError("Something went wrong!! We will be back", 404)
    }
}

productService.getAllProducts = async () => {
    try {
        let productList = await product.getAllProducts();
        if (productList.length > 0) {
            return { message: "All Listed Products:", productList }
        } else {
            return { message: "No products found!!" }
        }
    } catch (err) {
        throwError("Something went wrong!! We will be back", 404)
    }
}

productService.deleteProduct = async (productId) => {
    Validator.validateProductId(productId);
    try {
        let deletedProduct = await product.deleteProduct(productId);
        if (deletedProduct.deletedCount > 0) {
            return { message: "Product deleted!!", deletedProduct }
        } else {
            return { message: " No Product found with this id!! Please check your id." }
        }
    } catch (err) {
        throwError("Something went wrong!! We will be back", 404)
    }
}


productService.getProductById = async (productId) => {
    Validator.validateProductId(productId);
    try {
        let searchProduct = await product.getProductById(productId);
        if (searchProduct) {
            return { message: "Searched Product", searchProduct }
        } else {
            return { message: "No Product Found!!" }
        }
    } catch (err) {
        throwError("Something went wrong!! We will be back", 404)
    }
}

productService.updateProductById = async (productId, requestBody) => {
    Validator.validateProductId(productId);
    let updateProduct = await product.updateProductById(productId, requestBody);
    if (updateProduct.modifiedCount > 0 && updateProduct.matchedCount > 0) {
        return { message: "Product Updated!!", updateProduct }
    } else if (updateProduct.modifiedCount == 0 && updateProduct.matchedCount > 0) {
        return { message: "Nothing to update!!", updateProduct }
    } else {
        return { message: "No Product Found!!", updateProduct }
    }
}

productService.searchProductByKey = async(key)=>{
   let searchProduct = await product.searchProductByKey(key);
   if(searchProduct.length>0){
       return {message:"Searched Product:", searchProduct}
   }else{
     return {message:"No Results Found"}
   }
}

module.exports = productService;