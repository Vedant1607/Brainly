import { Router, type Response } from "express";
import { userMiddleware, type AuthRequest } from "../middleware.js";
import { ContentModel, LinkModel, UserModel } from "../db.js";
import { random } from "../utils.js";
import z from "zod";

const brainRouter = Router();

const shareSchema = z.object({
  share: z.boolean(),
});

brainRouter.post(
  "/brain/share",
  userMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const parseResult = shareSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          message: "Validation error",
          errors: parseResult.error.issues.map((issues) => issues.message),
        });
      }

      const { share } = parseResult.data;

      if (share) {
        // Check if user already has a share link
        const existingLink = await LinkModel.findOne({ userId: req.userId });

        if (existingLink) {
          return res.status(200).json({
            message: "Share Link already exists",
            shareUrl: `/brain/${existingLink.hash}`,
            hash: existingLink.hash,
          });
        }

        // Create new share link
        const hash = random(10);
        await LinkModel.create({
          userId: req.userId,
          hash,
        });

        return res.status(200).json({
          message: "Share link created successfully",
          shareUrl: `/brain/${hash}`,
        });
      } else {
        const deletedLink = await LinkModel.findOneAndDelete({
          userId: req.userId,
        });

        if (!deletedLink) {
          return res
            .status(404)
            .json({ message: "No share link found to remove" });
        }

        return res.status(200).json({
          message: "Share link removed successfully",
        });
      }
    } catch (err) {
      console.error("Error managing share link:", err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

brainRouter.get(
  "/brain/:shareLink",
  async (req: AuthRequest, res: Response) => {
    try {
      const { shareLink } = req.params;

      // Validate share link format

      if (!shareLink || shareLink.trim().length === 0) {
        return res.status(400).json({ message: "Invalid share link" });
      }

      // Find the link
      const link = await LinkModel.findOne({ hash: shareLink });
      if (!link) {
        return res.status(404).json({ message: "Share link not found" });
      }

      // Get user and content in parallel for better performance
      const [user, content] = await Promise.all([
        UserModel.findById(link.userId, "username"),
        ContentModel.find({ userId: link.userId })
          .populate("tags", "title")
          .select("title link type tags createdAt")
          .sort({ createdAt: -1 }),
      ]);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Brain content retrieved successfully",
        data: {
          username: user.username,
          content,
          contentCount: content.length,
        },
      });
    } catch (err) {
      console.error("Error retrieving shared brain:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default brainRouter;
