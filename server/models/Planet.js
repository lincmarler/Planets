import mongoose from "mongoose";
const Schema = mongoose.Schema

export const PlanetSchema = new Schema({
    name: { type: String, required: true, min: 3, max: 30 },
    biome: { type: String, required: true, min: 3, max: 30 },
    atmosphere: { type: Boolean, default: true },
    galaxyId: { type: Schema.Types.ObjectId, ref: 'Galaxy', required: true }
},
    { toJSON: { virtuals: true } }
)

PlanetSchema.virtual('galaxy', {
    localField: 'galaxyId',
    ref: 'Galaxy',
    foreignField: '_id',
    justOne: true
})