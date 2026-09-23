import { Router, Request, Response } from "express";
import Project from "../../models/Project";
import authenticate from "../middleware/auth";

const router = Router();

// GET /api/projects
// Get all projects
router.get("/", async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ order: 1 });

        res.status(200).json(projects);
    } catch (error) {
        console.error("Fetch projects error:", error);

        res.status(500).json({
            message: "Failed to fetch projects",
        });
    }
});

// GET /api/projects/:id
// Get a single project
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Fetch project error:", error);

        res.status(500).json({
            message: "Failed to fetch project",
        });
    }
});

// POST /api/projects
// Create a project
router.post("/", authenticate, async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            technologies,
            liveUrl,
            videoUrl,
            githubUrl,
            images,
            order,
        } = req.body;

        const project = await Project.create({
            title,
            description,
            technologies,
            liveUrl,
            videoUrl,
            githubUrl,
            images,
            order,
        });

        res.status(201).json(project);
    } catch (error) {
        console.error("Create project error:", error);

        res.status(500).json({
            message: "Failed to create project",
        });
    }
});

// PUT /api/projects/:id
// Update a project
router.put("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            technologies,
            liveUrl,
            videoUrl,
            githubUrl,
            images,
            order,
        } = req.body;

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                technologies,
                liveUrl,
                videoUrl,
                githubUrl,
                images,
                order,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Update project error:", error);

        res.status(500).json({
            message: "Failed to update project",
        });
    }
});

// DELETE /api/projects/:id
// Delete a project
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Delete project error:", error);

        res.status(200).json({
            message: "Project deleted successfully",
        });
    }
});

export default router