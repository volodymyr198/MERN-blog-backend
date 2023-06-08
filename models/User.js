import {Schema,model} from 'mongoose';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: 'true',
            unique: true,
        },
        password: {
            type: String,
            require: 'true',
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        token: {
            type: String,
            require: 'true',
        },
    },
    { timestamps: true, versionKey: false }
);

export default model('User', UserSchema);
