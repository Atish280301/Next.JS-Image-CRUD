//src/models/index.js
import mongoose from 'mongoose';
const ImageSchema = new mongoose.Schema({
    userid: { type: String},
    username: { type: String},
    usermail: { type: String},
    imageurl: { type: String},
});
export const ImageCRUD = mongoose.models.ImageCRUD || mongoose.model('ImageCRUD',ImageSchema);
