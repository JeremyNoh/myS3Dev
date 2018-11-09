import { Router } from "express";
import Blob from "../models/blob";
import passport from '../middlewares/passport'
import { pick } from "lodash"
import mLog from "../lib/utils";

let api = Router({mergeParams: true});

// GET All BLOBS
api.get("/", async (req, res) => {
  try {
    const {bucket_id} = req.params
    const blobs = await Blob.findAll({where : {bucket_id}});
    res.status(200).json({ data: { blobs }, meta: {} });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET A BLOBS
api.get('/:id', async (req, res) => {
  try {
    const {bucket_id} = req.params
    const blob = await Blob.findOne({where : {id: req.params.id}});
    res.status(200).json({ blob });
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

// // POST A BLOBS
api.post("/", async (req , res ) => {
  try{
    const {bucket_id} = req.params
    const {name, size, path} = req.body
    const blob = new Blob({ name, size, path , bucket_id  })
    // créer dans le system
    // create directory -> name
    // /opt/workspace/myS3/$user_uuid/$name
    await blob.save()
    res.status(201).json(blob)
  }
  catch(err){
    res.status(400).json({ err : err.message})
  }
})


// // UPDATE a BUCKETS
api.put('/:id', async (req, res) => {
  try {
    const blob = await Blob.findOne({where : {id: req.params.id}});
    if (blob) {
      const fields = pick(req.body, [
        "name",
        "size",
        "path"
      ])
      await blob.update(fields)
      res.status(204).send()
    }
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

// DELETE a BUCKETS
api.delete('/:id', async (req, res) => {
  try {
    const blob = await Blob.destroy({where: {id: req.params.id}})
    res.status(200).json({ blob });
  } catch (err) {
    res.status(400).json({ err: `could not connect to database, err: ${err.message}` });
  }
});

export default api;
