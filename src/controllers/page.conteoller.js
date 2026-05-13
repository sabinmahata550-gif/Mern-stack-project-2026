import productService from "../services/product.service.js";

const homepage = (req, res) => {
    const name = req.user.name;
    res.render("index.hbs", {
        name
    })
}

const getAllProductsViews = async (req, res) => {
    const products = await productService.getAllProduct({})
    res.render("products.hbs", {
        products
    })
}


const getProductsByIdViews = async (req, res) => {
    const product = await productService.getProductById(req.params.id)
    res.render("product.hbs", {
        product
    })
}



export default { homepage, getAllProductsViews, getProductsByIdViews }