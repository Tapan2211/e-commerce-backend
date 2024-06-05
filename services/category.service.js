const categoryModel = require('../models/category.model');

const createCategoryDoc = async (categoryName, categoryImage) => {
    try {
        const category = new categoryModel({ categoryName, categoryImage });

        const result = await category.save();
        console.log("Category saved:", result);
        return result;
    } catch (error) {
        console.error("Error in createCategoryDoc:", error);
        throw error;
    }
}

const getAllCategoryDoc = async () => {
    try {
        const result = await categoryModel.find();
        return result;
    } catch (error) {
        console.error("Error in getAllCategoryDoc:", error);
        throw error;
    }
}

const updateCategoryDoc = async (id, categoryName, categoryImage) => {
    try {

        const updateData = {
            id,
            categoryName
        };
        if (categoryImage) updateData.categoryImage = categoryImage;
        return await categoryModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        console.error("Error in updateCategory:", error);
        throw error;
    }
}

const deleteCategoryDoc = async (id) => {
    try {
        const result = await categoryModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.error("Error in deleteCategoryDoc:", error);
        throw error;
    }
}

module.exports = {
    createCategoryDoc,
    getAllCategoryDoc,
    updateCategoryDoc,
    deleteCategoryDoc,
}
