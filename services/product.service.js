const productModel = require('../models/product.model');  // Import the model directly

class productService {
    create = async (productName, brand, rating, productImage, color, productPrice, discount, percentage, productDescription, productColor, category) => {
        try {
            const product = new productModel({
                productName,
                brand,
                rating,
                productImage,
                color,
                productPrice,
                discount,
                percentage,
                productDescription,
                productColor,  // Ensure field name matches the schema
                category
            });
            const result = await product.save();  // Await the save operation
            return result;
        } catch (error) {
            console.error("Error in createProductDoc:", error);
            throw error;
        }
    }

    getByCategory = async (categoryName) => {
        try {
            return await productModel.find({ category: { $regex: new RegExp(categoryName, 'i') } });
        } catch (error) {
            console.error("Error in getProductsByCategory:", error);
            throw error;
        }
    }

    getByName = async (productName) => {
        try {
            return await productModel.findOne({ productName: { $regex: new RegExp(`^${productName}$`, 'i') } })
        } catch (error) {
            console.error("Error in getProductByName:", error);
            throw error;
        }
    }

    update = async (productId, productName, brand, rating, productImage, color, productPrice, discount, percentage, productDescription, productColor, category) => {
        try {
            const updateData = {

                productName,
                brand,
                rating,
                color,
                productPrice,
                discount,
                percentage,
                productDescription,
                productColor,
                category
            };
            if (productImage) updateData.productImage = productImage;
            return await productModel.findByIdAndUpdate(productId, updateData, { new: true }); // Add { new: true } option
        } catch (error) {
            console.error("Error in updateProduct:", error);
            throw error;
        }
    }

    delete = async (id) => {
        try {
            return await productModel.findOneAndDelete(id);
        } catch (error) {
            console.error("Error in Product delete:", error);
            throw error;
        }
    }
}



module.exports = productService;
