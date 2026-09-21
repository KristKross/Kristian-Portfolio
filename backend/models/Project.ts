import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        technologies: {
            type: [String],
            default: [],
        },

        demo: {
            type: String,
            default: "",
            trim: true,
        },

        githubUrl: {
            type: String,
            default: "",
            trim: true,
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

const Project = mongoose.model("Project", projectSchema);

export default Project;