import { Router } from "express";
import { UserModel } from "../db.js";
import { z } from "zod";
import bcrypt from 'bcrypt';

const authRouter = Router();

// Zod schemas
const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 4 characters")
    .max(10, "Username must be under 10 characters"),
  password: z
    .string()
    .min(8, "Username must be at least 6 characters")
    .max(20, "Username must be under 10 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

authRouter.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(411).json({ errors: result.error.issues });
    }

    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "Username already exists" });
    }

    // hash passwords before saving in db
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({ username, password:hashedPassword});
    await newUser.save()

    res.status(200).json({ message: "Signed Up"})
  } catch (err) {
    res.status(500).json({ message: "Server Error"})
  }
});

export default authRouter;
