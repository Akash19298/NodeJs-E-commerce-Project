let Validator = {};

Validator.validateProductId = (productId) => {
    if (productId.length != 24) {
        //console.log("Error in Product Id")
        let err = new Error("Error in Product Id");
        err.status = 406;
        throw err;
    }
}

module.exports = Validator;