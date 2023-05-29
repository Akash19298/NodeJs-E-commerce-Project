const product = require('../model/product');

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

module.exports = productService;