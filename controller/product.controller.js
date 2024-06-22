const productService = require('../services/product.service');
const productServiceInstance = new productService();

const createProduct = async (req, res) => {
    try {
        const { productName, brand, rating, color, productPrice, discount, percentage, productDescription, productColor, category } = req.body;
        const productImage = req.file ? `/uploads/${req.file.filename}` : null;

        // Validate required fields !color ||, || !discount 
        if (!productName || !brand || !rating || !productImage || !productPrice || !percentage || !productDescription || !productColor || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Coerce types and validate data types
        const coercedRating = Number(rating);
        const coercedProductPrice = Number(productPrice);
        const coercedDiscount = Number(discount);
        const coercedPercentage = Number(percentage);

        if (isNaN(coercedRating)) {
            return res.status(400).json({ message: 'Rating must be a number' });
        }
        if (isNaN(coercedProductPrice)) {
            return res.status(400).json({ message: 'Product price must be a number' });
        }
        // if (isNaN(coercedDiscount)) {
        //     return res.status(400).json({ message: 'Discount must be a number' });
        // }
        if (isNaN(coercedPercentage)) {
            return res.status(400).json({ message: 'Percentage must be a number' });
        }

        // Check for duplicate product
        const existingProduct = await productServiceInstance.getByName(productName);
        if (existingProduct) {
            return res.status(409).json({ message: 'Product with this name already exists' });
        }

        const data = await productServiceInstance.create(
            productName,
            brand,
            coercedRating,
            productImage,
            color,
            coercedProductPrice,
            coercedDiscount,
            coercedPercentage,
            productDescription,
            productColor,
            category
        );
        const fullProduct = {
            ...data._doc,
            productImage: `${req.protocol}://${req.get('host')}${data.productImage}`
        };

        res.status(201).json({ message: 'Product created successfully', data: fullProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: 'Error creating product', error: error.message });
    }
}

const getProductByCategory = async (req, res) => {
    try {

        const { categoryName } = req.params;
        const products = await productServiceInstance.getByCategory(categoryName);
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No Record found' });
        }
        const fullProducts = products.map(product => ({
            ...product._doc,
            productImage: `${req.protocol}://${req.get('host')}${product.productImage}`
        }));
        res.status(200).json(fullProducts);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return res.status(500).json({ message: 'Error fetching products by category', error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productName, brand, rating, color, productPrice, discount, percentage, productDescription, productColor, category } = req.body;
        const productImage = req.file ? req.file.path : null; // Get the uploaded file path if it exists
        const { id } = req.params;

        const updatedProduct = await productServiceInstance.update(
            id,
            productName,
            brand,
            rating,
            productImage,
            color,
            productPrice,
            discount,
            percentage,
            productDescription,
            productColor,
            category
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productServiceInstance.delete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Deleted successfully', product });
    } catch (error) {
        console.error("Error deleting product", error);
        return res.status(500).json({ message: 'Could not delete product', error: error.message });
    }
}

module.exports = {
    createProduct,
    getProductByCategory,
    updateProduct,
    deleteProduct
}
