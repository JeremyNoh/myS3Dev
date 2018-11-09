import { Router } from "express";
import passport from "passport"

import auth from "./auth";
import users from "./users";
import buckets from "./buckets";
import blobs from "./blobs";

const api = Router();

api.get("/", (req, res) => {
  res.json({ hello: "from express.island" });
});

api.use("/auth", auth);
// api.use("/users", users);
api.use("/users", passport.authenticate("jwt", {session : false }), users)
api.use('/users/:uuid/buckets', buckets);
api.use('/users/:uuid/buckets/:bucket_id/blobs', blobs);

export default api;
