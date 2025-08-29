import { Router, type Response } from "express";
import { userMiddleware, type AuthRequest } from "../middleware.js";
import { ContentModel, TagModel } from "../db.js";
import { z } from "zod";

const contentRouter = Router();
const contentTypes = ['images', 'video', 'article'] as const;

const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.url(),
  type: z.enum(contentTypes),
  tags: z.array(z.string()).optional().default([]),
});

contentRouter.post(
  "/content",
  userMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const parseResult = contentSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          errors: parseResult.error.issues.map((issues) => issues.message),
        });
      }

      const { title, link, type, tags } = parseResult.data;

      if (!req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const tagIds = [];

      for (const tagTitle of tags) {
        let tag = await TagModel.findOne({ title:tagTitle });

        if (!tag) {
          tag = await TagModel.create({ title: tagTitle });
        }
        tagIds.push(tag._id);
      }

      const newContent = await ContentModel.create({
        title, // Include the title field!
        link,
        type,
        userId: req.userId,
        tags: tagIds,
      });

      return res.status(200).json({ message: "Contents Added Successfully", data:newContent });
    } catch (err) {
      console.error("Error adding content:", err);
      return res.status(500).json({ message: "Server Error " });
    }
  }
);

contentRouter.get("/content", userMiddleware, async (req:AuthRequest, res:Response) => {
  try {
    if (!req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

    const content = await ContentModel.find({ userId: req.userId })
      .populate("userId", "username")
      .populate("tags","title")
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      message: "Content retrieved successfully",
      data: content,
      count: content.length
    });

  } catch (err) {
    console.error("Errir retrieving content: ", err);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

contentRouter.delete("/content/:id", userMiddleware, async (req:AuthRequest, res:Response) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    if(!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }

    const deletedContent = await ContentModel.findOneAndDelete({ _id:id, userId:req.userId });

    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      message: "Content deleted successfully",
      data: {
        id: deletedContent._id,
        title: deletedContent.title
      }
    });

  } catch (err) {
    console.error("Error deleting content: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default contentRouter;
