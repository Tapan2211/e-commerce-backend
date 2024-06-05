const {
    createCategoryDoc,
    getAllCategoryDoc,
    updateCategoryDoc,
    deleteCategoryDoc
} = require('../services/category.service');

const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const categoryImage = req.file ? `/uploads/${req.file.filename}` : null;

        if (!categoryName || !categoryImage) {
            return res.status(400).json({ message: 'Name and image are required' });
        }

        const data = await createCategoryDoc(categoryName, categoryImage);
        res.status(201).json({ message: 'Category created successfully', data });
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: 'Error creating category', error: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoryDoc();
        if (!categories || categories.length === 0) {
            return res.status(400).json({ message: 'No record found' });
        }

        const fullCategories = categories.map(category => ({
            ...category._doc,
            categoryImage: `${req.protocol}://${req.get('host')}${category.categoryImage}`
        }));

        return res.status(200).json(fullCategories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: 'Error fetching category list', error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { id } = req.params;
        const categoryImage = req.file ? `/uploads/${req.file.filename}` : null;

        const updatedCategory = await updateCategoryDoc(
            id,
            categoryName,
            categoryImage,
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found', data: updatedCategory });
        }

        res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });
    } catch (error) {
        console.error("Error updating Category:", error);
        return res.status(500).json({ message: 'Error updating Category', error: error.message });
    }
}

const deletCategory = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const result = await deleteCategoryDoc(categoryID);
        return res.status(200).json({ message: 'Successfully deleted', result });
    } catch (error) {
        console.error("Error deleting category:", error); // Log the error details
        return res.status(500).json({ message: 'Could not delete category', error: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deletCategory,
}
