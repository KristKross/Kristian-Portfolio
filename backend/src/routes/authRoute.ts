import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../models/Admin";
import authenticate, { AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required",
            });
        }

        const admin = await Admin.findOne({
            username: username.trim(),
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing");

            return res.status(500).json({
                message: "Server authentication is not configured",
            });
        }

        const token = jwt.sign(
            {
                adminId: admin._id.toString(),
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Login failed",
        });
    }
});

// POST /api/auth/logout
router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Logged out successfully",
    });
});

// GET /api/auth/me
router.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
        try {
            const admin = await Admin.findById(req.adminId)
                .select("-password");

            if (!admin) {
                return res.status(401).json({
                    message: "Admin not found",
                });
            }

            return res.json({
                _id: admin._id,
                username: admin.username,
            });
        } catch {
            return res.status(500).json({
                message: "Failed to get admin",
            });
        }
    }
);

export default router;