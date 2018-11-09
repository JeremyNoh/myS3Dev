import { Router } from "express";
import Bucket from "../models/bucket";
import passport from '../middlewares/passport'
import { pick } from "lodash"

const api = Router();

// GET All BUCKETS
api.get("/", async (req, res) => {
  try {
    const { uuid } = req.user.dataValues
    const buckets = await Bucket.findAll({where : {user_uuid: uuid}});
    res.status(200).json({ data: { buckets }, meta: {} });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET A BUCKET
api.get('/:id', async (req, res) => {
  try {
    const bucket = await Bucket.findOne({where : {id: req.params.id}});
    res.status(200).json({ bucket });
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

// POST A BUCKETS
api.post("/", async (req , res ) => {
  try{
    const { uuid } = req.user.dataValues
    const {name} = req.body
    const bucket = new Bucket({ name , user_uuid : uuid})
    // créer dans le system
    // create directory -> name
    // /opt/workspace/myS3/$user_uuid/$name
    await bucket.save()
    res.status(201).json(bucket)
  }
  catch(err){
    res.status(400).json({ err : err.message})
  }
})


// UPDATE a BUCKETS
api.put('/:id', async (req, res) => {
  try {
    const bucket = await Bucket.findOne({where : {id: req.params.id}});
    if (bucket) {
      const fields = pick(req.body, [
        "name"
      ])
      await bucket.update(fields)
      res.status(204).send()
    }
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

// DELETE a BUCKETS
api.delete('/:id', async (req, res) => {
  try {
    const bucket = await Bucket.destroy({where: {id: req.params.id}})
    res.status(200).json({ bucket });
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

export default api;
