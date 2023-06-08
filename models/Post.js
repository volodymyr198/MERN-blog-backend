import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
    {
        username: { type: String },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },
        views: { type: Number, default: 0 },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true, versionKey: false }
);

export default model('Post', PostSchema);
