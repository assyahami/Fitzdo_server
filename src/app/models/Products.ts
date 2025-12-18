import mongoose, { Schema, Document, Model } from 'mongoose';

interface IDimensions {
    width: number;
    height: number;
    depth: number;
}

interface IReview {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
}

interface IMeta {
    createdAt: Date;
    updatedAt: Date;
    barcode: string;
    qrCode: string;
}

export interface IProduct extends Document {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: IDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: IReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: IMeta;
    images: string[];
    thumbnail: string;
}

const DimensionsSchema = new Schema<IDimensions>({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
});

const ReviewSchema = new Schema<IReview>({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
});

const MetaSchema = new Schema<IMeta>({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    barcode: { type: String, required: true },
    qrCode: { type: String, required: true },
});

const ProductSchema: Schema<IProduct> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: [String], required: true },
    brand: { type: String, },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: DimensionsSchema, required: true },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    reviews: { type: [ReviewSchema], default: [] },
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    meta: { type: MetaSchema, required: true },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
