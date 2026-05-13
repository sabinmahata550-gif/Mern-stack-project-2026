import User from "../models/User.js";
import productService from "../services/product.service.js";

// CREATE
const createMyProduct = async (req, res) => {
    try {
        const files = req.files;
        const userId = req.user.id;
        const input = req.body;
        const product = await productService.createProduct(input, userId, files);

        res.status(201).json({
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        res.status(400).json({
            message: "Product not created",
            error
        });
    }
};

// GET ALL
const getAllMyProduct = async (req, res) => {
    try {
        const query = req.query;
        console.log(query)
        const product = await productService.getAllProduct(query);

        res.status(200).json({   // ❗ change 201 → 200
            message: "All products fetched",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get products",
            error
        });
    }
};
const getProductById=async(req,res)=>{
    try {
        const userId=await productService.getProductById(req.params.id)
           res.status(200).json({   // ❗ change 201 → 200
            message: "getByid are successfully",
            data:userId
        });
    } catch (error) {
        
    }
}
// UPDATE
const updateMyProduct = async (req, res) => {
    try {
        const input = req.body;
        
        const id = req.params.id;
        const files = req.files;
console.log(input)

        const product = await productService.updateProduct(id, files, input);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({   // ❗ change 201 → 200
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: "Update failed",
            error
        });
    }
};

// DELETE
const deleteMyProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await productService.deleteProduct(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({   // ❗ change 201 → 200
            message: "Product deleted successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: "Delete failed",
            error
        });
    }
};
const getBrand = async (req, res) => {
    const brand = await productService.getBrand();
    res.status(200).json(brand);
}
const getCategories = async (req, res) => {
    const category = await productService.getCategories();
    res.status(200).json(category);
}
const getTotalCount = async (req, res) => {
    const category = await productService.getTotalCount();
    res.status(200).json(category);
}
export default {
    createMyProduct,
    getAllMyProduct,
    getProductById,
    updateMyProduct,
    deleteMyProduct,
    getBrand,
    getCategories,
    getTotalCount
};