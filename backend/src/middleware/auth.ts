import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    adminId?: string;
}

const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { adminId: string };

        req.adminId = decoded.adminId;

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default authenticate;