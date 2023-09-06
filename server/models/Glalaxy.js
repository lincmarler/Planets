import mongoose from "mongoose";
const Schema = mongoose.Schema

export const GalaxySchema = new Schema({
    name: { type: String, required: true },
    emoji: { type: String, required: true },
    stars: { type: Number, required: true, min: 1 }
},
    { timestamps: true, toJSON: { virtuals: true } }
)