import { json } from "zod";
import Product from "../models/Product.js";
import uploadFile from "../utils/fileuploader.js";
import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import promptAI from "../utils/ai.js";

const createProduct = async (data, userid, files) => {
    try {
        const uploadedFiles = files ? await uploadFile(files) : [];
        const prometMessage=PRODUCT_DESCRIPTION_PROMPT.replace("%s",data.name).replace("%s",data.category).replace("%s",data.brand);
        const description=data.description??(await promptAI(prometMessage))
        const product = await Product.create({
            ...data,
            description,
            createdBy: userid,
            imageUrls: uploadedFiles.map(file => file.url)
        });

        return product;

    } catch (error) {
        console.error("Create Product Error:", error);
        throw error;
    }
};
const getProduct = async (query) => {
    const sort = query.sort ? JSON.parse(query.sort) : {}
    const limit = query.limit ?? 10
    const offset = query.offset ?? 0
    const filters = {};
    const { name, brands, category, min, max, createdBy } = query;

    if (category) filters.category = category;
    if (brands) filters.brand = { $in: brands.split(",") };
    if (name) filters.name = { $regex: name, $options: "i" };
    if (min) filters.price = { $gte: min }
    if (max) filters.price = { ...filters.price, $lte: max }
    if (createdBy) filters.createdBy = createdBy;

    try {
        return await Product.find(filters).sort(sort).limit(limit).skip(offset)
    } catch (error) {
        throw {
            error
        }

    }
}

const getById=async(id)=>{
    return await Product.getById(id);
}
const updateProduct = async (id, files, data, userid) => {
    try {
        
        let updatePayload = { ...data };
        if (files && files.length > 0) {
            const uploadedFiles = await uploadFile(files);
            updatePayload.imageUrls = uploadedFiles.map((file) => file.url);
        }
        updatePayload.createdBy = userid;
        const result = await Product.findByIdAndUpdate(
            id,
            updatePayload,
            { new: true, runValidators: true }
        );

        return result;

    } catch (error) {
        throw error;
    }
}
const deleteProduct = async (id) => {
    try {
        return await Product.findByIdAndDelete(id)
    } catch (error) {
        throw {
            error
        }
    }
}

const getBrand = async () => {
    return await Product.distinct("brand");
}
const getCategories = async () => {
    return await Product.distinct("category");
}
const getTotalCount = async () => {
    return await Product.countDocuments();
}
export default { createProduct,getById, getProduct, updateProduct, deleteProduct, getBrand, getCategories, getTotalCount }