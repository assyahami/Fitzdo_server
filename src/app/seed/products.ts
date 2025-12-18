import initMongo from "../../../config/db";
import Product, { IProduct } from "../models/Products";

async function getProducts() {
    try {
        initMongo();
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        if (!data.products || !Array.isArray(data.products)) {
            throw new Error("Invalid data format");
        }

        const productsToInsert: Partial<IProduct>[] = data.products.map((p: any) => ({
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            rating: p.rating,
            stock: p.stock,
            tags: p.tags || [],
            brand: p?.brand || "",
            sku: p.sku,
            weight: p.weight,
            dimensions: p.dimensions,
            warrantyInformation: p.warrantyInformation,
            shippingInformation: p.shippingInformation,
            availabilityStatus: p.availabilityStatus,
            reviews: (p.reviews || []).map((r: any) => ({
                rating: r.rating,
                comment: r.comment,
                date: new Date(r.date),
                reviewerName: r.reviewerName,
                reviewerEmail: r.reviewerEmail,
            })),
            returnPolicy: p.returnPolicy,
            minimumOrderQuantity: p.minimumOrderQuantity,
            meta: {
                createdAt: new Date(p.meta?.createdAt),
                updatedAt: new Date(p.meta?.updatedAt),
                barcode: p.meta?.barcode,
                qrCode: p.meta?.qrCode,
            },
            images: p.images || [],
            thumbnail: p.thumbnail,
        }));

        const insertedProducts = await Product.insertMany(productsToInsert);
        console.log(`Inserted ${insertedProducts.length} products successfully!`);
    } catch (error) {
        console.error("Error:", error);
    }

}
getProducts();