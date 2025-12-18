import mongoose, { Document, Schema, Model, model } from 'mongoose';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isReqNewPassword?: boolean;
  isVerified: boolean;
  verificationToken?: string;
  verificationExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
  formIds: mongoose.Types.ObjectId[];
  paymentGateways: mongoose.Types.ObjectId[];
  wallets: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
  },
  verificationExpiry: {
    type: Date,
    default: Date.now
  },
  isReqNewPassword: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  formIds: {
    type: [Schema.Types.ObjectId],
    ref: 'Form'
  },
  paymentGateways: {
    type: [Schema.Types.ObjectId],
    ref: 'PaymentGateway'
  },
  wallets: {
    type: [Schema.Types.ObjectId],
    ref: 'Wallet'
  }
});

UserSchema.methods.generateAuthToken = function (): string {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return token;
};
UserSchema.methods.generateRefreshToken = function (): string {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  return token;
};


const User: Model<IUser> = model('User', UserSchema);

export default User;
