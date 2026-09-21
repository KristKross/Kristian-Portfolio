import { Router, Request, Response } from "express";
import Skill from "../../models/Skill";
import authenticate from "../middleware/auth";

const router = Router();

// GET /api/skills
// Get all skills
router.get("/", async (req: Request, res: Response) => {
    try {
        const skills = await Skill.find().sort({
            category: 1,
            order: 1,
        });

        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch skills",
        });
    }
});

// GET /api/skills/:id
// Get a single skill
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found",
            });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch skill",
        });
    }
});

// POST /api/skills
// Create a skill
router.post("/", authenticate, async (req: Request, res: Response) => {
    try {
        const {
            name,
            category,
            projects,
            order,
        } = req.body;

        const skill = await Skill.create({
            name,
            category,
            projects,
            order,
        });

        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create skill",
        });
    }
});

// PUT /api/skills/:id
// Update a skill
router.put("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found",
            });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update skill",
        });
    }
});

// DELETE /api/skills/:id
// Delete a skill
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found",
            });
        }

        res.status(200).json({
            message: "Skill deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Skill deleted successfully",
        });
    }
});

export default router;