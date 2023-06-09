import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  profileId: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  profileId: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
