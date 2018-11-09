import { Router } from "express";
import User from "../models/user";

const api = Router();

api.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: { users }, meta: {} });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

export default api;
