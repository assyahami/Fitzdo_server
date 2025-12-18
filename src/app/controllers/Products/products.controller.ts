import { Request, Response } from "express";
import ApiResponseHandle from "../../helper/response_helpers/ApiResponseHandle";
import Product from "../../models/Products";

const getProducts = async (req: Request, res: Response) => {
    try {
        const skip = Number(req.query.skip) || 0;
        const limit = Number(req.query.limit) || 10;
        const productCount = await Product.find().countDocuments();
        const products = await Product.find().skip(skip).limit(limit);

        return ApiResponseHandle.getSuccessResult({ data: products, total: productCount }, res);
    } catch (error) {
        ApiResponseHandle.serverError(error, res);
    }
}

const getProductsDetails = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id)
        return ApiResponseHandle.getSuccessResult({ data: product }, res)
    } catch (error) {
        ApiResponseHandle.serverError(error, res)
    }
}
const escapeRegex = (text: string) =>
    text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const searchProducts = async (req: Request, res: Response) => {
    try {

        const safeSearch = escapeRegex(req.params.search);
        const products = await Product.find(
            {
                $or: [
                    { title: { $regex: safeSearch, $options: "i" } },
                    { description: { $regex: safeSearch, $options: "i" } },
                    { brand: { $regex: safeSearch, $options: "i" } },
                    { category: { $regex: safeSearch, $options: "i" } },
                ],
            },

        )
            .limit(5);
        return ApiResponseHandle.getSuccessResult({ data: products }, res);
    } catch (error) {
        console.log(error);
        ApiResponseHandle.serverError(error, res);
    }
}

export { getProducts, getProductsDetails, searchProducts }