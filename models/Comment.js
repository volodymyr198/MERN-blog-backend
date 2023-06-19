import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
    {
        comment: { type: String, require: 'true' },

        author: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true, versionKey: false }
);

export default model('Comment', CommentSchema);
