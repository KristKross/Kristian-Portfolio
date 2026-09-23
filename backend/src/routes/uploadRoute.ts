import { Router } from "express";
import upload from "../middleware/upload";
import { uploadImage } from "../services/cloudinary";

const router = Router();

router.post("/image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded",
            });
        }

        const result = await uploadImage(
            req.file.buffer,
            "portfolio/projects"
        );

        return res.status(201).json({
            url: result.url,
            publicId: result.publicId,
        });
    } catch (error) {
        console.error("Cloudinary upload error:", error);

        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to upload image",
        });
    }
});

export default router
