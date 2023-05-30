const collection = require('./connection');

let product = {}

product.addProduct = async (productDetails) => {
    let productModel = await collection.getProductCollection();
    let addProduct = await productModel.create(productDetails);
    if (addProduct) {
        return addProduct;
    } else {
        let err = new Error("Something went wrong!! We will be back.");
        err.status = 500;
        throw err;
    }
}

product.getAllProducts = async () => {
    let productModel = await collection.getProductCollection();
    let productList = await productModel.find();
    if (productList) {
        return productList
    } else {
        let err = new Error("Something went wrong!! We will be back.");
        err.status = 500;
        throw err;
    }
}

product.deleteProduct = async (productId) => {
    let productModel = await collection.getProductCollection();
    let deleteProduct = await productModel.deleteOne({ _id: productId })
    if (deleteProduct) {
        return deleteProduct;
    } else {
        let err = new Error("Something went wrong!! We will be back.");
        err.status = 500;
        throw err
    }
}

product.getProductById = async (productId) => {
    let productModel = await collection.getProductCollection();
    let product = await productModel.findOne({ _id: productId });
    return product;
}

product.updateProductById = async (productId, requestBody) => {
    let productModel = await collection.getProductCollection();
    let updateProduct = await productModel.updateOne({ _id: productId }, { $set: requestBody });
    if (updateProduct) {
        return updateProduct;
    } else {
        let err = new Error("Something went wrong!! We will be back.");
        err.status = 500;
        throw err
    }
}

product.searchProductByKey = async (key) => {
    let productModel = await collection.getProductCollection();
    let searchResult = await productModel.find({
        $or: [
            {
                name: { $regex: key }
            },
            {
                category: { $regex: key }
            },
            {
                company: { $regex: key }
            },
        ]
    });
    if (searchResult) {
        return searchResult
    } else {
        let err = new Error("Something went wrong!! We will be back.");
        err.status = 500;
        throw err;
    }
}

module.exports = product;
