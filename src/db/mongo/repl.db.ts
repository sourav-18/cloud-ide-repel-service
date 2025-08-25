import mongoose, { Types, Schema } from "mongoose"
import mongoConn from "./mongo.db";


export default interface Repl {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
    language?: String;
    createdAt?: Date;
    updatedAt?: Date
}

const db = new mongoose.Schema<Repl>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    language: { type: String, required: true },

},
    { timestamps: { currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000 } }
)

export const replModel = mongoConn.model<Repl>('repls', db);




