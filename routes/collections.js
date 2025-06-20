import express from "express"
import mongoose from "mongoose"


const router = express.Router()


// routes
router.get("/", async (request, response) => {
  const collections = (await mongoose.connection.db.listCollections().toArray()).map((_) => _.name)

  response.json(collections)
})


export default router