import { Router } from "express";
import auth from "./auth";
import users from "./users";

const api = Router();

api.get("/", (req, res) => {
  res.json({ hello: "from express.island" });
});

api.use("/users", users);
api.use("/auth", auth);

export default api;
