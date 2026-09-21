import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        projects: {
            type: Number,
            default: 0,
        },

        activity: {
            type: String,
            enum: ["Active", "Learning", "Familiar"],
            default: "Active",
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;