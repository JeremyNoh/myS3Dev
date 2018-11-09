import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user";
import Mail from "../lib/mail";

const api = Router();

api.post("/register", async (req, res) => {
  const { nickname, email, password, password_confirmation } = req.body;

  try {
    let user = new User({
      nickname,
      email,
      password,
      password_confirmation
    });

    await user.save();

    const text = "New subscription";
    Mail.send(user.email, "Welcome", text, `<h1>${text}</h1>`);

    const payload = { uuid: user.uuid, nickname, email };

    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION);

    res.status(201).json({ data: { user }, meta: { token } });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

api.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      res.status(400).json({ err });
    }

    const { uuid, email, nickname } = user.toJSON();

    const payload = { uuid: user.uuid, nickname, email };

    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION);

    res.status(200).json({
      data: {
        user: payload
      },
      meta: {
        token
      }
    });
  })(req, res);
});

export default api;
