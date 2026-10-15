import mongoose, { Document } from 'mongoose';
export type UserDocument = Document & {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument, {}, {}> & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
} & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map