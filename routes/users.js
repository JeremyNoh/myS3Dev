import { Router } from "express";
import User from "../models/user";
import { pick } from "lodash"
const api = Router();

api.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: { users }, meta: {} });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET a USER
api.get('/:uuid', async (req, res) => {
  try {
    const user = await User.findById(req.params.uuid);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

// UPDATE a USER
api.put('/:uuid', async (req, res) => {
  try {
    const user = await User.findOne({where : {uuid: req.params.uuid}});
    if (user) {
      const fields = pick(req.body, [
        "nickname",
        "email",
        "password",
        "password_confirmation"
      ])
      await user.update(fields)
      res.status(204).send()
    }
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

// DELETE a USER
api.delete('/:id', async (req, res) => {
  try {
    const user = await User.destroy({where: {uuid: req.params.id}})
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

export default api;
